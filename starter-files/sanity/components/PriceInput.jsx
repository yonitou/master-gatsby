import React from 'react';
import PatchEvent, { set, unset } from 'part:@sanity/form-builder/patch-event';

const createPatchFrom = (value) =>
  PatchEvent.from(value === '' ? unset() : set(Number(value)));

const PriceInput = ({ type, value, onChange, inputComponent }) => {
  const formatMoney = Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format;

  return (
    <div>
      <h2>
        {type.title} - {value ? formatMoney(value / 100) : ''}
      </h2>
      <p>{type.description}</p>
      <input
        type={type.name}
        value={value}
        onChange={(e) => onChange(createPatchFrom(e.target.value))}
        ref={inputComponent}
      />
    </div>
  );
};

export default PriceInput;
