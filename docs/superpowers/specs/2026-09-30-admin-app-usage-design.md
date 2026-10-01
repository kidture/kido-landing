# Admin app usage — frontend design

**Date:** 2026-09-30
**Status:** Proposed for review; no frontend or backend implementation started

## Purpose

Give Kidture's founders a simple, private way to inspect aggregate use of Kido during the beta. The page is for internal learning, not investor distribution. It uses the definitions in [`kido-backend/docs/superpowers/specs/2026-09-30-usage-analytics-backend-design.md`](../../../../kido-backend/docs/superpowers/specs/2026-09-30-usage-analytics-backend-design.md): active households, saved caregiver actions, signup-relative return, and each user's local day and hour. It never displays a household, caregiver, child, health value, captured content, or document.

The usage page is read only. Filters and chart selections change what is viewed; they never change source records. The existing Android request management functions continue on their own page.

## Route and sign-in structure

| Route | Behavior |
|---|---|
| `/admin` | Sign-in page. An already signed-in admin goes to `/admin/app-usage`. |
| `/admin/login` | Redirects to `/admin` for existing bookmarks, preserving a safe internal destination. |
| `/admin/android-requests` | Existing Android beta request dashboard, including its current status filter, request actions, invitation flow, and CSV export. Existing `/admin?status=…` links redirect here with the status preserved. |
| `/admin/app-usage` | New aggregate-only usage dashboard. |

Both inner pages use the existing admin session and a shared admin shell. On desktop, a persistent left sidebar shows Kidture at the top, **App usage** and **Android requests** as the two primary navigation items, and **Sign out** at the bottom. The current page is visibly highlighted and marked with `aria-current="page"`. App usage is the default destination after sign-in. A direct visit to either inner page while signed out goes to `/admin`, then returns to the requested page after login. Only allowlisted internal admin destinations are accepted for this return path. This keeps deep links and request filters useful without creating another login system.

## Page layout

The app usage page sits in the main area to the right of the sidebar, with a readable content width. Its top contains the heading **App usage**, a quiet **Internal · read only** label, the last generated time, and a short sentence: “Aggregate saved activity across active households.” A compact date control offers **Last 7 days**, **Last 30 days** (default), **Last 90 days**, and **Custom range**. All period-based sections share that selection. A day/week switch changes only the activity chart's grouping; week buckets start Monday.

The content order follows the questions a founder will ask:

1. **Overview.** Six compact figures: eligible active households (current state); households with saved activity today; households with saved activity yesterday; households active in the selected period; total saved actions; and actions per active household. Today is labeled as a partial local day. These cards use the backend's per-household timezone rules, not the browser's timezone.
2. **Where value happens.** One simple horizontal bar list of approved action types, showing both distinct households and saved action counts. It groups capture/logging, schedules and completed events, wellness check-ins, and recent clinician reports. A nearby two-way view shows **subject** (parent, child, mixed) or **capture method** (voice, text, quick log, form, other manual). Connected-device households appear as a separate current-state figure, never mixed into caregiver actions. The UI does not call these “world visits” or claim that a feature was opened.
3. **Activity over time.** A daily/weekly bar chart of distinct households with a saved action. A small total-actions line or label accompanies each period. Hover, focus, or tap reveals the exact date, household count, and action count. Empty dates remain visible as zero.
4. **Coming back.** A compact signup-cohort view with relative weeks 1–4. Each week shows eligible households, households that returned with a saved action, and the percentage, plus action volume. Incomplete weeks display “Not yet complete” instead of a misleading zero. The heading and note explain that “returned” means a saved action, not an app reopen.
5. **Local time of day.** A 24-hour bar chart showing when saved actions happen in users' local time. A simple selector switches between **households** and **actions**. The timezone and daylight-saving caveat appears in an expandable “How these numbers are counted” note.

The final note also explains that deleted schedules/moments and seven-day clinician-report expiry can change older aggregates. Clinician-report figures carry a visible **recent 7-day coverage** label; an older date range does not display their missing history as zero. No time-spent, page-view, or literal app-open card appears because the current source records cannot support it.

### Rough hierarchy

```text
┌─────────────────────┬───────────────────────────────────────────────┐
│ Kidture             │ App usage                   Internal · read only│
│                     │ Aggregate saved activity across households    │
│ ▌ App usage         │ [7 days] [30 days] [90 days] [Custom range]   │
│   Android requests  │                                               │
│                     │ [Active households] [Saved today] [Yesterday] │
│                     │ [Active in period] [Actions] [Actions / house]│
│                     │                                               │
│                     │ Where value happens    [Subject | Method]     │
│                     │   grouped horizontal bars                      │
│                     │                                               │
│                     │ Activity over time       [Daily | Weekly]     │
│                     │   bars with exact values                       │
│                     │                                               │
│                     │ Coming back          Week 1  2  3  4          │
│                     │   eligible / returned / rate / actions        │
│                     │                                               │
│ Sign out            │ Local time of day  [Households | Actions]     │
│                     │ How these numbers are counted                  │
└─────────────────────┴───────────────────────────────────────────────┘

The Android requests page uses the same sidebar, with **Android requests** highlighted; its existing management content occupies the main area.
```

## Responsive behavior and accessibility

At desktop width the sidebar remains visible, the overview uses a three-column grid, and related charts may sit side by side. On phones, a compact top bar shows the Kidture name and a **Menu** button. The button opens a navigation panel with the same two links and sign out; selecting a link closes it. The current page is always visible in the top bar, so the location is clear even when the menu is closed. Content cards and sections stack in one column; controls wrap or become full width. The cohort display becomes week cards rather than a wide, tiny table. Chart values remain available as text, and bars have accessible names; color is never the only way to compare values. Touch targets are at least 44 px, labels remain visible, and focus states follow the existing site style. The existing Kidture cream, ink, and teal palette keeps it visually connected to Android requests.

## Data and loading behavior

The backend aggregate API described in the reference spec is not implemented yet. The production page must never silently present fabricated figures as live usage. For this frontend review, a clearly marked **Illustrative data** state may show representative aggregates so the layout can be evaluated. The live state replaces those figures only when a protected backend response is available. If that response is unavailable or fails, the page shows a clear “Usage data is not connected” or retry state, not zeroes. An actual empty period shows zero counts and an empty-series explanation.

The landing server reads the existing admin session and calls the backend with its dedicated analytics secret on the server only. The browser receives only the approved aggregate response; the secret and raw source rows never reach client code. The frontend can ask for overview, activity series, cohorts, and local-hour sections separately so changing a filter need not recompute unrelated sections. Final endpoint names, query parameters, and response nesting are chosen with the backend implementation. The browser never queries Kido's operational database directly.

The selected date range is reflected in the URL for refresh and sharing among admins. The route validates malformed dates and resets to the 30-day default. Values carry their denominators and the backend's `generated_at`, metric version, and coverage flags. The interface formats those values but does not redefine them.

## Scope and checks

The first build should include route moves, navigation, responsive read-only dashboard, filters, honest illustrative/disconnected/empty states, and the server-side aggregate data boundary. The usage page does not add account drilldowns, exports, third-party analytics, chart libraries, or investor sharing. No source-record updates come from `/admin/app-usage`.

Before shipping the frontend, verify signed-out redirects and deep-link return, preservation of existing Android request filters and actions, mobile widths, keyboard/touch chart access, date-range behavior, and no identifiers or analytics secret in browser output. The data integration is complete only when the backend read API exists and real aggregate fixtures have been checked end to end.
