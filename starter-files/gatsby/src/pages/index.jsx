import React from 'react';
import LoadingGrid from '../components/LoadingGrid';
import { StyledHomepageGrid } from '../styles/Grid';
import useLatestData from '../utils/useLatestData';
import ItemGrid from '../components/ItemGrid';

const CurrentlyAvailable = ({ feet }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Pieds disponibles</span>
    </h2>
    <p>N'attendez pas et piedstinez</p>
    {!feet && <LoadingGrid count={4} />}
    {feet && !feet?.length && <p>Aucun pied de disponible en ce moment</p>}
    {feet?.length && <ItemGrid items={feet} />}
  </div>
);

const HotSocks = ({ hotSocks }) => (
  <div>
    <h2 className="center">
      <span className="mark tilt">Nouvelles chaussettes</span>
    </h2>
    <p>Viendez chaussettez</p>
    {!hotSocks && <LoadingGrid count={4} />}
    {hotSocks && !hotSocks?.length && (
      <p>Pas de nouvelles chaussettes, désolé !</p>
    )}
    {hotSocks?.length && <ItemGrid items={hotSocks} />}
  </div>
);

const HomePage = () => {
  const { feet, hotSocks } = useLatestData();

  return (
    <div className="center">
      <h1>Les chaussettes les plus goûtues</h1>
      <p>Ouvert de 9h à 13h tous les 2 jours</p>
      <StyledHomepageGrid>
        <CurrentlyAvailable feet={feet} />
        <HotSocks hotSocks={hotSocks} />
      </StyledHomepageGrid>
    </div>
  );
};

export default HomePage;
