const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const generateOrderEmail = ({ order, total }) => `<div>
    <h2>Votre commande de ${total}</h2>
    <p>La commande sera prête dans 20 minutes.</p>
    <ul>
      ${order
        .map(
          (item) => `<li>
        <img src="${item.thumbnail}" alt="${item.name}"/>
        ${item.size} ${item.name} - ${item.price}
      </li>`
        )
        .join('')}
    </ul>
    <p>Le total est de <strong>${total}</strong> à régler sur place</p>
    <style>
        ul {
          list-style: none;
        }
    </style>
  </div>`;

const wait = async (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
exports.handler = async (event, context) => {
  await wait(5000);
  const body = JSON.parse(event.body);
  // Check if they have filled out the honeypot

  // Validate the data coming in is correct
  const requiredFields = ['email', 'name', 'order'];

  for (const field of requiredFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: `Oups, vous n'avez pas rempli le champ ${field}`,
        }),
      };
    }
  }

  // make sure they actually have items in that order
  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `Pourquoi commander du vide ?`,
      }),
    };
  }
  const info = await transporter.sendMail({
    from: "Slick's Socks <slick@example.com>",
    to: `${body.name} <${body.email}>, orders@example.com`,
    subject: 'Nouvelle commande!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Parfait !' }),
  };
};
