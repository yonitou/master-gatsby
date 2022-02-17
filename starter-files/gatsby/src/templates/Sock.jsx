import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const SockGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

const SockPage = ({ data: { sock } }) => (
  <>
    <SEO title={sock.name} image={sock.image?.asset?.fluid?.src} />
    <SockGrid>
      <Img fluid={sock.image.asset.fluid} />
      <div>
        <h2 className="mark">{sock.name}</h2>
        <ul>
          {sock.toppings.map((topping) => (
            <li key={topping.id}>{topping.name}</li>
          ))}
        </ul>
      </div>
    </SockGrid>
  </>
);

export const query = graphql`
  query($slug: String!) {
    sock: sanitySock(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      toppings {
        name
        id
        vegetalian
      }
    }
  }
`;

export default SockPage;
