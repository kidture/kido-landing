export type BetaPlatform = 'ios' | 'android' | 'other'

export function getSuggestedPlatform(userAgent: string): BetaPlatform {
  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    return 'ios'
  }

  if (/Android/i.test(userAgent)) {
    return 'android'
  }

  return 'other'
}
