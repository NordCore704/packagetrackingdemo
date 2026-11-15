import { CheckCircle2, Clock, Truck, AlertTriangle, Package } from 'lucide-react'

interface StatusBadgeProps {
  status: string
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase().replace(/_/g, ' ')

  const config: Record<string, { bg: string; text: string; icon: React.ReactNode; label: string }> = {
    delivered: {
      bg: 'bg-emerald-50 border-emerald-200',
      text: 'text-emerald-700',
      icon: <CheckCircle2 className="w-4 h-4" />,
      label: 'Delivered',
    },
    'out for delivery': {
      bg: 'bg-sky-50 border-sky-200',
      text: 'text-sky-700',
      icon: <Truck className="w-4 h-4" />,
      label: 'Out for Delivery',
    },
    'in transit': {
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-700',
      icon: <Clock className="w-4 h-4" />,
      label: 'In Transit',
    },
    'label created': {
      bg: 'bg-slate-50 border-slate-200',
      text: 'text-slate-600',
      icon: <Package className="w-4 h-4" />,
      label: 'Label Created',
    },
    'held at customs': {
      bg: 'bg-orange-50 border-orange-200',
      text: 'text-orange-700',
      icon: <AlertTriangle className="w-4 h-4" />,
      label: 'Held at Customs',
    },
    exception: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-700',
      icon: <AlertTriangle className="w-4 h-4" />,
      label: 'Exception',
    },
  }

  const style = config[normalized] || {
    bg: 'bg-slate-50 border-slate-200',
    text: 'text-slate-600',
    icon: <Package className="w-4 h-4" />,
    label: status.replace(/_/g, ' '),
  }

  return (
    <span
      className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg border text-sm font-medium ${style.bg} ${style.text}`}
    >
      {style.icon}
      {style.label}
    </span>
  )
}