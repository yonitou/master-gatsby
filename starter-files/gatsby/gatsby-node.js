const path = require('path');
const fetch = require('isomorphic-fetch');

const turnSocksIntoPages = async ({ graphql, actions }) => {
  const sockTemplate = path.resolve('./src/templates/Sock.jsx');
  const { data } = await graphql(`
    query {
      socks: allSanitySock {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  data.socks.nodes.forEach((sock) =>
    actions.createPage({
      path: `sock/${sock.slug.current}`,
      component: sockTemplate,
      context: {
        slug: sock.slug.current,
      },
    })
  );
};

const turnToppingsIntoPages = async ({ graphql, actions }) => {
  const toppingTemplate = path.resolve('./src/pages/socks.jsx');
  const { data } = await graphql(`
    query {
      toppings: allSanityTopping {
        nodes {
          name
          id
        }
      }
    }
  `);

  data.toppings.nodes.forEach((topping) =>
    actions.createPage({
      path: `topping/${topping.name}`,
      component: toppingTemplate,
      context: {
        topping: topping.name,
        toppingRegex: `/${topping.name}/i`,
      },
    })
  );
};

const fetchCartoonsAndTurnIntoNodes = async ({
  actions,
  createNodeId,
  createContentDigest,
}) => {
  const res = await fetch('https://api.sampleapis.com/cartoons/cartoons2D');
  const cartoons = await res.json();

  cartoons?.forEach((cartoon) => {
    const nodeMeta = {
      id: createNodeId(`cartoon-${cartoon.title}`),
      parent: null,
      children: [],
      internal: {
        type: 'Cartoon',
        mediaType: 'application/json',
        contentDigest: createContentDigest(cartoon),
      },
    };
    actions.createNode({
      ...cartoon,
      ...nodeMeta,
    });
  });
};

const turnFeetIntoPages = async ({ graphql, actions }) => {
  const { data } = await graphql(`
    query {
      feet: allSanityFoot {
        totalCount
        nodes {
          name

          id
          slug {
            current
          }
        }
      }
    }
  `);
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE, 10);
  const pageCount = Math.ceil(data.feet.totalCount / pageSize);

  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `feet/${i + 1}`,
      component: path.resolve('./src/pages/feet.jsx'),
      context: {
        skip: i * pageSize,
        currentPage: i + 1,
        pageSize,
      },
    });
  });
  data.feet.nodes.forEach((foot) => {
    actions.createPage({
      component: path.resolve('./src/templates/Foot.jsx'),
      path: `/feet/${foot.slug.current}`,
      context: {
        name: foot.name,
        slug: foot.slug.current,
      },
    });
  });
};

exports.sourceNodes = async (params) => {
  await Promise.all([fetchCartoonsAndTurnIntoNodes(params)]);
};

exports.createPages = async (params) => {
  await Promise.all([
    turnSocksIntoPages(params),
    turnToppingsIntoPages(params),
    turnFeetIntoPages(params),
  ]);
};
