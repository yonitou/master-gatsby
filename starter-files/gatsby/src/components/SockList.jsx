import React from 'react';
import styled from 'styled-components';
import Sock from './Sock';

const StyledSockList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const SockList = ({ socks }) => (
  <StyledSockList>
    {socks.map((sock) => (
      <Sock sock={sock} key={sock.id} />
    ))}
  </StyledSockList>
);

export default SockList;
