export default {
  // computer name
  name: 'topping',
  // visible title
  title: 'Toppings',
  type: 'document',
  icon: () => '🥓',
  fields: [
    {
      name: 'name',
      title: 'Topping name',
      type: 'string',
      description: 'What is the name of the topping',
    },
    {
      name: 'vegetalian',
      title: 'Vegetalian',
      type: 'boolean',
      description: 'Is it vegetalian',
      options: {
        layout: 'checkbox',
      },
    },
  ],
  preview: {
    select: {
      name: 'name',
      vegetalian: 'vegetalian',
    },
    prepare: ({ name, vegetalian }) => ({
      title: `${name} ${vegetalian ? '🌱' : ''} `,
    }),
  },
};
