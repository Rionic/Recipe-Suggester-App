import React, { useState } from 'react';
import '../App.css'
import { Card, CardMedia, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function RecipeCard(props) {
    const [expanded, setExpanded] = useState(false);
    const handleExpansion = () => {
        setExpanded(!expanded);
    };

    console.log(props.ingredients);
    return (
        <Card className={`card-media ${expanded ? 'expanded-card' : ''}`}>
            <CardMedia
                component="img"
                height="200"
                image={props.imageUrl}
                alt={props.title}
            />
            <Typography variant="h5">{props.title}</Typography>
            <Typography style={{
                    margin: '20px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                }}
                variant="body1"
                align={'left'}
            >
                {props.description}
            </Typography>
            <Accordion
                className="ingredients-accordion"
                expanded={expanded} onChange={handleExpansion}
                style={{width: '100%', position: 'relative', bottom: '0px'}}
                sx={{boxShadow: 0}}
            >
                <AccordionSummary 
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography>Ingredients</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {props.ingredients && props.ingredients.map((ingredient, index) => (
                        <div key={index}>
                            <Typography variant="body1">{ingredient.amount + ' '}{ingredient.name}</Typography>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Card>
    ); // Next task: grab measurements, and make display nice
}

export default RecipeCard;