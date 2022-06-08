import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Box, Chip, Button, Divider, Card} from '@mui/material';
import { addPantryItem, addRecipes } from '../../store';

// const searchData = [
//   {
//       "id": 695343,
//       "title": "Quick Chicken Parmesan",
//       "image": "https://spoonacular.com/recipeImages/695343-312x231.jpg",
//       "imageType": "jpg",
//       "usedIngredientCount": 5,
//       "missedIngredientCount": 4,
//       "missedIngredients": [
//           {
//               "id": 10011693,
//               "amount": 28,
//               "unit": "ounce",
//               "unitLong": "ounces",
//               "unitShort": "oz",
//               "aisle": "Canned and Jarred",
//               "name": "canned tomatoes",
//               "original": "1 28-ounce can no-salt-added crushed tomatoes",
//               "originalName": "no-salt-added crushed tomatoes",
//               "meta": [
//                   "crushed",
//                   "canned"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/tomatoes-canned.png"
//           },
//           {
//               "id": 1022027,
//               "amount": 1,
//               "unit": "teaspoon",
//               "unitLong": "teaspoon",
//               "unitShort": "tsp",
//               "aisle": "Spices and Seasonings",
//               "name": "italian seasoning",
//               "original": "1 teaspoon Italian seasoning",
//               "originalName": "Italian seasoning",
//               "meta": [
//                   "italian"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/dried-herbs.png"
//           },
//           {
//               "id": 1033,
//               "amount": 2,
//               "unit": "tablespoons",
//               "unitLong": "tablespoons",
//               "unitShort": "Tbsp",
//               "aisle": "Cheese",
//               "name": "parmesan cheese",
//               "original": "2 tablespoons freshly grated Parmesan cheese",
//               "originalName": "freshly grated Parmesan cheese",
//               "meta": [
//                   "freshly grated"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/parmesan.jpg"
//           },
//           {
//               "id": 1028,
//               "amount": 1,
//               "unit": "cup",
//               "unitLong": "cup",
//               "unitShort": "cup",
//               "aisle": "Cheese",
//               "name": "part-skim mozzarella cheese",
//               "original": "1 cup shredded part-skim mozzarella cheese",
//               "originalName": "shredded part-skim mozzarella cheese",
//               "meta": [
//                   "shredded"
//               ],
//               "extendedName": "shredded part-skim mozzarella cheese",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/shredded-cheese-white.jpg"
//           }
//       ],
//       "usedIngredients": [
//           {
//               "id": 18079,
//               "amount": 0.5,
//               "unit": "cup",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Pasta and Rice",
//               "name": "breadcrumbs",
//               "original": "1/2 cup coarse dry breadcrumbs, preferably whole-wheat (see Tip)",
//               "originalName": "coarse dry breadcrumbs, preferably whole-wheat (see Tip)",
//               "meta": [
//                   "whole-wheat",
//                   "dry",
//                   "(see Tip)"
//               ],
//               "extendedName": "dry whole-wheat breadcrumbs",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/breadcrumbs.jpg"
//           },
//           {
//               "id": 2044,
//               "amount": 0.25,
//               "unit": "cup",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Produce",
//               "name": "fresh basil",
//               "original": "1/4 cup chopped fresh basil or parsley",
//               "originalName": "chopped fresh basil or parsley",
//               "meta": [
//                   "fresh",
//                   "chopped"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/fresh-basil.jpg"
//           },
//           {
//               "id": 11215,
//               "amount": 3,
//               "unit": "cloves",
//               "unitLong": "cloves",
//               "unitShort": "cloves",
//               "aisle": "Produce",
//               "name": "garlic",
//               "original": "3 cloves garlic, minced",
//               "originalName": "garlic, minced",
//               "meta": [
//                   "minced"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/garlic.png"
//           },
//           {
//               "id": 11282,
//               "amount": 1,
//               "unit": "medium",
//               "unitLong": "medium",
//               "unitShort": "medium",
//               "aisle": "Produce",
//               "name": "onion",
//               "original": "1 medium onion, chopped",
//               "originalName": "onion, chopped",
//               "meta": [
//                   "chopped"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/brown-onion.png"
//           },
//           {
//               "id": 1055062,
//               "amount": 16,
//               "unit": "ounce",
//               "unitLong": "ounces",
//               "unitShort": "oz",
//               "aisle": "Meat",
//               "name": "skinless boneless chicken breasts",
//               "original": "2 8-ounce boneless, skinless chicken breasts, trimmed",
//               "originalName": "boneless, skinless chicken breasts, trimmed",
//               "meta": [
//                   "boneless",
//                   "skinless",
//                   "trimmed"
//               ],
//               "extendedName": "lean skinless boneless chicken breasts",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/chicken-breasts.png"
//           }
//       ],
//       "unusedIngredients": [
//           {
//               "id": 2049,
//               "amount": 1,
//               "unit": "serving",
//               "unitLong": "serving",
//               "unitShort": "serving",
//               "aisle": "Produce;Spices and Seasonings",
//               "name": "thyme",
//               "original": "thyme",
//               "originalName": "thyme",
//               "meta": [],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/thyme.jpg"
//           }
//       ],
//       "likes": 4008
//   },
//   {
//       "id": 695338,
//       "title": "Quick Chicken Parmesan for Two",
//       "image": "https://spoonacular.com/recipeImages/695338-312x231.jpg",
//       "imageType": "jpg",
//       "usedIngredientCount": 5,
//       "missedIngredientCount": 4,
//       "missedIngredients": [
//           {
//               "id": 10011693,
//               "amount": 14,
//               "unit": "ounce",
//               "unitLong": "ounces",
//               "unitShort": "oz",
//               "aisle": "Canned and Jarred",
//               "name": "canned tomatoes",
//               "original": "1 14-ounce can no-salt-added crushed tomatoes (or 1 1/2 cups from a 28-ounce can)",
//               "originalName": "no-salt-added crushed tomatoes (or 1 1/2 cups from a 28-ounce can)",
//               "meta": [
//                   "crushed",
//                   "canned",
//                   "(or)"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/tomatoes-canned.png"
//           },
//           {
//               "id": 1022027,
//               "amount": 0.5,
//               "unit": "teaspoon",
//               "unitLong": "teaspoons",
//               "unitShort": "tsp",
//               "aisle": "Spices and Seasonings",
//               "name": "italian seasoning",
//               "original": "1/2 teaspoon Italian seasoning",
//               "originalName": "Italian seasoning",
//               "meta": [
//                   "italian"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/dried-herbs.png"
//           },
//           {
//               "id": 1033,
//               "amount": 1,
//               "unit": "tablespoon",
//               "unitLong": "tablespoon",
//               "unitShort": "Tbsp",
//               "aisle": "Cheese",
//               "name": "parmesan cheese",
//               "original": "1 tablespoon freshly grated Parmesan cheese",
//               "originalName": "freshly grated Parmesan cheese",
//               "meta": [
//                   "freshly grated"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/parmesan.jpg"
//           },
//           {
//               "id": 1028,
//               "amount": 0.5,
//               "unit": "cup",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Cheese",
//               "name": "part-skim mozzarella cheese",
//               "original": "1/2 cup shredded part-skim mozzarella cheese",
//               "originalName": "shredded part-skim mozzarella cheese",
//               "meta": [
//                   "shredded"
//               ],
//               "extendedName": "shredded part-skim mozzarella cheese",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/shredded-cheese-white.jpg"
//           }
//       ],
//       "usedIngredients": [
//           {
//               "id": 18079,
//               "amount": 0.25,
//               "unit": "cup",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Pasta and Rice",
//               "name": "breadcrumbs",
//               "original": "1/4 cup coarse dry breadcrumbs, preferably whole-wheat (see Tip)",
//               "originalName": "coarse dry breadcrumbs, preferably whole-wheat (see Tip)",
//               "meta": [
//                   "whole-wheat",
//                   "dry",
//                   "(see Tip)"
//               ],
//               "extendedName": "dry whole-wheat breadcrumbs",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/breadcrumbs.jpg"
//           },
//           {
//               "id": 2044,
//               "amount": 2,
//               "unit": "tablespoons",
//               "unitLong": "tablespoons",
//               "unitShort": "Tbsp",
//               "aisle": "Produce",
//               "name": "fresh basil",
//               "original": "2 tablespoons chopped fresh basil or parsley",
//               "originalName": "chopped fresh basil or parsley",
//               "meta": [
//                   "fresh",
//                   "chopped"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/fresh-basil.jpg"
//           },
//           {
//               "id": 11215,
//               "amount": 2,
//               "unit": "small cloves",
//               "unitLong": "small cloves",
//               "unitShort": "small cloves",
//               "aisle": "Produce",
//               "name": "garlic",
//               "original": "2 small cloves garlic, minced",
//               "originalName": "garlic, minced",
//               "meta": [
//                   "minced"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/garlic.png"
//           },
//           {
//               "id": 11282,
//               "amount": 1,
//               "unit": "small",
//               "unitLong": "small",
//               "unitShort": "small",
//               "aisle": "Produce",
//               "name": "onion",
//               "original": "1 small onion, chopped",
//               "originalName": "onion, chopped",
//               "meta": [
//                   "chopped"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/brown-onion.png"
//           },
//           {
//               "id": 1055062,
//               "amount": 8,
//               "unit": "ounce",
//               "unitLong": "ounces",
//               "unitShort": "oz",
//               "aisle": "Meat",
//               "name": "skinless boneless chicken breast",
//               "original": "1 8-ounce boneless, skinless chicken breast, trimmed",
//               "originalName": "boneless, skinless chicken breast, trimmed",
//               "meta": [
//                   "boneless",
//                   "skinless",
//                   "trimmed"
//               ],
//               "extendedName": "lean skinless boneless chicken breast",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/chicken-breasts.png"
//           }
//       ],
//       "unusedIngredients": [
//           {
//               "id": 2049,
//               "amount": 1,
//               "unit": "serving",
//               "unitLong": "serving",
//               "unitShort": "serving",
//               "aisle": "Produce;Spices and Seasonings",
//               "name": "thyme",
//               "original": "thyme",
//               "originalName": "thyme",
//               "meta": [],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/thyme.jpg"
//           }
//       ],
//       "likes": 2061
//   },
//   {
//       "id": 102683,
//       "title": "Chicken Breast Stuffed With Feta Cheese, Sun-Dried Tomato",
//       "image": "https://spoonacular.com/recipeImages/102683-312x231.jpg",
//       "imageType": "jpg",
//       "usedIngredientCount": 5,
//       "missedIngredientCount": 4,
//       "missedIngredients": [
//           {
//               "id": 1019,
//               "amount": 8,
//               "unit": "ounces",
//               "unitLong": "ounces",
//               "unitShort": "oz",
//               "aisle": "Cheese",
//               "name": "feta cheese",
//               "original": "8 ounces feta cheese, crumbled finely",
//               "originalName": "feta cheese, crumbled finely",
//               "meta": [
//                   "crumbled",
//                   "finely"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/feta.png"
//           },
//           {
//               "id": 10211821,
//               "amount": 4,
//               "unit": "servings",
//               "unitLong": "servings",
//               "unitShort": "servings",
//               "aisle": "Produce",
//               "name": "bell pepper",
//               "original": "pepper",
//               "originalName": "pepper",
//               "meta": [],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/bell-pepper-orange.png"
//           },
//           {
//               "id": 11821,
//               "amount": 1,
//               "unit": "medium",
//               "unitLong": "medium",
//               "unitShort": "medium",
//               "aisle": "Produce",
//               "name": "red bell pepper",
//               "original": "1 medium red bell pepper, diced",
//               "originalName": "red bell pepper, diced",
//               "meta": [
//                   "diced",
//                   "red"
//               ],
//               "extendedName": "diced red bell pepper",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/red-pepper.jpg"
//           },
//           {
//               "id": 11955,
//               "amount": 5,
//               "unit": "large",
//               "unitLong": "larges",
//               "unitShort": "large",
//               "aisle": "Canned and Jarred;Produce",
//               "name": "sun-dried tomatoes",
//               "original": "5 large sun-dried tomatoes, diced",
//               "originalName": "sun-dried tomatoes, diced",
//               "meta": [
//                   "diced"
//               ],
//               "extendedName": "diced sun-dried tomatoes",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/sundried-tomatoes.jpg"
//           }
//       ],
//       "usedIngredients": [
//           {
//               "id": 18079,
//               "amount": 0.5,
//               "unit": "cup",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Pasta and Rice",
//               "name": "breadcrumbs",
//               "original": "1/2 cup breadcrumbs (i use italian style)",
//               "originalName": "breadcrumbs (i use italian style)",
//               "meta": [
//                   "italian",
//                   "use style",
//                   "(i )"
//               ],
//               "extendedName": "italian breadcrumbs",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/breadcrumbs.jpg"
//           },
//           {
//               "id": 11215,
//               "amount": 6,
//               "unit": "",
//               "unitLong": "",
//               "unitShort": "",
//               "aisle": "Produce",
//               "name": "garlic cloves",
//               "original": "6 garlic cloves, minced",
//               "originalName": "garlic cloves, minced",
//               "meta": [
//                   "minced"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/garlic.png"
//           },
//           {
//               "id": 11291,
//               "amount": 4,
//               "unit": "servings",
//               "unitLong": "servings",
//               "unitShort": "servings",
//               "aisle": "Produce",
//               "name": "green onion",
//               "original": "green onion, chopped (for garnish)",
//               "originalName": "green onion, chopped (for garnish)",
//               "meta": [
//                   "chopped",
//                   "(for garnish)"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/spring-onions.jpg"
//           },
//           {
//               "id": 1055062,
//               "amount": 4,
//               "unit": "",
//               "unitLong": "",
//               "unitShort": "",
//               "aisle": "Meat",
//               "name": "skinless boneless chicken breasts",
//               "original": "4 boneless skinless chicken breasts, pounded thin",
//               "originalName": "boneless skinless chicken breasts, pounded thin",
//               "meta": [
//                   "boneless",
//                   "skinless",
//                   "thin"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/chicken-breasts.png"
//           },
//           {
//               "id": 2049,
//               "amount": 1,
//               "unit": "teaspoon",
//               "unitLong": "teaspoon",
//               "unitShort": "tsp",
//               "aisle": "Produce;Spices and Seasonings",
//               "name": "thyme",
//               "original": "1 teaspoon thyme",
//               "originalName": "thyme",
//               "meta": [],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/thyme.jpg"
//           }
//       ],
//       "unusedIngredients": [
//           {
//               "id": 2044,
//               "amount": 1,
//               "unit": "serving",
//               "unitLong": "serving",
//               "unitShort": "serving",
//               "aisle": "Produce;Spices and Seasonings",
//               "name": "basil",
//               "original": "basil",
//               "originalName": "basil",
//               "meta": [],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/basil.jpg"
//           }
//       ],
//       "likes": 69
//   },
//   {
//       "id": 307784,
//       "title": "Provencal Tomatoes",
//       "image": "https://spoonacular.com/recipeImages/307784-312x231.jpeg",
//       "imageType": "jpeg",
//       "usedIngredientCount": 5,
//       "missedIngredientCount": 4,
//       "missedIngredients": [
//           {
//               "id": 10211821,
//               "amount": 8,
//               "unit": "servings",
//               "unitLong": "servings",
//               "unitShort": "servings",
//               "aisle": "Produce",
//               "name": "bell pepper",
//               "original": "Freshly ground black pepper",
//               "originalName": "Freshly ground black pepper",
//               "meta": [
//                   "black",
//                   "freshly ground"
//               ],
//               "extendedName": "black bell pepper",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/bell-pepper-orange.png"
//           },
//           {
//               "id": 11297,
//               "amount": 2,
//               "unit": "tablespoons",
//               "unitLong": "tablespoons",
//               "unitShort": "Tbsp",
//               "aisle": "Produce;Spices and Seasonings",
//               "name": "fresh flat-leaf parsley",
//               "original": "2 tablespoons minced fresh flat-leaf parsley",
//               "originalName": "minced fresh flat-leaf parsley",
//               "meta": [
//                   "fresh",
//                   "minced"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/parsley.jpg"
//           },
//           {
//               "id": 1023,
//               "amount": 0.5,
//               "unit": "cup",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Cheese",
//               "name": "gruyere cheese",
//               "original": "1/2 cup grated Gruyere cheese",
//               "originalName": "grated Gruyere cheese",
//               "meta": [
//                   "grated"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/gruyere.jpg"
//           },
//           {
//               "id": 11529,
//               "amount": 6,
//               "unit": "",
//               "unitLong": "",
//               "unitShort": "",
//               "aisle": "Produce",
//               "name": "tomatoes",
//               "original": "6 ripe tomatoes (2 1/2 to 3-inches in diameter)",
//               "originalName": "ripe tomatoes (2 1/2 to 3-inches in diameter)",
//               "meta": [
//                   "ripe",
//                   "()"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/tomato.png"
//           }
//       ],
//       "usedIngredients": [
//           {
//               "id": 18079,
//               "amount": 1.5,
//               "unit": "cups",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Pasta and Rice",
//               "name": "bread crumbs",
//               "original": "1 1/2 cups fresh white bread crumbs (5 slices, crusts removed)",
//               "originalName": "fresh white bread crumbs (5 slices, crusts removed)",
//               "meta": [
//                   "fresh",
//                   "white",
//                   "(5 slices, crusts removed)"
//               ],
//               "extendedName": "white fresh bread crumbs",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/breadcrumbs.jpg"
//           },
//           {
//               "id": 2044,
//               "amount": 0.25,
//               "unit": "cup",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Produce",
//               "name": "fresh basil leaves",
//               "original": "1/4 cup minced fresh basil leaves",
//               "originalName": "minced fresh basil leaves",
//               "meta": [
//                   "fresh",
//                   "minced"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/fresh-basil.jpg"
//           },
//           {
//               "id": 2049,
//               "amount": 0.5,
//               "unit": "teaspoon",
//               "unitLong": "teaspoons",
//               "unitShort": "tsp",
//               "aisle": "Produce;Spices and Seasonings",
//               "name": "fresh thyme leaves",
//               "original": "1/2 teaspoon fresh thyme leaves",
//               "originalName": "fresh thyme leaves",
//               "meta": [
//                   "fresh"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/thyme.jpg"
//           },
//           {
//               "id": 11215,
//               "amount": 2,
//               "unit": "cloves",
//               "unitLong": "cloves",
//               "unitShort": "cloves",
//               "aisle": "Produce",
//               "name": "garlic",
//               "original": "2 teaspoons minced garlic (2 cloves)",
//               "originalName": "teaspoons minced garlic",
//               "meta": [
//                   "minced"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/garlic.png"
//           },
//           {
//               "id": 11291,
//               "amount": 0.25,
//               "unit": "cup",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Produce",
//               "name": "scallions",
//               "original": "1/4 cup minced scallions, white and green parts (2 scallions)",
//               "originalName": "minced scallions, white and green parts (2 scallions)",
//               "meta": [
//                   "white",
//                   "green",
//                   "minced",
//                   "(2 scallions)"
//               ],
//               "extendedName": "green white scallions",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/spring-onions.jpg"
//           }
//       ],
//       "unusedIngredients": [
//           {
//               "id": 1055062,
//               "amount": 1,
//               "unit": "serving",
//               "unitLong": "serving",
//               "unitShort": "serving",
//               "aisle": "Meat",
//               "name": "chicken breast",
//               "original": "boneless skinless chicken breast",
//               "originalName": "boneless skinless chicken breast",
//               "meta": [
//                   "boneless",
//                   "skinless"
//               ],
//               "extendedName": "skinless boneless chicken breast",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/chicken-breasts.png"
//           }
//       ],
//       "likes": 0
//   },
//   {
//       "id": 1518049,
//       "title": "Caprese Chicken Skillet",
//       "image": "https://spoonacular.com/recipeImages/1518049-312x231.jpg",
//       "imageType": "jpg",
//       "usedIngredientCount": 5,
//       "missedIngredientCount": 4,
//       "missedIngredients": [
//           {
//               "id": 2069,
//               "amount": 0.5,
//               "unit": "cup",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Oil, Vinegar, Salad Dressing",
//               "name": "balsamic vinegar",
//               "original": "½ cup plus 1 tablespoon balsamic vinegar, divided",
//               "originalName": "balsamic vinegar, divided",
//               "meta": [
//                   "divided"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/balsamic-vinegar.jpg"
//           },
//           {
//               "id": 19296,
//               "amount": 1,
//               "unit": "tablespoon",
//               "unitLong": "tablespoon",
//               "unitShort": "Tbsp",
//               "aisle": "Nut butters, Jams, and Honey",
//               "name": "honey",
//               "original": "1 tablespoon plus 1 teaspoon honey, divided",
//               "originalName": "honey, divided",
//               "meta": [
//                   "divided"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/honey.png"
//           },
//           {
//               "id": 10111529,
//               "amount": 4,
//               "unit": "cups",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Produce",
//               "name": "grape tomatoes",
//               "original": "4 cups sliced tomatoes: halved cherry or grape tomatoes (2 pints) or ½-inch-diced peak season plum or other garden tomatoes",
//               "originalName": "sliced tomatoes: halved cherry or grape tomatoes (2 pints) or ½-inch-diced peak season plum or other garden tomatoes",
//               "meta": [
//                   "halved",
//                   "sliced",
//                   "(2 pints)"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/cherry-tomatoes.png"
//           },
//           {
//               "id": 1028,
//               "amount": 4,
//               "unit": "ounces",
//               "unitLong": "ounces",
//               "unitShort": "oz",
//               "aisle": "Cheese",
//               "name": "part-skim mozzarella cheese",
//               "original": "4 ounces part-skim mozzarella pearls (scant 1 cup) or 4 ounces block-style part-skim mozzarella cheese, cut into bite-sized cubes",
//               "originalName": "part-skim mozzarella pearls (scant 1 cup) or 4 ounces block-style part-skim mozzarella cheese, cut into bite-sized cubes",
//               "meta": [
//                   "block-style",
//                   "cut into bite-sized cubes",
//                   "(scant 1 cup)"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/shredded-cheese-white.jpg"
//           }
//       ],
//       "usedIngredients": [
//           {
//               "id": 1055062,
//               "amount": 1.5,
//               "unit": "pounds",
//               "unitLong": "pounds",
//               "unitShort": "lb",
//               "aisle": "Meat",
//               "name": "chicken breasts",
//               "original": "1½ pounds boneless, skinless chicken breasts (about 4 small or 3 medium)",
//               "originalName": "boneless, skinless chicken breasts (about 4 small or 3 medium)",
//               "meta": [
//                   "boneless",
//                   "skinless",
//                   "( 4 small or 3 medium)"
//               ],
//               "extendedName": "skinless boneless chicken breasts",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/chicken-breasts.png"
//           },
//           {
//               "id": 10011282,
//               "amount": 1,
//               "unit": "cup",
//               "unitLong": "cup",
//               "unitShort": "cup",
//               "aisle": "Produce",
//               "name": "onion",
//               "original": "1 small red onion, diced (about 1 cup)",
//               "originalName": "small red onion, diced (about",
//               "meta": [
//                   "diced",
//                   "red"
//               ],
//               "extendedName": "red diced onion",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/red-onion.png"
//           },
//           {
//               "id": 10211215,
//               "amount": 4,
//               "unit": "teaspoons",
//               "unitLong": "teaspoons",
//               "unitShort": "tsp",
//               "aisle": "Produce",
//               "name": "garlic",
//               "original": "4 cloves garlic, minced (about 4 teaspoons)",
//               "originalName": "cloves garlic, minced (about",
//               "meta": [
//                   "minced"
//               ],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/garlic.jpg"
//           },
//           {
//               "id": 2042,
//               "amount": 0.25,
//               "unit": "teaspoon",
//               "unitLong": "teaspoons",
//               "unitShort": "tsp",
//               "aisle": "Spices and Seasonings",
//               "name": "thyme",
//               "original": "1/4 teaspoon dried thyme",
//               "originalName": "dried thyme",
//               "meta": [
//                   "dried"
//               ],
//               "extendedName": "dried thyme",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/thyme.jpg"
//           },
//           {
//               "id": 2044,
//               "amount": 0.25,
//               "unit": "cup",
//               "unitLong": "cups",
//               "unitShort": "cup",
//               "aisle": "Produce",
//               "name": "tightly basil leaves",
//               "original": "¼ cup tightly packed fresh basil leaves, thinly sliced",
//               "originalName": "tightly packed fresh basil leaves, thinly sliced",
//               "meta": [
//                   "fresh",
//                   "packed",
//                   "thinly sliced"
//               ],
//               "extendedName": "fresh tightly basil leaves",
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/fresh-basil.jpg"
//           }
//       ],
//       "unusedIngredients": [
//           {
//               "id": 18079,
//               "amount": 1,
//               "unit": "serving",
//               "unitLong": "serving",
//               "unitShort": "serving",
//               "aisle": "Pasta and Rice",
//               "name": "breadcrumbs",
//               "original": "breadcrumbs",
//               "originalName": "breadcrumbs",
//               "meta": [],
//               "image": "https://spoonacular.com/cdn/ingredients_100x100/breadcrumbs.jpg"
//           }
//       ],
//       "likes": 0
//   }
// ]

