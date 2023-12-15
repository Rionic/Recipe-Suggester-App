import React, { useState } from 'react';
import '../App.css'
import { Card, CardMedia, Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function RecipeCard(props) {
    const [expanded, setExpanded] = useState(false);
    const handleExpansion = () => {
        setExpanded(!expanded);
    };

    return (
        <Card className={`card-media ${expanded ? 'expanded-card' : ''}`}>
            <CardMedia
                component="img"
                height="200"
                image={props.imageUrl}
                alt={props.title}
            />
            <Typography variant="h6"
                style={{
                    paddingLeft: '5px',
                    paddingRight: '5px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                }}
            >
                {props.title}
            </Typography>
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
                {/* TODO: Turns out description doesn't exist. Find something else */}
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
                            <Typography variant="body1">{ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name + ','}</Typography>
                        </div>
                    ))}
                </AccordionDetails>
            </Accordion>
        </Card>
    ); // TODO: and make display nice, click image to go to recipe link
}

export default RecipeCard;