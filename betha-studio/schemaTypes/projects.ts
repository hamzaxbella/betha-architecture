import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'string',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'text',
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'text',
        }),
      ],
    }),

    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields : [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'string',
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'string',
        }),
        ],
    }),

    defineField({
      name: 'client',
      title: 'Client',
      type: 'object',
      fields : [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'string',
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'string',
        }),
        ],
    }),

    defineField({
      name: 'area',
      title: 'Area',
      type: 'object',
      fields : [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'string',
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'string',
        }),
        ],
    }),

    defineField({
      name: 'budjet',
      title: 'Budjet',
      type: 'object',
      fields : [
        defineField({
          name: 'en',
          title: 'English',
          type: 'string',
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'string',
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'string',
        }),
        ],
    }),

    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Images',
      type: 'array',
      of: [{type: 'image'}], // Array of images
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    }),
  ],
})
