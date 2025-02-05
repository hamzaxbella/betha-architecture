// category.ts
import { defineType, defineField } from 'sanity';

export const category = defineType({
  name: 'category',
  title: 'Category',
  type: 'document',
  fields: [
    defineField({
      name: 'stitle',
      title: 'Category Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'stitle',
        maxLength: 96,
      },
    }),
    defineField({
      name : 'categoryName',
      title : 'Category Name',
      type : 'object',
      fields : [
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

      ]
    })
  ],
});
