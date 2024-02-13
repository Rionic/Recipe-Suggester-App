import React, { useState, useContext, useEffect } from 'react';
import '../App.css';
import {
  Card,
  CardMedia,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import FetchInfo from '../utils/FetchInfo.js';
import { AuthContext } from '../AuthContext.js';

function RecipeCard(props) {
  const [id, setId] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [isSaved, setIsSaved] = useState(
    localStorage.getItem(`recipe_${props.id}_user_${id}`) === 'true',
  );
  const { token } = useContext(AuthContext);

  const handleExpansion = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    fetchData(false);
  }, []);

  useEffect(() => {
    setIsSaved(
      localStorage.getItem(`recipe_${props.id}_user_${id}`) === 'true',
    );
  }, [id]);

  const fetchData = async (buttonClicked) => {
    if (!token) return;
    try {
      const data = await FetchInfo(token);
      setId(data.userInfo.id);
      if (buttonClicked) handleSaveRecipe();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSaveRecipe = async () => {
    if (!id) {
      return;
    }
    try {
      const response = await fetch(
        `http://localhost:3001/api/${isSaved ? 'un' : ''}save-recipe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: id,
            recipe_id: props.id,
          }),
        },
      );

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem(`recipe_${props.id}_user_${id}`, `${!isSaved}`);
        setIsSaved(!isSaved);
      } else {
        console.error(
          `Failed to ${isSaved ? '' : 'un'}save recipe:`,
          data.message,
        );
      }
    } catch (error) {
      console.error(`Error ${isSaved ? '' : 'un'}saving recipe:`, error);
    }
  };

  return (
    <Card className={`card-media ${expanded ? 'expanded-card' : ''}`}>
      <a href={props.sourceUrl} target="_blank" rel="noopener noreferrer">
        <CardMedia
          component="img"
          height="200"
          image={props.imageUrl}
          alt={props.title}
          style={{ cursor: 'pointer' }}
        />
      </a>
      <Typography
        variant="h6"
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
      {token && (
        <IconButton
          aria-label="save recipe"
          onClick={() => {
            fetchData(true);
          }}
        >
          <FavoriteIcon color={isSaved ? 'error' : 'inherit'} />
        </IconButton>
      )}
      <Accordion
        className="ingredients-accordion"
        expanded={expanded}
        onChange={handleExpansion}
        style={{ width: '100%', position: 'relative', bottom: '0px' }}
        sx={{ boxShadow: 0 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Ingredients</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {props.ingredients &&
            props.ingredients.map((ingredient, index) => (
              <div key={index}>
                <Typography variant="body1">
                  {ingredient.amount +
                    ' ' +
                    ingredient.unit +
                    ' ' +
                    ingredient.name +
                    ','}
                </Typography>
              </div>
            ))}
        </AccordionDetails>
      </Accordion>
    </Card>
  );
}

export default RecipeCard;
