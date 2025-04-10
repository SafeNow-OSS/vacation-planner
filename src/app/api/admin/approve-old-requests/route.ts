import { getPayload } from 'payload'
import config from '@payload-config'
import { NextResponse } from 'next/server'

export const POST = async function handler() {
  const payload = await getPayload({ config })

  try {
    const tenDaysAgo = new Date()
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10)

    // Find all pending vacation requests older than 10 days
    const pendingRequests = await payload.find({
      collection: 'vacation-requests',
      where: {
        status: {
          equals: 'pending',
        },
        createdAt: {
          less_than: tenDaysAgo.toISOString(),
        },
      },
    })

    // Update the status of each request to 'approved'
    const updatePromises = pendingRequests.docs.map((request) => {
      return payload.update({
        collection: 'vacation-requests',
        id: request.id,
        data: {
          status: 'approved',
        },
      })
    })

    await Promise.all(updatePromises)

    return NextResponse.json(
      { message: 'Vacation requests approved successfully' },
      { status: 200 },
    )
  } catch (error) {
    console.error('Error approving vacation requests:', error)
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 },
    )
  }
}
