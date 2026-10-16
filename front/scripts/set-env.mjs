import { existsSync, readFileSync, writeFileSync } from 'node:fs'

const template = 'src/environments/environment.ts'
const target = 'src/environments/environment.local.ts'

const values = new Map()
if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$/)
    if (!match || match[1] === undefined) continue
    const value = (match[2] ?? '').replace(/^(['"])(.*)\1$/, '$2')
    if (value) values.set(match[1], value)
  }
}

let content = readFileSync(template, 'utf8')
for (const [key, value] of values) {
  const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  content = content.replaceAll(`'${key}'`, () => `'${escaped}'`)
}

writeFileSync(target, content)
console.debug(`${target} generated (${values.size} value(s) from .env)`)
