var Sequelize = require('sequelize')
var db = require("../connection/conn")

module.exports= db.sequelize.define(
    'tb_product_type'/* MOU name*/,{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            // notnull:true
        }
    },
    {
        timestamps:false,
        freezeTableName:true
    }
)