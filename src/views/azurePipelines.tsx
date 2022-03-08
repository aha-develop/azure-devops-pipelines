import React from 'react';
import Attribute from '@components/Attribute';

aha.on('azurePipelinesAttribute', ({ record, fields, onUnmounted }, { identifier, settings }) => {
  return <Attribute fields={fields} record={record} />;
});
