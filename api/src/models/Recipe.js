const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Recipe', {
    id: { type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
          allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: { type: DataTypes.STRING,
             allowNull: true,
    },
    summary: { type: DataTypes.TEXT,
               allowNull: true
    },
    spoonacularScore: {type: DataTypes.INTEGER,
                       allowNull: false
    },
    healthScore: { type: DataTypes.INTEGER,   
                   allowNull: true 
    },
    instructions: { type: DataTypes.TEXT,
                    allowNull: false  
    },
    mineRecipe: { type: DataTypes.BOOLEAN,
                  defaultValue: true} 
  }, { timestamps: false });
};
