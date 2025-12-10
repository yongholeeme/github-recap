import type {ReactNode} from 'react'

type GradientPreset = 'blue' | 'orange' | 'emerald' | 'purple' | 'indigo' | 'pink' | 'gray'

const GRADIENT_PRESETS: Record<GradientPreset, string> = {
    blue: 'from-blue-950 via-cyan-950 to-blue-950',
    orange: 'from-orange-950 via-amber-950 to-orange-950',
    emerald: 'from-emerald-950 via-teal-950 to-emerald-950',
    purple: 'from-slate-950 via-purple-950 to-slate-950',
    indigo: 'from-indigo-950 via-purple-950 to-fuchsia-950',
    pink: 'from-indigo-950 via-purple-950 to-pink-950',
    gray: 'from-slate-950 via-gray-900 to-zinc-950',
}

interface SectionGroupProps {
    children: ReactNode
    gradient: GradientPreset
}

export default function SectionGroup({children, gradient}: SectionGroupProps) {
    return <div className={`bg-linear-to-br ${GRADIENT_PRESETS[gradient]}`}>{children}</div>
}
