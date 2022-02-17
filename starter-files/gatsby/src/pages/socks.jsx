import { graphql } from 'gatsby';
import React from 'react';
import SockList from '../components/SockList';
import ToppingsFilter from '../components/ToppingsFilter';
import SEO from '../components/SEO';

const SocksPage = ({ data, pageContext }) => {
  const socks = data.socks.nodes;
  return (
    <>
      <SEO
        title={
          pageContext.topping
            ? `Chaussettes avec ${pageContext.topping}`
            : 'Toutes les chaussettes'
        }
      />
      <ToppingsFilter activeTopping={pageContext.topping} />
      <SockList socks={socks} />
    </>
  );
};

export const query = graphql`
  query SockQuery($toppingRegex: String) {
    socks: allSanitySock(
      filter: { toppings: { elemMatch: { name: { regex: $toppingRegex } } } }
    ) {
      nodes {
        name
        id
        slug {
          current
        }
        toppings {
          id
          name
        }
        image {
          asset {
            fixed(width: 600, height: 200) {
              ...GatsbySanityImageFixed
            }
            fluid(maxWidth: 400) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;

export default SocksPage;
