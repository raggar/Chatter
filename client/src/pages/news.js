import React, { useContext, useEffect, useState} from 'react';
import { Grid, Transition, Button, TextArea, FormTextArea, Card, Label } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

function news() {
  const[items, setItems] = useState([]); 
  useEffect(() => {
    fetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=fd74d03c2c6148908edb8f2cb92723d3')
      .then((response) => response.json())
      .then((json) => {
        console.log(JSON.stringify(json)); 
        setItems(json.articles); 
      })
      .catch((error) => console.error(error))
      .finally(() => {
        //this.setState({ isLoading: false }); 
        
      });
  }, [])

  return (
    <ul>
    {items.map(item => (
    <Card>
      <Label>{item.name}</Label>
      <Label>{item.title}</Label>
      <Label>{item.description}</Label>
    </Card>
    ))}
    </ul>
  );
}

export default news;
const styles2 = {
  baseText: {
    fontFamily: "Cochin"
  },
  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  image: {
    width: 50,
    height: 50,
  },
  cases:{
  }
};