import type { UsageReport, Count } from '@/lib/admin/usage-server'
import { number } from '@/components/admin/usage-primitives'

type Props = Pick<UsageReport, 'cohorts' | 'account_age'>
const ageLabels: Record<string, string> = {
  week_1: 'Week 1', week_2: 'Week 2', week_3: 'Week 3', week_4: 'Week 4', week_5_plus: 'Week 5+',
}

export default function UsageRetention({ cohorts, account_age }: Props) {
  return <div className="space-y-7">
    <section aria-labelledby="usage-age" className="rounded-card border border-kt-ink/10 bg-white p-5 shadow-soft sm:p-6">
      <h2 id="usage-age" className="text-xl font-bold tracking-[-0.03em]">By account age today</h2>
      <p className="mt-1 text-sm leading-6 text-kt-secondary">Households grouped by how long they have had an account as of today. “This week” is the current Monday-start calendar week, separate from account week 1 or 2.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Object.entries(ageLabels).map(([key, label]) => {
          const row = account_age[key]
          if (!row) return null
          const periods: Array<[string, Count]> = [['Today', row.today], ['Yesterday', row.yesterday], ['This week', row.this_week], ['Selected dates', row.selected_period]]
          return <article key={key} className="rounded-card border border-kt-ink/10 bg-kt-cream p-4">
            <h3 className="font-bold">{label} <span className="font-normal text-kt-secondary">· {number(row.eligible_households)} eligible</span></h3>
            <dl className="mt-3 space-y-2 text-sm">{periods.map(([period, value]) =>
              <div key={period} className="flex justify-between gap-3"><dt className="text-kt-secondary">{period}</dt><dd className="text-right tabular-nums">{number(value.households)} households · {number(value.actions)} actions</dd></div>)}</dl>
          </article>
        })}
      </div>
    </section>

    <section aria-labelledby="usage-return" className="rounded-card border border-kt-ink/10 bg-white p-5 shadow-soft sm:p-6">
      <h2 id="usage-return" className="text-xl font-bold tracking-[-0.03em]">Coming back</h2>
      <p className="mt-1 text-sm leading-6 text-kt-secondary">Signup cohorts in the selected dates. Returned means a saved action within an account-age week, not an app reopen. Each week uses all active households old enough to have completed it.</p>
      {cohorts.length === 0 ? <p className="mt-5 text-sm text-kt-secondary">No eligible signup cohorts in these dates.</p> :
        <div className="mt-4 space-y-4">{cohorts.map((cohort) => <article key={cohort.signup_week} className="rounded-card border border-kt-ink/10 bg-kt-cream p-4">
          <h3 className="font-bold">Signup week of {cohort.signup_week} <span className="font-normal text-kt-secondary">· {number(cohort.households)} households</span></h3>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">{cohort.weeks.map((week) => <div key={week.week} className="rounded-control bg-white p-3 text-sm">
            <p className="font-bold">Week {week.week}</p>
            <p className="mt-1 text-kt-secondary">{week.eligible === 0 ? 'Not yet complete' : `${number(week.returned)} of ${number(week.eligible)} returned · ${Math.round((week.rate ?? 0) * 100)}%`}</p>
            <p className="mt-1 text-xs text-kt-signpost">{number(week.actions)} saved actions</p>
          </div>)}</div>
        </article>)}</div>}
    </section>
  </div>
}
