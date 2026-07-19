'use client'

import React, { createContext, useState, useCallback } from 'react'
import { Parcel, TrackingEvent, ParcelsContextType } from './types'

export const ParcelsContext = createContext<ParcelsContextType | undefined>(undefined)

// Mock initial data
const MOCK_PARCELS: Parcel[] = [
  {
    id: '1',
    tracking_code: 'APEX-K9M2X',
    sender: 'John Smith',
    receiver: 'Jane Doe',
    weight: 2.5,
    status: 'Delivered',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: '2',
    tracking_code: 'APEX-L5P7Q',
    sender: 'Alice Johnson',
    receiver: 'Bob Wilson',
    weight: 1.2,
    status: 'Out for Delivery',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: '3',
    tracking_code: 'APEX-R3T8W',
    sender: 'Tech Corp',
    receiver: 'Sarah Lee',
    weight: 0.8,
    status: 'In Transit',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

const MOCK_EVENTS: TrackingEvent[] = [
  {
    id: '1',
    parcel_id: '1',
    location: 'New York Distribution Center',
    status_message: 'Package delivered',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '2',
    parcel_id: '1',
    location: 'Los Angeles Sorting Facility',
    status_message: 'Package out for delivery',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '3',
    parcel_id: '1',
    location: 'Transit Hub',
    status_message: 'Package in transit',
    timestamp: new Date(Date.now() - 172800000).toISOString(),
  },
  {
    id: '4',
    parcel_id: '1',
    location: 'Origin Facility',
    status_message: 'Package picked up',
    timestamp: new Date(Date.now() - 432000000).toISOString(),
  },
  {
    id: '5',
    parcel_id: '2',
    location: 'Local Delivery Hub',
    status_message: 'Out for delivery',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: '6',
    parcel_id: '2',
    location: 'Regional Distribution Center',
    status_message: 'Package in transit',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: '7',
    parcel_id: '3',
    location: 'Origin Facility',
    status_message: 'Package picked up',
    timestamp: new Date(Date.now() - 86400000).toISOString(),
  },
]

export function ParcelsProvider({ children }: { children: React.ReactNode }) {
  const [parcels, setParcels] = useState<Parcel[]>(MOCK_PARCELS)
  const [events, setEvents] = useState<TrackingEvent[]>(MOCK_EVENTS)

  const addParcel = useCallback((parcel: Parcel) => {
    setParcels((prev) => [...prev, parcel])
  }, [])

  const addTrackingEvent = useCallback((event: TrackingEvent) => {
    setEvents((prev) => [...prev, event])
    // Update parcel status
    setParcels((prev) =>
      prev.map((p) => (p.id === event.parcel_id ? { ...p, status: event.status_message, updatedAt: new Date().toISOString() } : p))
    )
  }, [])

  const getParcelByTrackingCode = useCallback(
    (code: string) => {
      return parcels.find((p) => p.tracking_code === code)
    },
    [parcels]
  )

  const getEventsByParcelId = useCallback(
    (parcelId: string) => {
      return events.filter((e) => e.parcel_id === parcelId).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    },
    [events]
  )

  const value: ParcelsContextType = {
    parcels,
    events,
    addParcel,
    addTrackingEvent,
    getParcelByTrackingCode,
    getEventsByParcelId,
  }

  return <ParcelsContext.Provider value={value}>{children}</ParcelsContext.Provider>
}

export function useParcelsContext() {
  const context = React.useContext(ParcelsContext)
  if (!context) {
    throw new Error('useParcelsContext must be used within a ParcelsProvider')
  }
  return context
}
