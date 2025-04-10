import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: true,
  access: {
    read: () => true, // Allow all users to read the data
  },
  fields: [
    {
      name: 'isAdmin',
      type: 'checkbox',
      label: 'Admin',
      defaultValue: false,
      admin: {
        readOnly: true, // Make the field read-only in the admin panel
      },
      hooks: {
        beforeChange: [
          ({ data, originalDoc }) => {
            // Prevent any changes to the isAdmin field
            if (originalDoc?.isAdmin !== undefined) {
              data.isAdmin = originalDoc.isAdmin
            }
            return data
          },
        ],
      },
    },
  ],
}