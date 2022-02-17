import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const StyledFeet = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
`;

const StyledFoot = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 400px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    z-index: 2;
    position: relative;
    transform: rotate(1deg);
    text-align: center;
  }
`;

const FeetPage = ({ data, pageContext }) => {
  const feet = data.feet.nodes;
  const { totalCount } = data.feet;
  return (
    <>
      <SEO title={`Coucooning - Page ${pageContext.currentPage || 1}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE, 10)}
        totalCount={totalCount}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/feet"
      />
      <StyledFeet>
        {feet.map((foot) => (
          <StyledFoot key={foot.id}>
            <Link to={`/feet/${foot.slug.current}`}>
              <h2>
                <span className="mark">{foot.name}</span>
              </h2>
            </Link>
            <Img fluid={foot.image.asset.fluid} />
            <p className="description">{foot.description}</p>
          </StyledFoot>
        ))}
      </StyledFeet>
    </>
  );
};

export default FeetPage;

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    feet: allSanityFoot(limit: $pageSize, skip: $skip) {
      totalCount
      nodes {
        name
        id

        description
        slug {
          current
        }
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
