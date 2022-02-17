import { graphql } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import SEO from '../components/SEO';

const StyledCartoons = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
`;

const StyledSingleCartoon = styled.div`
  border: 1px solid var(--grey);
  padding: 2rem;
  text-align: center;
  img {
    width: 100%;
    height: 200px;
    object-fit: contain;
    display: block;
    display: grid;
    align-items: center;
    font-size: 10px;
  }
`;

const CartoonsPage = ({ data }) => (
  <>
    <SEO
      title={`Cartoons ! Profitez de nos ${data.cartoons.nodes.length} disponibles`}
    />
    <h2 className="center">
      Nous avons {data?.cartoons.nodes.length} cartoons disponibles ! Allongez
      vous et profitez
    </h2>
    <StyledCartoons>
      {data?.cartoons.nodes.map((cartoon) => {
        const rating = Math.floor(Math.random() * 5) + 1;
        return (
          <StyledSingleCartoon key={cartoon.id}>
            <img src={cartoon.image} alt={cartoon.title} />
            <h3>{cartoon.title}</h3># Episodes : {cartoon.episodes}
            <p title={`${rating} out of 5 stars`}>
              {`⭐️`.repeat(rating)}
              <span style={{ filter: `grayscale(100%)` }}>
                {`⭐️`.repeat(5 - rating)}
              </span>
              <span>({cartoon.runtime_in_minutes})</span>
            </p>
          </StyledSingleCartoon>
        );
      })}
    </StyledCartoons>
  </>
);

export default CartoonsPage;

export const query = graphql`
  query TestQuery {
    cartoons: allCartoon {
      nodes {
        id
        title
        episodes
        runtime_in_minutes
        image
      }
    }
  }
`;
