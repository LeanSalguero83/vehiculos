const db = require("aa-sqlite");

async function CrearBaseSiNoExiste() {
  // abrir base, si no existe el archivo/base lo crea
  await db.open(process.env.base);

  let existeVehiculos = false;
  let resVehiculos = null;
  existeVehiculos = false;
  sqlVehiculos =
    "SELECT count(*) as contar FROM sqlite_schema WHERE type = 'table' and name= 'vehiculos'";
  resVehiculos = await db.get(sqlVehiculos, []);
  if (resVehiculos.contar > 0) existeVehiculos = true;
  if (!existeVehiculos) {
    await db.run(
      `CREATE table vehiculos( 
        IdVehiculo INTEGER PRIMARY KEY AUTOINCREMENT
      , VehiculoMarca TEXT NOT NULL
      , VehiculoModelo TEXT NOT NULL
      , VehiculoPrecio INTEGER NOT NULL 
      , VehiculoPatente TEXT NOT NULL UNIQUE
      , VehiculoAñoFabricacion INTEGER NOT NULL
      , NombrePropietario TEXT NOT NULL
      );`
    );
    console.log("tabla vehiculos creada!");

    // Asegúrate de usar los años de fabricación correctos para cada vehículo.
    await db.run(
      `INSERT INTO vehiculos (VehiculoMarca, VehiculoModelo, VehiculoPrecio, VehiculoPatente, VehiculoAñoFabricacion, NombrePropietario)
      VALUES 
('FORD', 'FOCUS', 7850000, 'AA123BB', 2017, 'John Doe'),
('CHEVROLET', 'ONIX', 7400000, 'AB456CD', 2021, 'Jane Doe'),
('VOLKSWAGEN', 'GOL', 8100000, 'AC789EF', 2016, 'Peter Parker'),
('RENAULT', 'KWID', 7200000, 'AD012GH', 2018, 'Clark Kent'),
('TOYOTA', 'COROLLA', 7950000, 'AE345IJ', 2015, 'Bruce Wayne'),
('FIAT', 'CRONOS', 7600000, 'AF678KL', 2023, 'Tony Stark'),
('PEUGEOT', '208', 8050000, 'AM901NO', 2014, 'Steve Rogers'),
('HYUNDAI', 'HB20', 7250000, 'AP234PQ', 2022, 'Natasha Romanoff'),
('CITROEN', 'C3', 7950000, 'AR567ST', 2013, 'Wanda Maximoff'),
('NISSAN', 'VERSA', 7800000, 'AT890UV', 2014, 'James Bond'),
('FORD', 'RANGER', 8300000, 'AX123YZ', 2022, 'Diana Prince'),
('CHEVROLET', 'CRUZE', 7350000, 'BA456CD', 2017, 'Bucky Barnes'),
('VOLKSWAGEN', 'POLO', 8100000, 'BC789EF', 2019, 'Sam Wilson'),
('RENAULT', 'SANDERO', 7150000, 'BD012GH', 2013, 'Scott Lang'),
('TOYOTA', 'YARIS', 7900000, 'BE345IJ', 2021, 'Hope van Dyne');`
    );
  }

  db.close();
}

CrearBaseSiNoExiste();

module.exports = CrearBaseSiNoExiste;
