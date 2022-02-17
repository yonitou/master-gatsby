export default {
  // computer name
  name: 'storeSettings',
  // visible title
  title: 'Settings',
  type: 'document',
  icon: () => '🏪',
  fields: [
    {
      name: 'name',
      title: 'Nom du magasin',
      type: 'string',
      description: 'Nom du magasin',
    },
    {
      name: 'foot',
      title: 'Pieds Actuellement Disponibles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'foot' }] }],
    },
    {
      name: 'hotSocks',
      title: 'Nouvelles chaussettes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'sock' }] }],
    },
  ],
};
