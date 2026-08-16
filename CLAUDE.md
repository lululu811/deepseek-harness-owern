# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

The authoritative contributor instructions live in [`AGENTS.md`](AGENTS.md); read it before changing anything under `packages/`. This file adds the architectural framing Claude Code needs to be productive on first contact, on top of the commands, conventions, and gates already documented in AGENTS.md.

## Big-picture architecture

DeepSeek Harness (`dsh`) is a plugin-based agent harness built on **Cordis** — a framework where everything is a plugin. There is no privileged core: every capability (model adapter, tool registry, session log, agent loop, shell, filesystem, LSP, subagents, workflows, skills, UI) is mounted as a plugin into a shared `Context`, and registrations are reversible effects that unwind on unload.

A running `dsh` is a **plugin tree composed at boot from ordered layers**:

- **Profile** — a named composition stored in the Harness home (shipped: `web`, `headless`, `acp`). It lists bundles to stack and a user `cordis.patch.yml`.
- **Bundle** — a distribution of Cordis config rows plus the code they mount. `dsh_base` is the first layer of every profile; `dsh_web_app` adds the browser; `dsh_headless` adds a one-shot runner.
- **Patches** applied in order: bundles listed by the profile → profile `cordis.patch.yml` → home-level patch → `--patch` overlay. Each row targets by id and replaces its whole config or inserts new rows.

Use `dsh --profile <name> --dump-config` to see the actual composed tree.

### Capability seams

The core architectural pattern is the **capability seam**: a swappable capability with three roles — **Service Definition** (interface), **Service Provider** (implementation), **Consumer** (typically a model-facing tool). One role alone is not a seam; adding a capability means designing all three. A provider swap changes the whole product — pointing filesystem/subprocess providers at a remote sandbox moves Bash, PTY, and LSP with it.

### Event domains

Extension happens through three event domains:

- **Session events** — durable facts appended to the log and broadcast through `session/event`. Use when the fact must survive reload.
- **Agent events** (`agent/*`) — live `Agent` observability: inbox, step, status, request, validation, continuation.
- **Capability events** (`fs/*`, `tools/*`, `telemetry/*`) — policy and adapters on a seam without importing the loop.

**Model-visible ⟺ logged**: anything reaching a model request must be reconstructable from the session log. A new model-visible input requires a new session event.

### Turn flow

A **step** is one model request plus its tool calls. A **turn** is zero or more steps. The chain: `turn/start → claim → prompt assembly → agent/pre-step (waterfall) → step/start → user/message → model history derivation → agent/request → llm/stream → assistant/* → tool/call* → tools/pre-execute|execute|post-execute → tool/result* → step/end → … → agent/turn-stopping → turn/end`. Waterfall listeners MUST call `next()` to delegate.

### TypeScript project layout

Two isolated aggregates: **Host** (`tsconfig.host.json`) and **Client** (`tsconfig.client.json`). An ordinary package registers in exactly one. They stay separate because both declaration-merge the cordis `Context` interface under the same keys with different services — one program seeing both reports a collision. `tsconfig.base.json` is the resolution facade with source `paths` and MUST NOT gain `include`/`files`. Only `api/remotes` splits Host and Client tsconfigs; do not copy that structure.

Build order: `tsc -b tsconfig.host.json → tsdown host → tsc -b tsconfig.client.json → tsdown client → build:web`. Typert runs only during Host tsdown.

### Package naming and resolution

Every npm package is `@deepseek-ai/dsh-<name>`; vendored packages are rescoped (`vendor/`) and `private: true`. `@deepseek-ai/cordis` is a peerDependency (+ dev) of every harness package. ESM everywhere (`"type": "module"`). Tests resolve workspace imports through tsconfig `paths` to `src` and must pass on a clean tree; gates consuming built `lib/` declare that dependency.

## Plugin-authoring rules worth knowing up front

- **Registrations are effects**: every contribution goes through `ctx.effect()` / `ctx.on()`; a registry's `register()` returns the disposer.
- **Service packages default-export their service class**; function plugins named-export `name`/`inject`/`Config`/`apply` with no default export. Mixing the forms drops the function plugin's namespace.
- **Optional services use `ctx.get(name)`**; reserve `ctx.<name>` for declared injections.
- **Explicit > implicit at package boundaries**: defaulting is an explicit `resolve(request): Spec` step, never a hidden `?? default` inside `run()`.
- **No hardcoded tunables in plugins**: deployment-varying choices are validated `Config` fields changeable from `cordis.yml`.
- **Opaque cross-boundary ids are branded** (`Branded<B>` from `dsh-brand`), never bare `string`.
- **Tests describe behavior, not correctness.** Package tests live at package level under `tests/`, not `src/__tests__/`.
- **Every non-trivial change MUST include an Agent Note in the same PR** (only mechanical/local edits are exempt). Archived notes are frozen, never current authority.

## Commands (quick reference)

Full list and gate inventory: [`AGENTS.md`](AGENTS.md#commands).

- `pnpm install` — Node `^22.19 || >=24`, pnpm 11.7.0 (Corepack)
- `pnpm run build` — full build (host lib + client lib + web)
- `pnpm run test` — vitest unit tests
- `pnpm run test:coverage` — CI coverage gate; per-file 100% on `packages/*/*/src`
- `pnpm run test:e2e` — real-API tests; self-skip without `DEEPSEEK_API_KEY`
- `pnpm run test:snapshot` — keyless expected outputs; `pnpm run test:snapshot:record` to re-record
- `pnpm run typecheck` — requires built host lib (runs Typert contract generation)
- `pnpm run lint` — oxlint; `pnpm run lint:fix` applies fixes
- `pnpm run hygiene` — knip + publint + constraints + NodeNext consumer check
- `pnpm run doc-sync` — all documentation gates
- `pnpm dsh --profile headless "task"` — run one task from source (needs `DEEPSEEK_API_KEY`)

`DEEPSEEK_API_KEY` and optional `DEEPSEEK_BASE_URL` go in a gitignored repo-root `.env`. Never commit credentials.

## Documentation conventions

- One physical line per paragraph (editor soft-wrap); one home per fact.
- `AGENTS.md` is the standing-orders tier; subtree `AGENTS.md` files narrow scope.
- `architecture.md` is the ordered map of composition, seams, and extension points.
- Agent Notes carry decision rationale; postmortems carry incident stories; cookbooks carry step-by-step how-tos; package READMEs carry per-package contracts.
- Bilingual pairing: English `.md` and Chinese `.zh.md` update together; the Chinese counterpart mirrors structure section-for-section. See `docs/AGENTS.md` and `docs/i18n/README.md`.
- Word-count ceilings enforced by `verify-doc-budgets`; never pad to the ceiling, never exceed it without a justified manifest diff.

## Pre-release stance

No tagged release yet — prefer the correct foundation over compatibility shims. Rename or repackage freely and update every reference together. Backends reject old on-disk formats: SQLite uses monotonic `SCHEMA_VERSION`; `dsh-session` keeps `SESSION_FORMAT_VERSION` at `0`. **Remove this section at the first tagged release.**
