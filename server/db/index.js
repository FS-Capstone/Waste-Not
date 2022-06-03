//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Pantry = require('./models/Pantry')
const PantryItem = require('./models/PantryItem')
const Ingredient = require('./models/Ingredient')

//associations ---------

User.hasMany(Pantry, { foreignKey: 'userId' });
Pantry.belongsTo(User, { foreignKey: 'userId' });

Pantry.belongsToMany(Ingredient, {through: 'PantryIngredients'});
Ingredient.belongsToMany(Pantry, {through: 'PantryIngredients'});

//removed because we are not keeping track of quantity
// Pantry.hasMany(PantryItem, { foreignKey: 'pantryId' });
// PantryItem.belongsTo(Pantry, { foreignKey: 'pantryId' });

// Ingredient.hasMany(PantryItem, { foreignKey: 'ingredientId' });
// PantryItem.belongsTo(Ingredient, { foreignKey: 'ingredientId' });

module.exports = {
  db,
  models: {
    User,
    Ingredient,
    Pantry,
    PantryItem
  },
}
