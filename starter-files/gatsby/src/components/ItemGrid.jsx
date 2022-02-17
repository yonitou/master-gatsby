import React from 'react';
import { StyledItem, StyledItemsGrid } from '../styles/Grid';

const ItemGrid = ({ items }) => (
  <StyledItemsGrid>
    {items.map((item) => (
      <StyledItem>
        <p>
          <span className="mark">{item.name}</span>
        </p>
        <img
          src={`${item.image.asset.url}?w=500&h=400&fit=crop`}
          width={500}
          height={400}
          alt={item.name}
          style={{
            background: `url(${item.image.asset.metadata.lqip})`,
            backgroundSize: 'cover',
          }}
        />
      </StyledItem>
    ))}
  </StyledItemsGrid>
);

export default ItemGrid;
