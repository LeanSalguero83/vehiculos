// configurar ORM sequelize
const { Sequelize, DataTypes } = require("sequelize");
//const sequelize = new Sequelize("sqlite:" + process.env.base );
const sequelize = new Sequelize("sqlite:" + process.env.base);

const vehiculos = sequelize.define(
  "vehiculos",
  {
    IdVehiculo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "El IdVehiculo es requerido",
        },
        isInt: {
          args: true,
          msg: "El IdVehiculo debe ser un número entero",
        },
      },
    },
    VehiculoMarca: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El VehiculoMarca es requerido",
        },
      },
    },

    VehiculoModelo: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El VehiculoModelo es requerido",
        },
      },
    },

    VehiculoPrecio: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "VehiculoPrecio es requerido",
        },
      },
    },

    VehiculoPatente: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "VehiculoPatente es requerido",
        },
        unique: { args: true, msg: "El VehiculoPatente ya existe" },
      },
    },

    VehiculoAñoFabricacion: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "VehiculoAñoFabricacion es requerido",
        },
      },
    },

    NombrePropietario: {
      type: DataTypes.STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "VehiculoPatente es requerido",
        },
      },
    },
  },
  {
    timestamps: false,
  }
);

module.exports = {
  sequelize,
  vehiculos,
};
