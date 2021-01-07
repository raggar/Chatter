import React, { useContext, useEffect, useState} from 'react';
import { Grid, Transition, Button, TextArea, FormTextArea, Card, Label } from 'semantic-ui-react';
import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';

function singleArticle() {
  const[items, setItems] = useState([]); 

  return (
    <ul>
    {items.map(item => (
    <Card>
      <Label>Hello</Label>
    </Card>
    ))}
    </ul>
  );
}

export default singleArticle;
