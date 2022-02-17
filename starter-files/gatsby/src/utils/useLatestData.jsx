import { useEffect, useState } from 'react';

const gql = String.raw;

const useLatestData = () => {
  const [hotSocks, setHotSocks] = useState();
  const [feet, setFeet] = useState();

  useEffect(() => {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: gql`
          query {
            StoreSettings(id: "downtown") {
              name
              foot {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }

              hotSocks {
                name
                _id
                image {
                  asset {
                    url
                    metadata {
                      lqip
                    }
                  }
                }
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setHotSocks(res.data.StoreSettings.hotSocks);
        setFeet(res.data.StoreSettings.foot);
      })
      .catch((err) => console.log(err));
  }, []);

  return { hotSocks, feet };
};

export default useLatestData;
