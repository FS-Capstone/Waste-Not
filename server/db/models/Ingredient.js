const Sequelize = require('sequelize')
const db = require('../db')

const Ingredient = db.define('ingredient', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  original: {
    type: Sequelize.STRING
  },
  originalName: {
    type: Sequelize.STRING
  },
  name: {
    type: Sequelize.STRING
  },
  amount: {
    type: Sequelize.INTEGER,
    defaultValue: 1
  },
  unit: {
    type: Sequelize.STRING
  },
  unitShort: {
    type: Sequelize.STRING
  },
  unitLong: {
    type: Sequelize.STRING
  },
  possibleUnits: {
    type: Sequelize.JSONB
  },
  estimatedCost: {
    type: Sequelize.JSONB
  },
  consistency: {
    type: Sequelize.STRING
  },
  aisle: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  },
  meta: {
    type: Sequelize.JSONB
  },
  nutrition: {
    type: Sequelize.JSONB
  },
  categoryPath: {
    type: Sequelize.JSONB
  },
  broadCategory: {
    type: Sequelize.STRING
  }
})


//possible categories
const COOKING = 'Cooking Ingredients';
const FISH = 'Fish';
const MEAT = 'Meat';
const DAIRY = 'Dairy';
const VEGETABLES = 'Vegetables';
const FRUIT = 'Fruits';
const GRAINS = 'Grains';
const MISC = 'Miscellaneous';
const DRINK = 'Drink';

//map all of the categories to the more broad categories
const mapCategoriesToBroadCategories = {
  'added sugar': COOKING,
  'appetizer': COOKING,
  'baked goods': COOKING,
  'baking mix category': COOKING,
  'baking pieces': COOKING,
  'baking powder': COOKING,
  'barley': GRAINS,
  'base': COOKING,
  'biscuits': COOKING,
  'bouillon': COOKING,
  'bouillon granules': COOKING,
  'bread': GRAINS,
  'breadcrumbs': COOKING,
  'breakfast': COOKING,
  'broth': COOKING,
  'buttermilk': DAIRY,
  'candy': COOKING,
  'candy bar': COOKING,
  'cereal': MISC,
  'cheese': DAIRY,
  'chips': MISC,
  'chocolate': COOKING,
  'cocoa powder': COOKING,
  'coconut': FRUIT,
  'coffee creamer': DAIRY,
  'condiment': MISC,
  'cookie crumbs': COOKING,
  'cookie dough': COOKING,
  'cookies': COOKING,
  'cooking fat': COOKING,
  'crackers': GRAINS,
  'cream': DAIRY,
  'crust': COOKING,
  'dessert': COOKING,
  'dessert filling': COOKING,
  'dessert mix': COOKING,
  'dessert topping': COOKING,
  'dip': MISC,
  'dough': COOKING,
  'drink': DRINK,
  'drink mix': DRINK,
  'dumpling wrappers': MISC,
  'egg': DAIRY,
  'emulsifier': COOKING,
  'extract': COOKING,
  'flour product': COOKING,
  'food color': COOKING,
  'fruit': FRUIT,
  'gelatin dessert mix': COOKING,
  'glaze': COOKING,
  'grains': GRAINS,
  'herbs': COOKING,
  'ice cream': DAIRY,
  'legumes': VEGETABLES,
  'lemon juice': DRINK,
  'main dish': MISC,
  'meat': MEAT,
  'meat substitute': MEAT,
  'milk substitute': DAIRY,
  'mushrooms': VEGETABLES,
  'nondairy butter': DAIRY,
  'nutritional yeast': COOKING,
  'nuts': VEGETABLES,
  'olives': VEGETABLES,
  'onion': VEGETABLES,
  'pasta': GRAINS,
  'pickles': VEGETABLES,
  'polenta': COOKING,
  'potato': VEGETABLES,
  'pretzels': MISC,
  'processed cheese': DAIRY,
  'protein powder': MISC,
  'quinoa': GRAINS,
  'salad dressing': MISC,
  'salad dressing mix': MISC,
  'salad topping': MISC,
  'salt': COOKING,
  'sauce': COOKING,
  'seafood': FISH,
  'seasoning': COOKING,
  'seeds': VEGETABLES,
  'side dish': COOKING,
  'snack': COOKING,
  'soup': COOKING,
  'soup mix': COOKING,
  'sour cream': DAIRY,
  'spices': COOKING,
  'spread': DAIRY,
  'sprouts': VEGETABLES,
  'starch': VEGETABLES,
  'stock': COOKING,
  'sugar substitute': COOKING,
  'sweetener': COOKING,
  'syrup': COOKING,
  'tomato concentrate': VEGETABLES,
  'undefined': MISC,
  'vegan cheese': DAIRY,
  'vegetable': VEGETABLES,
  'vinegar': COOKING,
  'water chestnuts': VEGETABLES,
  'wrap': COOKING,
  'yeast': COOKING,
  'yogurt': DAIRY
}

//after every ingredient is created, check the category, then update
//the broadCategory based on the map object above
Ingredient.afterCreate( async (ingredient, options) => {
  const category = ingredient.categoryPath[ingredient.categoryPath.length - 1];
  const broadCategory = mapCategoriesToBroadCategories[category];
  ingredient.broadCategory = broadCategory;
  await ingredient.save();
})

module.exports = Ingredient
