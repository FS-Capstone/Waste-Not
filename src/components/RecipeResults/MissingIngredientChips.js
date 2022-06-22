import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Box,
  Chip,
  Button,
  Typography,
} from "@mui/material";
import { addMultiplePantryItems, addMultipleShoppingItems } from "../../store";

export default function MissingIngredientChips({missingIngredientList}) {
  const [showAll, setShowAll] = useState(false);
  
  const [selectedMissingIngredients, setSelectedMissingIngredients] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector(state=> state.auth);
  const shoppingList = useSelector(state => state.shoppingList);
  const listIds = shoppingList.map(ingredient => ingredient.id);
  const pantry = useSelector((state) => state.selectedPantry);

  const handleClick = (e, ingredient) => {
    e.preventDefault();
    selectedMissingIngredients.includes(ingredient)
      ? setSelectedMissingIngredients(
          selectedMissingIngredients.filter(
            (_ingredient) => _ingredient.id !== ingredient.id
          )
        )
      : setSelectedMissingIngredients([
          ...selectedMissingIngredients,
          ingredient,
        ]);
  };

  const handleSave = (e) => {
    e.preventDefault();
    const ingredientIds = selectedMissingIngredients.map(ingredient => ingredient.id)
    dispatch(addMultiplePantryItems(ingredientIds, pantry.id));
    setSelectedMissingIngredients([])
  };


  const addToList = e => {
    e.preventDefault();
    const dupesRemoved = selectedMissingIngredients.filter(ingredient => !listIds.includes(ingredient.id))
    dispatch(addMultipleShoppingItems(dupesRemoved, user.id))
    setSelectedMissingIngredients([])
  }
  
  return(
    <Box
        sx={{
          margin: "1rem auto 1rem auto",
          width: "90%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifySelf: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          {!missingIngredientList.length ? null : (
            <Typography variant="h6">
              Already have some of these ingredients?
            </Typography>
          )}
        </Box>
        <Box
          sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
        >
          {!missingIngredientList.length
            ? null
            : !showAll ? missingIngredientList.slice(0,15).map((ingredient) =>
                ingredient.id ? (
                  <Chip
                    key={ingredient.id}
                    variant={
                      selectedMissingIngredients.includes(ingredient)
                        ? "filled"
                        : "outlined"
                    }
                    clickable
                    label={ingredient.name}
                    onClick={(e) => handleClick(e, ingredient)}
                    sx={{ margin: "3px" }}
                  />
                ) : null
              ) : missingIngredientList.map((ingredient) =>
              ingredient.id ? (
                <Chip
                  key={ingredient.id}
                  variant={
                    selectedMissingIngredients.includes(ingredient)
                      ? "filled"
                      : "outlined"
                  }
                  clickable
                  label={ingredient.name}
                  onClick={(e) => handleClick(e, ingredient)}
                  sx={{ margin: "3px" }}
                />
              ) : null
            )}
            {!showAll && missingIngredientList.length ? 
            <Chip variant='outlined' clickable label={`+ ${missingIngredientList.length - 15 <= 0 ? 0 : missingIngredientList.length - 15} more...`} onClick={() => setShowAll(true)} sx={{margin:'3px'}} />
            : null }
            {showAll && missingIngredientList.length ? <Chip variant='outlined' clickable label='Hide extra ingredients' onClick={() => setShowAll(false)} sx={{margin:'3px'}} /> : null}
          {!selectedMissingIngredients.length ? null : (
            <div>
              <Button sx={{marginRight:'2rem'}} variant="contained" onClick={(e) => handleSave(e)}>
                Add Selected Ingredients to Pantry
              </Button>
              <Button variant='outlined' onClick={(e) => addToList(e)}>
                Add Selected Ingredients to Shopping List
              </Button>
            </div>

          )}
        </Box>
      </Box>
  )
}