const express = require("express");
const router = express.Router();
const db = require("../base-orm/sequelize-init");
const { Op } = require("sequelize");

// [GET] /api/vehiculos
router.get("/api/vehiculos", async function (req, res) {
  try {
    let where = {};
    let order = [
      ["VehiculoMarca", "ASC"],
      ["VehiculoAñoFabricacion", "DESC"],
    ];

    if (req.query.filtro) {
      where[Op.or] = [
        { NombrePropietario: { [Op.like]: "%" + req.query.filtro + "%" } },
        { VehiculoPrecio: { [Op.like]: "%" + req.query.filtro + "%" } },
        { VehiculoModelo: { [Op.like]: "%" + req.query.filtro + "%" } },
        { VehiculoPatente: { [Op.like]: "%" + req.query.filtro + "%" } },
        { VehiculoAñoFabricacion: { [Op.like]: "%" + req.query.filtro + "%" } },
        // Agrega aquí otras condiciones para los campos que deseas buscar
      ];
    }

    if (req.query.marca && req.query.marca !== "Todas") {
      where.VehiculoMarca = { [Op.like]: "%" + req.query.marca + "%" };
    }

    let vehiculos = await db.vehiculos.findAndCountAll({
      limit: 50,
      order: order,
      where: where,
    });

    res.json(vehiculos.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
