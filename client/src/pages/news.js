import React, { useEffect, useState } from 'react';
import { Card, Grid, GridRow } from 'semantic-ui-react';

function news() {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetch(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=fd74d03c2c6148908edb8f2cb92723d3'
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(JSON.stringify(json));
        setItems(json.articles);
        console.log('items', items);
      })
      .catch((error) => console.error(error));
  }, []);

  console.log(items);

  return (
    <Grid columns={3}>
      <GridRow centered>
        {items.map((item) => (
          <Card
            href={item.url}
            header={item.title}
            description={item.description}
            meta={item.author}
          />
        ))}
      </GridRow>
    </Grid>
  );
}

export default news;
