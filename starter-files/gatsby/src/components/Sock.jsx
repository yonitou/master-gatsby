import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const StyledSock = styled.div`
  display: grid;
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

const Sock = ({ sock }) => (
  <StyledSock>
    <Link to={`/sock/${sock.slug.current}`}>
      <h2>
        <span className="mark">{sock.name}</span>
      </h2>
    </Link>
    <p>{sock.toppings.map((topping) => topping.name).join(', ')}</p>
    <Img fluid={sock.image.asset.fluid} alt={sock.name} />
  </StyledSock>
);

export default Sock;
