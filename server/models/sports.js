// sport.js

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mysql://root:example@localhost:3306/JOOlympics');

const Sport = sequelize.define('Sport', {
    sport_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom_sport: {
        type: DataTypes.STRING,
        allowNull: false
    },
    site_competition: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'Sports', // Nom de la table dans la base de données
    timestamps: false // Désactiver les timestamps par défaut (createdAt, updatedAt)
});

module.exports = Sport;
