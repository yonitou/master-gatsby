export default {
  // computer name
  name: 'foot',
  // visible title
  title: 'Feet',
  type: 'document',
  icon: () => '🦶🏻',
  fields: [
    {
      name: 'name',
      title: 'Foot name',
      type: 'string',
      description: 'Description of the foot',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      description: 'Tell us about them',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 100,
      },
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
};
