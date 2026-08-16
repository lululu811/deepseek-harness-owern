/**
 * CSS Modules type declaration.
 *
 * Lets `import * as css from './styles.module.css'` work by treating
 * the module as a record of class-name → generated-hashed-string.
 */

declare module '*.module.css' {
  const classes: Readonly<Record<string, string>>
  export default classes
}