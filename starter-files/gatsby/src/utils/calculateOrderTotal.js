import calculateSockPrice from './calculateSockPrice';

const calculateOrderTotal = (order, socks) =>
  order.reduce((acc, singleOrder) => {
    const sock = socks.find((s) => s.id === singleOrder.id);
    return acc + calculateSockPrice(sock.price, singleOrder.size);
  }, 0);

export default calculateOrderTotal;
