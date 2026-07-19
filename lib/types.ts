export interface Parcel {
  id: string
  tracking_code: string
  sender: string
  receiver: string
  weight: number
  status: string
  createdAt: string
}

export interface TrackingEvent {
  id: string
  parcel_id: string
  location: string
  status_message: string
  timestamp: string
}

export interface ParcelsContextType {
  parcels: Parcel[]
  events: TrackingEvent[]
  addParcel: (parcel: Parcel) => void
  addTrackingEvent: (event: TrackingEvent) => void
  getParcelByTrackingCode: (code: string) => Parcel | undefined
  getEventsByParcelId: (parcelId: string) => TrackingEvent[]
}
