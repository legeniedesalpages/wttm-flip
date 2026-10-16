import { readFileSync, writeFileSync } from 'node:fs'

const [file] = process.argv.slice(2)
if (!file) {
  console.error('Usage: node scripts/replace-env.mjs <file>')
  process.exit(1)
}

const placeholders = [...readFileSync(file, 'utf8').matchAll(/'([A-Z][A-Z0-9_]+)'/g)].map(m => m[1])
let content = readFileSync(file, 'utf8')
const missing = []

for (const key of new Set(placeholders)) {
  const value = process.env[key]
  if (!value) {
    missing.push(key)
    continue
  }
  const escaped = value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")
  content = content.replaceAll(`'${key}'`, () => `'${escaped}'`)
}

writeFileSync(file, content)
if (missing.length) {
  console.warn(`Variables non renseignées : ${missing.join(', ')}`)
}
