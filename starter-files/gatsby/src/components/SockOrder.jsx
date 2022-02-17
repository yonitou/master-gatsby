import React from 'react';
import Img from 'gatsby-image';
import formatMoney from '../utils/formatMoney';
import StyledMenuItem from '../styles/StyledMenuItem';
import calculateSockPrice from '../utils/calculateSockPrice';

const SockOrder = ({ order, socks, removeFromOrder }) => (
  <>
    {order.map((singleOrder, i) => {
      const sock = socks.find((s) => s.id === singleOrder.id);
      return (
        <StyledMenuItem key={`${singleOrder.id}-${i}`}>
          <Img fluid={sock.image.asset.fluid} />
          <h2>{sock.name}</h2>
          <p>
            {formatMoney(calculateSockPrice(sock.price, singleOrder.size))}
            <button
              type="button"
              className="remove"
              onClick={() => removeFromOrder(i)}
              title={`Supprimer ${sock.name} taille ${singleOrder.size} de la commande`}
            >
              &times;
            </button>
          </p>
        </StyledMenuItem>
      );
    })}
  </>
);

export default SockOrder;
