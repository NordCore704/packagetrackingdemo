import { MapPin, Clock } from 'lucide-react'

interface TrackingEvent {
  id: string
  parcelId: string
  status: string
  location: string
  statusMessage: string
  timestamp: string | Date
}

interface TimelineProps {
  events: TrackingEvent[]
}

export function Timeline({ events }: TimelineProps) {
  const formatDate = (dateInput: string | Date) => {
    const date = new Date(dateInput)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (dateInput: string | Date) => {
    const date = new Date(dateInput)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ')
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-4">
          <MapPin className="w-5 h-5 text-slate-400" />
        </div>
        <p className="text-slate-500 font-medium">No transit history yet</p>
        <p className="text-sm text-slate-400 mt-1">Updates will appear here as the shipment moves.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {events.map((event, index) => {
        const isLatest = index === 0
        const isFirst = index === events.length - 1

        const message = isFirst
          ? 'Shipment registered and tracking activated.'
          : event.statusMessage

        return (
          <div
            key={event.id}
            className={`relative rounded-2xl border p-5 transition-all ${
              isLatest
                ? 'bg-amber-50/60 border-amber-200 shadow-sm'
                : 'bg-white border-slate-200 hover:border-slate-300'
            }`}
          >
            {/* Top row: status + date */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isLatest ? 'bg-amber-500' : 'bg-slate-300'
                  }`}
                />
                <span
                  className={`text-xs font-semibold uppercase tracking-wide ${
                    isLatest ? 'text-amber-700' : 'text-slate-500'
                  }`}
                >
                  {formatStatus(event.status)}
                </span>
              </div>

              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock className="w-3.5 h-3.5" />
                <span>
                  {formatDate(event.timestamp)} · {formatTime(event.timestamp)}
                </span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-2.5 mb-3">
              <MapPin
                className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                  isLatest ? 'text-amber-600' : 'text-slate-400'
                }`}
              />
              <p
                className={`font-medium leading-snug ${
                  isLatest ? 'text-slate-900' : 'text-slate-700'
                }`}
              >
                {event.location}
              </p>
            </div>

            {/* Message */}
            <p
              className={`text-sm leading-relaxed pl-6 ${
                isLatest ? 'text-slate-700' : 'text-slate-500'
              }`}
            >
              {message}
            </p>
          </div>
        )
      })}
    </div>
  )
}