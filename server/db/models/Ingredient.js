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
  }
})

module.exports = Ingredient