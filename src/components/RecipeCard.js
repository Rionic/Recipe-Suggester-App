import React from 'react';
import '../App.css'
import { Card, CardMedia, Typography } from '@mui/material';

function RecipeCard(props) {
    return (
        <Card className="card-media">
            <CardMedia
                component="img"
                height="200"
                image={props.imageUrl}
                alt={props.title}
                
                // style={{ maxWidth: '100%', width: 'auto' }}
            />
            <Typography variant="h5">{props.title}</Typography>
            <Typography variant="body1">{props.description}</Typography>
        </Card>
        // <div className="recipe-card">
        //     <img src={props.imageUrl} alt={props.title} />
        //     <h3>{props.title}</h3>
        //     <p>{props.description}</p>
        // </div>
    );
}

export default RecipeCard;