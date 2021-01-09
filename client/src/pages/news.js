import React, { useEffect, useState } from 'react';
import { Card, Grid, GridRow } from 'semantic-ui-react';

function News() {
  const [items, setItems] = useState([]);
  useEffect(async () => {
    const data = await fetch(
      'https://newsapi.org/v2/top-headlines?country=us&apiKey=fd74d03c2c6148908edb8f2cb92723d3'
    ).then((response) => response.json());
    setItems(data.articles);
  }, [items]);

  if (!items) {
    return <p>No current news</p>;
  }

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

export default News;
