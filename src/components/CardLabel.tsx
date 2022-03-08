import React from 'react';

export type CardLabelProps = {
  title: string;
  value?: string;
};

const CardLabel = ({ title, value = 'Unknown' }: CardLabelProps) => {
  return (
    <span>
      <strong>{title}:</strong> {value ?? 'Unknown'}
    </span>
  );
};

export default CardLabel;
