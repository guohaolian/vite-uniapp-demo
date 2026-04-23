import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

function run(command, args) {
  console.log(`[run] ${command} ${args.join(' ')}`)

  const result = spawnSync(command, args, {
    cwd: process.cwd(),
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  if (result.error) {
    console.error(`[spawn error] ${command}`)
    console.error(result.error)
    process.exit(1)
  }

  if (result.status !== 0) {
    console.error(`[exit code] ${command} -> ${result.status}`)
    process.exit(result.status ?? 1)
  }
}

const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const root = process.cwd()
const h5Dist = resolve(root, 'example', 'dist', 'build', 'h5')
const docsDistUi = resolve(root, 'docs', '.vitepress', 'dist', 'ui')

console.log(`[cwd] ${root}`)
console.log(`[target] h5Dist = ${h5Dist}`)
console.log(`[target] docsDistUi = ${docsDistUi}`)

run(npmCmd, ['run', 'build:example'])
run(npmCmd, ['run', 'build:docs'])

if (!existsSync(h5Dist)) {
  console.error(`[build] Missing example h5 build output: ${h5Dist}`)
  process.exit(1)
}

rmSync(docsDistUi, { recursive: true, force: true })
mkdirSync(docsDistUi, { recursive: true })
cpSync(h5Dist, docsDistUi, { recursive: true })

console.log(`[build] Unified output ready: ${docsDistUi}`)