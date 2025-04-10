import type { CollectionConfig } from 'payload'

export const VacationRequests: CollectionConfig = {
  slug: 'vacation-requests',
  labels: {
    singular: 'Vacation Request',
    plural: 'Vacation Requests',
  },
  admin: {
    useAsTitle: 'startDate',
  },
  access: {
    read: ({ req: { user } }) => {
      if (user?.isAdmin) {
        return true // Admins can access all vacation requests
      }
      return {
        requester: {
          equals: user?.id, // Non-admins can only access their own vacation requests
        },
      }
    },
  },
  fields: [
    {
      name: 'requester',
      type: 'relationship',
      label: 'Requester',
      relationTo: 'users',
      required: true,
      defaultValue: ({ req }) => {
        return req.user?.id
      },
    },
    {
      name: 'startDate',
      type: 'date',
      label: 'Start Date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
      label: 'End Date',
      required: true,
    },
    {
      name: 'reason',
      type: 'textarea',
      label: 'Reason for Vacation',
      required: false,
    },
    {
      name: 'status',
      type: 'select',
      label: 'Approval Status',
      access: {
        create: ({ req }) => {
          return !!req.user?.isAdmin
        },
      },
      options: [
        {
          label: 'Pending',
          value: 'pending',
        },
        {
          label: 'Approved',
          value: 'approved',
        },
        {
          label: 'Rejected',
          value: 'rejected',
        },
      ],
      defaultValue: 'pending',
      required: true,
    },
  ],
}
