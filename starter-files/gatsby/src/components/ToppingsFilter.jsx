import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const countSocksInToppings = (socks) => {
  const counts = socks
    .map((sock) => sock.toppings)
    .flat()
    .reduce((acc, topping) => {
      const { id, name } = topping;
      const existingTopping = acc[id];
      if (existingTopping) {
        existingTopping.count += 1;
      } else {
        acc[id] = {
          id,
          name,
          count: 1,
        };
      }

      return acc;
    }, {});
  const sortedToppings = Object.values(counts).sort(
    (a, b) => b.count - a.count
  );
  return sortedToppings;
};

const StyledToppingsFilter = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    padding: 5px;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    background: var(--grey);
    border-radius: 2px;
    align-items: center;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

const ToppingsFilter = ({ activeTopping }) => {
  const { socks } = useStaticQuery(graphql`
    query {
      socks: allSanitySock {
        nodes {
          toppings {
            name
            id
          }
        }
      }
    }
  `);

  const toppingsWithCounts = countSocksInToppings(socks.nodes);

  return (
    <StyledToppingsFilter>
      <Link to="/socks">
        <span className="name">Toutes</span>
        <span className="count">{socks.nodes.length}</span>
      </Link>
      {toppingsWithCounts.map((topping) => (
        <Link
          key={topping.id}
          to={`/topping/${topping.name}`}
          className={topping.name === activeTopping ? 'active' : ''}
        >
          <span className="name">{topping.name}</span>
          <span className="count">{topping.count}</span>
        </Link>
      ))}
    </StyledToppingsFilter>
  );
};

export default ToppingsFilter;
