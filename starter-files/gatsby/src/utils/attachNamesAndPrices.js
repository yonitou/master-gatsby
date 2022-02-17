import formatMoney from './formatMoney';
import calculateSockPrice from './calculateSockPrice';

const attachNamesAndPrices = (order, socks) =>
  order.map((item) => {
    const sock = socks.find((s) => s.id === item.id);
    return {
      ...item,
      name: sock.name,
      price: formatMoney(calculateSockPrice(sock.price, item.size)),
      thumbnail: sock.image.asset.fluid.src,
    };
  });

export default attachNamesAndPrices;
