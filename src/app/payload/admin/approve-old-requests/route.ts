import { NextApiRequest, NextApiResponse } from 'next'
import payload from 'payload'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

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

    res.status(200).json({
      message: `${pendingRequests.docs.length} vacation requests have been approved.`,
    })
  } catch (error) {
    console.error('Error approving vacation requests:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
