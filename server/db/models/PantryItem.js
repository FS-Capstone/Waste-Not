const Sequelize = require('sequelize')
const db = require('../db')

const PantryItem = db.define('pantryItem',{
    quantity: {
        type: Sequelize.INTEGER
    }

})

module.exports = PantryItem;