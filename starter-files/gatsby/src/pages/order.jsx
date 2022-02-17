import React from 'react';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import calculateSockPrice from '../utils/calculateSockPrice';
import formatMoney from '../utils/formatMoney';
import StyledOrder from '../styles/StyledOrder';
import StyledMenuItem from '../styles/StyledMenuItem';
import useSock from '../utils/useSock';
import SockOrder from '../components/SockOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

const OrderPage = ({ data }) => {
  const { values, updateValues } = useForm({
    name: '',
    email: '',
  });
  const socks = data.socks.nodes;
  const {
    order,
    removeFromOrder,
    addToOrder,
    error,
    loading,
    message,
    submitOrder,
  } = useSock({ socks, values });
  if (message) {
    return <p>{message}</p>;
  }
  return (
    <>
      <SEO title="Commandez vos chaussettes" />
      <StyledOrder onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Vos coordonnées</legend>
          <label htmlFor="name">Nom</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={updateValues}
          />
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={values.email}
            onChange={updateValues}
          />
        </fieldset>
        <fieldset className="menu" disabled={loading}>
          <legend>Panier</legend>
          {socks.map((sock) => (
            <StyledMenuItem key={sock.id}>
              <Img
                fluid={sock.image.asset.fluid}
                width="50"
                height="50"
                alt={sock.name}
              />
              <div>
                <h2>{sock.name}</h2>
              </div>
              <div>
                {['S', 'M', 'L'].map((size) => (
                  <button
                    type="button"
                    key={size}
                    onClick={() => addToOrder({ id: sock.id, size })}
                  >
                    {size} {formatMoney(calculateSockPrice(sock.price, size))}
                  </button>
                ))}
              </div>
            </StyledMenuItem>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Commande</legend>
          <SockOrder
            order={order}
            socks={socks}
            removeFromOrder={removeFromOrder}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>Total is {formatMoney(calculateOrderTotal(order, socks))}</h3>
          <div>{error ? <p>Erreur : {error} </p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Confirmation en cours ...' : 'Confirmer'}
          </button>
        </fieldset>
      </StyledOrder>
    </>
  );
};

export default OrderPage;

export const query = graphql`
  query {
    socks: allSanitySock {
      nodes {
        name
        id
        slug {
          current
        }
        price
        image {
          asset {
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
