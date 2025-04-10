import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: ({ req }) => {
      return !!req.user?.isAdmin
    },
  },
  fields: [
    {
      name: 'isAdmin',
      type: 'checkbox',
      label: 'Admin',
      defaultValue: false,
    },
  ],
}