const SearchResults = () => {
  const dispatch = useDispatch();
  const selectedPantryId = useSelector(state => state.auth.currentlySelectedPantryId);
  const recipes = useSelector(state=>state.recipes)
  const pantry = useSelector(state => state.pantries.find(pantry => pantry.id === selectedPantryId));
  const ingredientsInPantry = pantry?.ingredients;

  //get flattened array of all missing ingredients from recipes in state, then filter for duplicate values
  const missingIngredientsData = (recipes.map(recipe => recipe.missedIngredients.map(ingredient => ({id:ingredient.id, name:ingredient.name})))).flat();
  const uniqueIngredients = new Set()
  const missingIngredients = missingIngredientsData.filter(ingredient => {
      const isDuplicate = uniqueIngredients.has(ingredient.id);
      uniqueIngredients.add(ingredient.id);
      if(!isDuplicate){
          return true
      }
      return false
  })

  const [selectedIngredients, setSelectedIngredients] = useState([])

  const handleClick = (e, ingredientId) => {
    e.preventDefault();
    console.log(ingredientId)
    selectedIngredients.includes(ingredientId) ? setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient !== ingredientId)) : setSelectedIngredients([...selectedIngredients, ingredientId])
    console.log(selectedIngredients)
  }

  const handleSave = e => {
    e.preventDefault();
    selectedIngredients.forEach(ingredient => dispatch(addPantryItem(ingredient, selectedPantryId)))
    dispatch(addRecipes(ingredientsInPantry))
  }


  return(
    <div>
      <Box>
        {missingIngredients.map(ingredient => (
          <Chip key={ingredient.id} variant='outlined' clickable label={ingredient.name} onClick={(e)=>handleClick(e, ingredient.id)}/>
        ))}
        
      </Box>
      {!selectedIngredients.length ? null : <Button variant='contained' onClick={(e)=> handleSave(e)}>Add Selected Ingredients to Pantry</Button>}
      <Divider/>
      {recipes.map(recipe=>{
        return <Card key={recipe.id}>{recipe.title} {recipe.image} {recipe.missedIngredientCount} {recipe.usedIngredientCount} {recipe.unusedIngredientCount}</Card>
      })}
    </div>
  )
};

export default SearchResults