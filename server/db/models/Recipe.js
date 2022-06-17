const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
    recipeId: {
        type: Sequelize.INTEGER, // does scott need recipe id property for faves?
    },
    title: {
        type: Sequelize.STRING,
    },
    author: {
        type: Sequelize.STRING,
    },
    cuisine: {
        type: Sequelize.STRING,
    },
    prepTime: {
        type: Sequelize.STRING,
    },
    cookTime: {
        type: Sequelize.STRING,
    },
    servings: {
        type: Sequelize.INTEGER,
    },
    ingredients: {
        type: Sequelize.STRING,
    },
    instructions: {
        type: Sequelize.STRING,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    recipeUrl: {
        type: Sequelize.STRING
    },
    createdByUser: { // only required property, to sort btw faves and created
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

module.exports = Recipe 