import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = readFileSync(new URL('../components/beta-access.tsx', import.meta.url), 'utf8')

test('uses the official Kidture wordmark in the beta page header without stretching it', () => {
  assert.match(source, /src="\/brand\/svg\/kidture-wordmark-nav-ink\.svg"/)
  assert.match(source, /className="h-7\s+w-auto"/)
})

test('stacks beta cards and detail headers on phones before using a horizontal layout', () => {
  assert.match(source, /flex-col[\s\S]{0,220}sm:flex-row\s+sm:items-center/)
  assert.match(source, /flex-col\s+items-start[\s\S]{0,120}sm:flex-row\s+sm:items-start/)
})

test('uses a full-width beta action on phones without changing the desktop action width', () => {
  assert.match(source, /flex\s+min-h-12\s+w-full[\s\S]*?sm:inline-flex\s+sm:w-auto/)
})
