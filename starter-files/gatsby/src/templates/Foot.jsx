import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

const FootPage = ({ data: { foot } }) => (
  <>
    <SEO image={foot.image.asset.src} title={foot.name} />
    <div className="center">
      <Img fluid={foot.image.asset.fluid} />

      <h2>
        <span className="mark">{foot.name}</span>
      </h2>
      <p>{foot.description}</p>
    </div>
  </>
);

export const query = graphql`
  query($slug: String!) {
    foot: sanityFoot(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;

export default FootPage;
