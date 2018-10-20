'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
  	
  	id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },

    name: {
        type: DataTypes.STRING,
    },
    
    lastName: {
        type: DataTypes.STRING,
    },
    
    email: {
      type: DataTypes.STRING,
      unique: true
    }

  }, {});

  Users.associate = function(models) {
    // associations can be defined here
  };

  return Users;
};