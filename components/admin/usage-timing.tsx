'use client'

import { useState } from 'react'
import type { UsageReport } from '@/lib/admin/usage-server'
import { Bar, countDetail, switchClass } from '@/components/admin/usage-primitives'

export default function UsageTiming({ local_hours }: { local_hours: UsageReport['local_hours'] }) {
  const [measure, setMeasure] = useState<'households' | 'actions'>('households')
  const max = Math.max(...local_hours.map((hour) => hour[measure]), 1)
  return <section aria-labelledby="usage-hours" className="rounded-card border border-kt-ink/10 bg-white p-5 shadow-soft sm:p-6">
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div><h2 id="usage-hours" className="text-xl font-bold tracking-[-0.03em]">Local time of day</h2><p className="mt-1 text-sm text-kt-secondary">When saved actions happen in each user’s local time.</p></div>
      <div className="flex gap-2" role="group" aria-label="Hour measure">
        <button type="button" aria-pressed={measure === 'households'} onClick={() => setMeasure('households')} className={switchClass(measure === 'households')}>Households</button>
        <button type="button" aria-pressed={measure === 'actions'} onClick={() => setMeasure('actions')} className={switchClass(measure === 'actions')}>Actions</button>
      </div>
    </div>
    <div className="mt-4 grid gap-x-8 lg:grid-cols-2">{local_hours.map((row) =>
      <Bar key={row.hour} label={`${String(row.hour).padStart(2, '0')}:00`} count={row[measure]} max={max} detail={countDetail(row)} />)}</div>
  </section>
}
