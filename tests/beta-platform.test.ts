import assert from 'node:assert/strict'
import test from 'node:test'

import { getSuggestedPlatform } from '../lib/beta-platform.ts'

test('suggests iOS for iPhone, iPad, and iPod browsers', () => {
  assert.equal(
    getSuggestedPlatform(
      'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'
    ),
    'ios'
  )
  assert.equal(
    getSuggestedPlatform(
      'Mozilla/5.0 (iPad; CPU OS 18_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148'
    ),
    'ios'
  )
})

test('suggests Android for Android browsers', () => {
  assert.equal(
    getSuggestedPlatform(
      'Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 Chrome/130.0 Mobile Safari/537.36'
    ),
    'android'
  )
})

test('leaves platform selection open for desktop browsers', () => {
  assert.equal(
    getSuggestedPlatform('Mozilla/5.0 (Macintosh; Intel Mac OS X 14_6) AppleWebKit/537.36 Chrome/130.0'),
    'other'
  )
})
