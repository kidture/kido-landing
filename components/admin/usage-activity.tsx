'use client'

import { useState } from 'react'
import type { UsageReport } from '@/lib/admin/usage-server'
import { Bar, countDetail, switchClass } from '@/components/admin/usage-primitives'

export default function UsageActivity({ series }: { series: UsageReport['series'] }) {
  const [grouping, setGrouping] = useState<'daily' | 'weekly'>('daily')
  const rows = series[grouping]
  const max = Math.max(...rows.map((row) => row.households), 1)
  return <section aria-labelledby="usage-activity" className="rounded-card border border-kt-ink/10 bg-white p-5 shadow-soft sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h2 id="usage-activity" className="text-xl font-bold tracking-[-0.03em]">Activity over time</h2><p className="mt-1 text-sm text-kt-secondary">Distinct households with a saved action.</p></div>
      <div className="flex gap-2" role="group" aria-label="Activity grouping">
        <button type="button" aria-pressed={grouping === 'daily'} onClick={() => setGrouping('daily')} className={switchClass(grouping === 'daily')}>Daily</button>
        <button type="button" aria-pressed={grouping === 'weekly'} onClick={() => setGrouping('weekly')} className={switchClass(grouping === 'weekly')}>Weekly</button>
      </div>
    </div>
    {rows.every((row) => row.actions === 0)
      ? <p className="mt-5 text-sm text-kt-secondary">No saved actions in these dates.</p>
      : <div className="mt-4 max-h-[34rem] divide-y divide-kt-ink/10 overflow-y-auto">{rows.map((row) => {
          const label = 'date' in row ? row.date : `Week of ${row.week_start}`
          return <Bar key={label} label={label} count={row.households} max={max} detail={countDetail(row)} />
        })}</div>}
  </section>
}
