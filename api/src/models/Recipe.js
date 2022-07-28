const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: {
      type: DataTypes.TEXT,
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
