import { MapPin, Info } from 'lucide-react'

// Adjust this interface to match your Prisma schema perfectly
interface TrackingEvent {
  id: string;
  parcelId: string;
  status: string;
  location: string;
  statusMessage: string;
  timestamp: string | Date;
}

interface TimelineProps {
  events: TrackingEvent[];
}

export function Timeline({ events }: TimelineProps) {
  // Format the date to look clean (e.g., "Jul 20, 2026")
  const formatDate = (dateInput: string | Date) => {
    const date = new Date(dateInput)
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    })
  }

  // Format the raw status string (e.g., "OUT_FOR_DELIVERY" -> "OUT FOR DELIVERY")
  const formatStatus = (status: string) => {
    return status.replace(/_/g, ' ')
  }

  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 bg-slate-50 border border-slate-100 rounded-[2rem]">
        <MapPin className="w-8 h-8 text-slate-300 mb-3" />
        <p className="text-slate-500 font-medium">No transit history available yet.</p>
      </div>
    )
  }

  return (
    <div className="relative border-l-2 border-indigo-100/70 ml-3 md:ml-4 space-y-8 pb-4">
      {events.map((event, index) => {
        // Because events are ordered newest-first, the LAST item in the array is the FIRST event chronologically
        const isInitialEvent = index === events.length - 1;
        
        // Clean up the robotic first message
        const displayMessage = isInitialEvent 
          ? 'Shipment officially registered and dispatch sequence initiated.' 
          : event.statusMessage;

        // Visual check to highlight the most recent (current) event differently
        const isCurrentStatus = index === 0;

        return (
          <div key={event.id} className="relative pl-8 md:pl-10 group">
            
            {/* Timeline Dot */}
            <div className={`absolute left-[-9px] top-4 w-4 h-4 rounded-full border-[3px] border-white shadow-sm transition-colors ${
              isCurrentStatus ? 'bg-indigo-600' : 'bg-indigo-200 group-hover:bg-indigo-400'
            }`} />

            {/* Event Card */}
            <div className={`rounded-2xl p-5 transition-all ${
              isCurrentStatus 
                ? 'bg-white border border-indigo-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-indigo-50' 
                : 'bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-sm'
            }`}>
              
              {/* Header: Status and Date */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className={`text-[11px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-md ${
                  isCurrentStatus 
                    ? 'bg-indigo-50 text-indigo-600' 
                    : 'bg-slate-200/50 text-slate-500'
                }`}>
                  {formatStatus(event.status)}
                </span>
                {/* <span className="text-xs font-medium text-slate-400 bg-white px-2.5 py-1 rounded-md border border-slate-100/80 shadow-sm">
                  {formatDate(event.timestamp)}
                </span> */}
              </div>
              
              {/* Location */}
              <div className="flex items-start gap-3 mb-4">
                <div className={`mt-0.5 p-1.5 rounded-lg ${isCurrentStatus ? 'bg-indigo-50 text-indigo-600' : 'bg-slate-200/50 text-slate-400'}`}>
                  <MapPin className="w-4 h-4" />
                </div>
                <h4 className={`font-medium text-lg tracking-tight ${isCurrentStatus ? 'text-slate-900' : 'text-slate-700'}`}>
                  {event.location}
                </h4>
              </div>

              {/* Status Message Block (Replacing the old timestamp area) */}
              <div className={`flex items-start gap-2.5 p-3.5 rounded-xl border ${
                isCurrentStatus 
                  ? 'bg-indigo-50/50 border-indigo-100/50 text-slate-700' 
                  : 'bg-white border-slate-100 text-slate-500'
              }`}>
                <Info className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isCurrentStatus ? 'text-indigo-400' : 'text-slate-400'}`} />
                <p className="text-sm leading-relaxed font-medium">
                  {displayMessage}
                </p>
              </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}