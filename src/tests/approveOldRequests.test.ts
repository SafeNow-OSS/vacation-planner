import payload from 'payload'
import handler from '../app/api/admin/approve-old-requests/route'
import { createMocks } from 'node-mocks-http'

jest.mock('payload', () => ({
  create: jest.fn().mockResolvedValue({ id: 'mocked-id' }),
  update: jest.fn().mockResolvedValue({}),
  findByID: jest.fn().mockResolvedValue({ status: 'approved' }),
  find: jest.fn().mockResolvedValue({
    docs: [{ id: 'mocked-id', status: 'pending' }],
  }),
}))

describe('Approve Old Requests Endpoint', () => {
  let userId: number
  let vacationRequestId: number

  beforeAll(async () => {
    // Create a user
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'testuser@example.com',
        password: 'password123',
        isAdmin: false,
      },
    })
    userId = user.id

    // Create a vacation request
    const vacationRequest = await payload.create({
      collection: 'vacation-requests',
      data: {
        requester_id: userId,
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString(),
        reason: 'Vacation',
        status: 'pending',
      },
    })
    vacationRequestId = vacationRequest.id

    // Update createdAt to be older than 10 days
    const tenDaysAgo = new Date()
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 11)
    await payload.update({
      collection: 'vacation-requests',
      id: vacationRequestId,
      data: {
        createdAt: tenDaysAgo.toISOString(),
      },
    })
  })

  it('should approve vacation requests older than 10 days', async () => {
    const { req, res } = createMocks({
      method: 'POST',
    })

    await handler(req, res)

    expect(res._getStatusCode()).toBe(200)
    const responseData = JSON.parse(res._getData())
    expect(responseData.message).toContain('1 vacation requests have been approved.')

    // Verify the vacation request status
    const updatedRequest = await payload.findByID({
      collection: 'vacation-requests',
      id: vacationRequestId,
    })
    expect(updatedRequest.status).toBe('approved')
  })
})
