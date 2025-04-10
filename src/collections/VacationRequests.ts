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
