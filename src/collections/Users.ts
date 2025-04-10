import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: () => true,
    update: ({ req, id }) => {
      // Allow all users to read their own data
      if (req.user?.id === id) {
        return true
      }
      // Allow admins to read all user data
      return !!req.user?.isAdmin
    },
  },
  fields: [
    {
      name: 'isAdmin',
      type: 'checkbox',
      label: 'Admin',
      defaultValue: false,
      access: {
        create: ({ req }) => {
          return !!req.user?.isAdmin
        },
        update: ({ req, id }) => {
          return !!req.user?.isAdmin && req.user.id !== id
        },
      },
    },
  ],
}
