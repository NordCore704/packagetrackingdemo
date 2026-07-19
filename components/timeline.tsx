import { MapPin, Clock } from 'lucide-react'
import { TrackingEvent } from '@/lib/types'

interface TimelineProps {
  events: TrackingEvent[]
}

export function Timeline({ events }: TimelineProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  if (events.length === 0) {
    return (
      <div className="flex items-center justify-center py-12">
        <p className="text-muted-foreground">No tracking events found</p>
      </div>
    )
  }

  return (
    <div className="relative space-y-6">
      {events.map((event, index) => (
        <div key={event.id} className="relative pl-8">
          {/* Timeline dot and line */}
          <div className="absolute left-0 top-1">
            <div className="flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border-2 border-primary bg-background shadow-sm z-10"></div>
            </div>
            {index < events.length - 1 && <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-16 bg-gradient-to-b from-primary/50 to-primary/10 top-6"></div>}
          </div>

          {/* Timeline content */}
          <div className="bg-card rounded-lg border border-border p-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-primary" />
                  <h4 className="font-semibold text-card-foreground">{event.location}</h4>
                </div>
                <p className="text-sm text-muted-foreground mb-2">{event.status_message}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatDate(event.timestamp)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
