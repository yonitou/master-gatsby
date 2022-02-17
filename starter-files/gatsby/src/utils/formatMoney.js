const formatter = Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
});

const formatMoney = (cents) => formatter.format(cents / 100);

export default formatMoney;
