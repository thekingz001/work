var Sequelize = require('sequelize')
var db = require("../connection/conn")

module.exports= db.sequelize.define(
    'location'/* MOU name*/,{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name:{
            type:Sequelize.STRING,
            // notnull:true
        },
        lat:{
            type: Sequelize.DECIMAL,
            // notnull:true
        },
        lon:{
            type:Sequelize.DECIMAL,
            // notnull:true
        }
    },
    {
        timestamps:false,
        freezeTableName:true
    }
)