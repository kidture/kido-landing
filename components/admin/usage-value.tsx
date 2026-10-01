'use client'

import { useState } from 'react'
import type { UsageReport } from '@/lib/admin/usage-server'
import { Bar, countDetail, number, switchClass } from '@/components/admin/usage-primitives'

type Props = Pick<UsageReport, 'actions' | 'subjects' | 'methods' | 'wellness_checkins' | 'device_state'>
const actionLabels: Record<string, string> = {
  capture_completed: 'Completed captures', quick_log_completed: 'Quick logs',
  form_log_completed: 'Form logs', other_manual_log_completed: 'Other manual logs',
  schedule_created: 'Schedules created', schedule_event_completed: 'Schedule events completed',
  clinician_report_ready: 'Clinician reports ready',
}
const subjectLabels: Record<string, string> = { parent: 'Parent related', child: 'Child related', mixed: 'Mixed' }
const methodLabels: Record<string, string> = { voice: 'Voice', text: 'Text', quick_log: 'Quick log', form: 'Form', other_manual: 'Other manual' }

export default function UsageValue({ actions, subjects, methods, wellness_checkins, device_state }: Props) {
  const [breakdown, setBreakdown] = useState<'subject' | 'method'>('subject')
  const labels = breakdown === 'subject' ? subjectLabels : methodLabels
  const values = breakdown === 'subject' ? subjects : methods
  const actionMax = Math.max(...Object.values(actions).map((value) => value.actions), 1)
  const detailMax = Math.max(...Object.values(values).map((value) => value.actions), 1)

  return <section aria-labelledby="usage-value" className="rounded-card border border-kt-ink/10 bg-white p-5 shadow-soft sm:p-6">
    <h2 id="usage-value" className="text-xl font-bold tracking-[-0.03em]">Where value happens</h2>
    <p className="mt-1 text-sm text-kt-secondary">Households and completed saved actions by source.</p>
    <div className="mt-4 divide-y divide-kt-ink/10">
      {Object.entries(actionLabels).map(([key, label]) => {
        const count = actions[key] ?? { actions: 0, households: 0 }
        return <Bar key={key} label={label} count={count.actions} max={actionMax}
          detail={`${countDetail(count)}${key === 'clinician_report_ready' ? ' · recent 7-day coverage' : ''}`} />
      })}
      <Bar label="Parent wellness check-ins" count={wellness_checkins.actions} max={actionMax}
        detail={`${countDetail(wellness_checkins)} · subset of schedule completions`} />
    </div>
    <div className="mt-6 border-t border-kt-ink/10 pt-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3 className="text-base font-bold">How actions are used</h3>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Breakdown view">
          <button type="button" aria-pressed={breakdown === 'subject'} onClick={() => setBreakdown('subject')} className={switchClass(breakdown === 'subject')}>Subject</button>
          <button type="button" aria-pressed={breakdown === 'method'} onClick={() => setBreakdown('method')} className={switchClass(breakdown === 'method')}>Capture method</button>
        </div>
      </div>
      <div className="mt-3 divide-y divide-kt-ink/10">{Object.entries(labels).map(([key, label]) =>
        <Bar key={key} label={label} count={values[key]?.actions ?? 0} max={detailMax}
          detail={countDetail(values[key] ?? { actions: 0, households: 0 })} />)}</div>
      <p className="mt-4 rounded-control bg-kt-cream px-4 py-3 text-sm text-kt-secondary"><strong className="text-kt-ink">Connected devices now:</strong> {number(device_state.households)} households. This is connection state, not a saved action.</p>
    </div>
  </section>
}
