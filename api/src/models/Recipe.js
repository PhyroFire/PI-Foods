const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    health_score: {
      type: DataTypes.INTEGER,
    },
    step_by_step: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
    img: {
      type: DataTypes.STRING,
    },
    myRecipe: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },


  }, { timestamps: false });
};
