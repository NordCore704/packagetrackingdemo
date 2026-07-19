'use server'

import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export async function createParcel(data: {
  senderName: string;
  senderPhone?: string;
  senderAddress?: string;
  originCity: string;
  originCountry: string;
  
  receiverName: string;
  receiverPhone?: string;
  receiverAddress?: string;
  destinationCity: string;
  destinationCountry: string;
  
  dispatchOffice: string;
  pickupDate: string;
  dispatchDate: string;
  expectedDeliveryDate?: string;
  
  packages: Array<{ name: string; weight: number; quantity: number }>;
}) {
  try {
    const randomString = Math.random().toString(36).substring(2, 8).toUpperCase()
    const trackingCode = `APEX-${randomString}`

    const newParcel = await db.parcel.create({
      data: {
        trackingCode,
        
        senderName: data.senderName,
        senderPhone: data.senderPhone || null,
        senderAddress: data.senderAddress || null,
        originCity: data.originCity,
        originCountry: data.originCountry,
        
        receiverName: data.receiverName,
        receiverPhone: data.receiverPhone || null,
        receiverAddress: data.receiverAddress || null,
        destinationCity: data.destinationCity,
        destinationCountry: data.destinationCountry,
        
        dispatchOffice: data.dispatchOffice,
        pickupDate: new Date(data.pickupDate),
        dispatchDate: new Date(data.dispatchDate),
        expectedDeliveryDate: data.expectedDeliveryDate ? new Date(data.expectedDeliveryDate) : null,
        
        status: 'LABEL_CREATED',
        
        // Nested Write: Create the packages seamlessly
        packages: {
          create: data.packages.map(pkg => ({
            name: pkg.name,
            weight: pkg.weight,
            quantity: pkg.quantity
          }))
        },
        
        // Create the initial tracking event
        events: {
          create: {
            status: 'LABEL_CREATED',
            location: data.dispatchOffice,
            statusMessage: 'Shipment registered and tracking generated.',
          }
        }
      },
    })

    revalidatePath('/admin') 
    
    return { success: true, trackingCode: newParcel.trackingCode }
  } catch (error) {
    console.error('Action Error:', error)
    return { success: false, error: 'Failed to create complex parcel structure' }
  }
}

export async function addTrackingEvent(data: {
  parcelId: string;
  status: any; // Maps to ParcelStatus ENUM
  location: string;
  statusMessage: string;
  expectedDeliveryDate?: string;
}) {
  try {
    // Nested write: Update the parcel's main status and push a new event
    await db.parcel.update({
      where: { id: data.parcelId },
      data: {
        status: data.status,
        // Only update the expected delivery date if a new one was provided
        ...(data.expectedDeliveryDate && { expectedDeliveryDate: new Date(data.expectedDeliveryDate) }),
        events: {
          create: {
            status: data.status,
            location: data.location,
            statusMessage: data.statusMessage,
          }
        }
      }
    })

    revalidatePath('/admin')
    revalidatePath('/tracking') // Ensure the public tracking page clears its cache
    
    return { success: true }
  } catch (error) {
    console.error('Update Error:', error)
    return { success: false, error: 'Failed to update tracking status' }
  }
}


export async function getParcelTracking(trackingCode: string) {
  try {
    const parcel = await db.parcel.findUnique({
      where: { trackingCode },
      include: {
        events: {
          orderBy: { timestamp: 'desc' },
        },
        packages: true,
      },
    })

    if (!parcel) {
      return { success: false, error: 'Tracking code not found' }
    }

    return { success: true, parcel }
  } catch (error) {
    console.error('Fetch Error:', error)
    return { success: false, error: 'Failed to fetch tracking data' }
  }
}
export async function getAllParcels() {
  try {
    const parcels = await db.parcel.findMany({
      orderBy: { createdAt: 'desc' }, // Newest first
    })
    return { success: true, parcels }
  } catch (error) {
    console.error('Fetch Error:', error)
    return { success: false, error: 'Failed to fetch parcels' }
  }
}

export async function createCustomParcel(data: {
  trackingCode: string;
  senderName: string;
  senderPhone?: string;
  senderAddress?: string;
  originCity: string;
  originCountry: string;
  
  receiverName: string;
  receiverPhone?: string;
  receiverAddress?: string;
  destinationCity: string;
  destinationCountry: string;
  
  dispatchOffice: string;
  pickupDate: string;
  dispatchDate: string;
  expectedDeliveryDate?: string;
  
  packages: Array<{ name: string; weight: number; quantity: number }>;
}) {
  try {
    const formattedCode = data.trackingCode.trim().toUpperCase()

    // 1. Safety Check: Ensure the code isn't already in the database
    const existingParcel = await db.parcel.findUnique({
      where: { trackingCode: formattedCode }
    })

    if (existingParcel) {
      return { success: false, error: 'This tracking code is already in use. Please enter a unique code.' }
    }

    // 2. Create the parcel using Nested Writes
    const newParcel = await db.parcel.create({
      data: {
        trackingCode: formattedCode,
        
        senderName: data.senderName,
        senderPhone: data.senderPhone || null,
        senderAddress: data.senderAddress || null,
        originCity: data.originCity,
        originCountry: data.originCountry,
        
        receiverName: data.receiverName,
        receiverPhone: data.receiverPhone || null,
        receiverAddress: data.receiverAddress || null,
        destinationCity: data.destinationCity,
        destinationCountry: data.destinationCountry,
        
        dispatchOffice: data.dispatchOffice,
        pickupDate: new Date(data.pickupDate),
        dispatchDate: new Date(data.dispatchDate),
        expectedDeliveryDate: data.expectedDeliveryDate ? new Date(data.expectedDeliveryDate) : null,
        
        status: 'LABEL_CREATED',
        
        packages: {
          create: data.packages.map(pkg => ({
            name: pkg.name,
            weight: pkg.weight,
            quantity: pkg.quantity
          }))
        },
        
        events: {
          create: {
            status: 'LABEL_CREATED',
            location: data.dispatchOffice,
            statusMessage: 'Shipment registered and custom tracking code verified.',
          }
        }
      },
    })

    revalidatePath('/arc') 
    
    return { success: true, trackingCode: newParcel.trackingCode }
  } catch (error) {
    console.error('Action Error:', error)
    return { success: false, error: 'Failed to create parcel with custom code.' }
  }
}