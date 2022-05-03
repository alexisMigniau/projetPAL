const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    const Panneau = sequelize.define('panneau', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      titre : {
        type: DataTypes.STRING(256),
        allowNull: true
      },
      adresse : {
        type: DataTypes.STRING(256),
        allowNull: true
      },
      marked : {
        type: DataTypes.BOOLEAN,
				defaultValue : false
      },
      latitude : {
        type : DataTypes.DECIMAL(8, 6),
        allowNull : false
      },
      longitude : {
        type : DataTypes.DECIMAL(9, 6),
        allowNull : false
      },
      departement : {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      circonscription : {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    },
      {
        sequelize,
        tableName: 'panneau',
        indexes: [
          {
              unique: true,
              fields: ['latitude', 'longitude']
          }
        ]
      }
    );

    return Panneau;
};