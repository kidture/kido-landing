# Product

<!-- impeccable:product-schema 1 -->

## Platform

adaptive

## Users

Primary users are parents and caregivers of children with chronic, complex, developmental, or hard-to-pin health patterns. They already hold the medical memory across specialists, schools, and co-parents, and they need somewhere for what happens between appointments.

Secondary audiences (not the daily operator): clinicians who receive structured caregiver-reported context at appointments; schools and co-carers who participate in handovers. The app is parent-operated today.

Onboarding intents the product explicitly supports: managing a chronic condition; spotting patterns; developmental check-ins; rare or complex care coordination; general wellbeing; exploring.

## Product Purpose

Kidture helps families capture daily pediatric health observations (voice, chat, structured check-ins) and turns them into patterns and clinician-ready summaries so care teams can act on the continuous story, not only the appointment snapshot.

Success looks like: a parent can log a moment in under a minute; the household sees rhythm and patterns over time; appointment handovers stop depending on fragmented memory alone.

Welcome positioning in-product: "Your child's health story, beautifully understood." Feature pillars on welcome: Track symptoms · Spot patterns · Share with doctors.

## Positioning

Kidture is not a generic notes app or a one-shot symptom checker. It is household health infrastructure: continuous caregiver observation structured across health domains, organized into Kid / Parent / Our worlds, so the family's lived pattern can travel into clinical conversation.

Legacy product name "Kido" still appears in some copy, package IDs (`com.kido.app`, slug `kido-app`), and older UI strings. Shipping consumer name is **Kidture** (Dev / Beta variants in `app.config.js`). Prefer Kidture in new user-facing surfaces; treat "Kido" as legacy unless a specific string is intentionally kept.

## Operating Context

- Homes, cars, nights, and school pickup: capture happens in the flow of caregiving, often by voice or short chat.
- Appointment prep: structured summaries and timelines for clinicians.
- Multi-child households: switchable child identities plus a parent ("You") workspace.
- Three world model: **Kid's World** (child health), **Your World** (parent wellbeing / devices / support), **Our World** (shared rhythms and household patterns).
- Companion marketing site: waitlist at kidture.health (US/UK), beta messaging Summer 2026, Patent Pending.

## Capabilities and Constraints

Confirmed in the Expo app:

- Auth (email, Apple, Google paths in codebase), onboarding (intent, modality, consent, permissions, wellbeing, add-child).
- Capture and chat-based logging; check-in flows and schedules.
- Patterns / rhythm surfaces; calendar and timeline.
- Multi-child + parent identity switching via world-identity chips and profile avatars.
- Light / dark mode; time-of-day band atmospheres on home.
- Device / wearable hooks appear in parent world (connectivity may be incomplete in places).

Constraints / undecided:

- Marketing site primary CTA today is waitlist, not App Store install. [inferred from landing]
- Clinical claims on the marketing site (AAP citation, named clinician quote, illustrative family scenarios) must stay labeled as illustrative or sourced; do not invent new commercial or clinical claims.
- HIPAA / regulatory posture: not fully specified in repo product docs; do not invent compliance badges. [open]

## Brand Commitments

- **Name:** Kidture (consumer). Kidture Health on legal/footer. Domain: kidture.health.
- **Voice:** calm, concrete, parent-side; product italic voice for insight lines in-app. Avoid hype verbs ("unleash", "revolutionize").
- **Visual brand system (binding for app + marketing alignment):** source of truth `constants/kidture.ts`. Neutral cream canvas and charcoal dark canvas; teal brand accent; olive-teal companion. Profile / workspace identity uses dedicated chip tones (not the page chrome). Legacy purple/lavender chrome is retired for new surfaces.
  - Cream canvas: `#FFF8F0`, `#FAF6F0`, `#F7F3EB` (muted tile `#F5F0E8`)
  - Charcoal canvas (dark / night): `#121010`, `#151318`, `#101012`
  - Brand teal: `#3FA9A0`; olive teal: `#5C8F86`
  - Primary text on cream: deep near-black `#0E0B20` (token name `Logo.ink`; treat as charcoal-family text, not purple navy)
  - Secondary / signpost on cream: `#3A3530`, `#5C5650`
  - Status accents: sage `#7EC8A4`, amber `#F9C74F`, coral `#F4845F`
  - Child identity chip fills (light): violet `#6B3FD4`, rose `#D63A52`, blue `#1A7AB8`, emerald `#0D9A72` (indexed by child order)
  - Parent identity chip: teal `#3FA9A0`
- **Assets:** wordmarks, marks, and launch PNGs under `assets/images/` and `assets/logos/png/`. Prefer current Kidture lockups over legacy purple-era marks.
- **Shape:** card radius ~20 in app; soft tinted shadows on charcoal ink, not pure black.

## Evidence on Hand

- In-app: welcome, onboarding intents, world overview, capture, patterns, check-ins, identity chips (`components/home/world-identity-chip.tsx`, `constants/kidture.ts`).
- Marketing (sibling `kido-landing`): waitlist form; illustrative family scenarios (explicitly labeled illustrative); clinician quote (Dr. Megan Marie Delegas); AAP 2023 caregiver-reported outcomes mention; stats used on hero (25M US children with chronic condition; &lt;60s to log; 296 hours/year) — treat as existing published marketing figures, do not invent new ones.
- No formal PRODUCT.md / DESIGN.md existed before this file; `design/DESIGN_BRIEF.md` is referenced by tokens but not present in the tree.

## Product Principles

1. **The story lives between appointments** — design for continuous household observation, not clinic-only moments.
2. **Capture must be fast and form-light** — voice and natural language beat category-heavy forms.
3. **Structure earns the clinical share** — patterns and summaries are the product; dumps of raw notes are not.
4. **Identity is personal; chrome is calm** — cream/charcoal grounds stay neutral; color for people and status, not decoration everywhere.
5. **Honest empty states** — building / priming language over fake fullness when there is not enough data yet.

## Accessibility & Inclusion

- Support light and dark modes with readable secondary text on cream and charcoal.
- Honor reduced-motion preferences for launch and scroll choreography.
- Health content must remain readable under stress (high-contrast primary text; avoid low-contrast gray-on-cream).
- No product-specific WCAG target documented beyond that; default to WCAG AA for new web surfaces. [inferred]
