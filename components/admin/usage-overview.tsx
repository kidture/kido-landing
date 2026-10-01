import type { UsageReport } from '@/lib/admin/usage-server'
import { Metric, number } from '@/components/admin/usage-primitives'

export default function UsageOverview({ overview }: { overview: UsageReport['overview'] }) {
  return <section aria-labelledby="usage-overview">
    <h2 id="usage-overview" className="mb-4 text-xl font-bold tracking-[-0.03em]">Overview</h2>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Metric label="Active households" value={number(overview.eligible_households)} note="Eligible now" />
      <Metric label="Saved activity today" value={number(overview.saved_activity_today)} note="Households · partial local day" />
      <Metric label="Saved activity yesterday" value={number(overview.saved_activity_yesterday)} note="Households · local day" />
      <Metric label="Saved activity this week" value={number(overview.saved_activity_this_week)} note="Households · Monday start · partial week" />
      <Metric label="Active in selected dates" value={number(overview.active_households)} note="Distinct households" />
      <Metric label="Saved actions" value={number(overview.total_actions)} note="Selected dates" />
      <Metric label="Actions per active household" value={overview.actions_per_active_household.toFixed(2)} note="Selected dates" />
    </div>
  </section>
}
