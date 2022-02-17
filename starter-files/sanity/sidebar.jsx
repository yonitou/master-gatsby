import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

const Sidebar = () =>
  S.list()
    .title(`Slicks Socks`)
    .items([
      S.listItem()
        .title('Home Page')
        .icon(() => <strong>🏪</strong>)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);

export default Sidebar;
