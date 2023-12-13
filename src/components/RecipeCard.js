import React from 'react';
import '../App.css'
import { Card, CardMedia, Typography } from '@mui/material';

function RecipeCard(props) {
    console.log(props.ingredients);
    return (
        <Card className="card-media">
            <CardMedia
                component="img"
                height="200"
                image={props.imageUrl}
                alt={props.title}
            />
            <Typography variant="h5">{props.title}</Typography>
            <Typography variant="body1">{props.description}</Typography>
            {props.ingredients && props.ingredients.map((ingredient, index) => (
                <div>
                    <Typography variant="body1">{ingredient.amount}</Typography>
                    <Typography variant="body1">{ingredient.name}</Typography>
                </div>
            ))}
        </Card>
    ); // Next task: grab measurements, and make display nice
}

export default RecipeCard;