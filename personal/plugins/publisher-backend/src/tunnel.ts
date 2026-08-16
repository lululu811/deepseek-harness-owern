/**
 * SSH SOCKS5 tunnel lifecycle manager.
 *
 * Spawns an SSH process that creates a local SOCKS5 proxy through the
 * WeChat API jump-host. The tunnel is cached per-process and reused
 * across multiple tool calls. Teardown happens on plugin dispose.
 *
 * @module @personal/publisher-backend/tunnel
 */

import { type ChildProcess, spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import { homedir } from 'node:os'
import { join } from 'node:path'

/** Default SOCKS5 port for the local tunnel endpoint. */
const SOCKS_PORT = 19080

/** Default SSH connection parameters matching the Python reference. */
const DEFAULT_HOST = '43.155.210.74'
const DEFAULT_USER = 'root'
const DEFAULT_PORT = 22
const IDENTITY_FILE = join(homedir(), '.ssh', 'id_ed25519_2')
const KNOWN_HOSTS = join(homedir(), '.ssh', 'known_hosts')

/** State for the managed tunnel process. */
interface TunnelState {
  process: ChildProcess
  port: number
}

/** Cached tunnel singleton — reused across tool calls within a process. */
let cached: TunnelState | null = null

/**
 * Build the SSH arguments for establishing a SOCKS5 tunnel.
 * Mirrors the logic in wechat_draft.py:build_ssh_args().
 */
function buildSshArgs(host: string, user: string, port: number, socksPort: number): string[] {
  return [
    '-N', '-T',
    '-D', `127.0.0.1:${socksPort}`,
    '-o', 'ExitOnForwardFailure=yes',
    '-o', 'ServerAliveInterval=30',
    '-o', 'ServerAliveCountMax=3',
    '-o', `UserKnownHostsFile=${KNOWN_HOSTS}`,
    '-o', 'StrictHostKeyChecking=accept-new',
    '-o', 'ConnectTimeout=10',
    '-p', String(port),
    '-i', IDENTITY_FILE,
    `${user}@${host}`,
  ]
}

/**
 * Ensure the SSH tunnel is up and return the local SOCKS5 port.
 *
 * If a tunnel is already active, returns its port immediately.
 * Otherwise spawns a new SSH process and waits for it to be ready.
 *
 * @param host - SSH tunnel host (default: 43.155.210.74).
 * @param user - SSH tunnel user (default: root).
 * @returns The local SOCKS5 port number.
 * @throws If the tunnel cannot be established after retries.
 */
export async function ensureTunnel(host?: string, user?: string): Promise<number> {
  // Reuse existing tunnel if the process is still alive.
  if (cached && cached.process.exitCode == null) {
    return cached.port
  }

  const resolvedHost = host ?? DEFAULT_HOST
  const resolvedUser = user ?? DEFAULT_USER
  const socksPort = SOCKS_PORT

  // Verify identity file exists before attempting SSH.
  if (!existsSync(IDENTITY_FILE)) {
    throw new Error(`SSH identity file not found: ${IDENTITY_FILE}`)
  }

  const args = buildSshArgs(resolvedHost, resolvedUser, DEFAULT_PORT, socksPort)
  const child = spawn('ssh', args, {
    stdio: 'ignore',
    detached: false,
  })

  // Track unexpected exits.
  child.on('exit', (code) => {
    if (cached?.process === child) {
      cached = null
    }
    if (code != null && code !== 0) {
      // eslint-disable-next-line no-console
      console.error(`[publisher-backend] SSH tunnel exited with code ${code}`)
    }
  })

  // Wait for the tunnel to become ready by probing a known endpoint.
  const ready = await waitForTunnel(socksPort, 20, 500)
  if (!ready) {
    child.kill('SIGTERM')
    throw new Error('SSH tunnel failed to become ready within timeout')
  }

  cached = { process: child, port: socksPort }
  return socksPort
}

/**
 * Poll until the SOCKS5 tunnel is functional.
 * Uses a lightweight TCP probe via curl through the tunnel.
 */
function waitForTunnel(socksPort: number, maxRetries: number, intervalMs: number): Promise<boolean> {
  return new Promise((resolve) => {
    let attempts = 0
    const probe = () => {
      attempts++
      // Use curl to test the tunnel by hitting the WeChat token endpoint.
      const testProc = spawn('curl', [
        '-s', '--max-time', '3',
        '--socks5-hostname', `127.0.0.1:${socksPort}`,
        '-o', '/dev/null',
        '-w', '%{http_code}',
        'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=test&secret=test',
      ], { stdio: ['ignore', 'pipe', 'ignore'] })

      let output = ''
      testProc.stdout?.on('data', (chunk: Buffer) => { output += chunk.toString() })

      testProc.on('exit', (code) => {
        // curl exits 0 and returns an HTTP status code (even 401 means tunnel works).
        if (code === 0 && output.trim().length > 0) {
          resolve(true)
          return
        }
        if (attempts >= maxRetries) {
          resolve(false)
          return
        }
        setTimeout(probe, intervalMs)
      })

      testProc.on('error', () => {
        if (attempts >= maxRetries) {
          resolve(false)
          return
        }
        setTimeout(probe, intervalMs)
      })
    }
    probe()
  })
}

/**
 * Tear down the cached tunnel process.
 * Safe to call even if no tunnel exists.
 */
export function teardownTunnel(): void {
  if (cached) {
    cached.process.kill('SIGTERM')
    cached = null
  }
}

/**
 * Get the current SOCKS5 port if a tunnel is active, or null.
 */
export function getTunnelPort(): number | null {
  if (cached && cached.process.exitCode == null) {
    return cached.port
  }
  return null
}
