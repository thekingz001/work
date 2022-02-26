var Sequelize = require('sequelize')
var db = require("../connection/conn")

module.exports= db.sequelize.define(
    'thai_provinces'/* MOU name*/,{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        name_th:{
            type:Sequelize.STRING,
            // notnull:true
        },
        name_en:{
            type:Sequelize.STRING,
            // notnull:true
        },
        geography_id:{
            type:Sequelize.INTEGER,
            // notnull:true
        },
        createdAt:{
            type:Sequelize.DATE,
            // notnull:true
        },
        updatedAt:{
            type:Sequelize.DATE,
            // notnull:true
        },
        deletedAt:{
            type:Sequelize.DATE,
            // notnull:true
        }
    },
    {
        timestamps:false,
        freezeTableName:true
    }

)