const sequelize = require('sequelize');
const { DataTypes } = require('sequelize');

module.exports = (sequelize)=>{
    sequelize.define('Diet', {
        name: { type: DataTypes.STRING,
             allowNull: false
        }
    }, { timestamps: false });
};