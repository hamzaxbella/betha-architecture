import {defineType, defineField} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About content',
  type: 'document',
  fields: [
    defineField({
      name : "stitle",
      title : "Title",
      type : "string",
    }),
    defineField({
      name: 'about',
      title: 'About agency',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'philosophy',
      title: 'Philosophy',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'profile',
      title: 'Profile',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),

    defineField({
      name: 'awards',
      title: 'Awwards',
      type: 'object',
      fields: [
        defineField({
          name: 'en',
          title: 'English',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'fr',
          title: 'French',
          type: 'text',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'ar',
          title: 'Arabic',
          type: 'text',
          validation: (Rule) => Rule.required(),
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
  ],
})
