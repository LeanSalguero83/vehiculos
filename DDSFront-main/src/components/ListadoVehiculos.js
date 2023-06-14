import React from 'react';

const ListadoVehiculos = ({ lista }) => {
  
  return (
    <div className="container mt-3">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Precio</th>
            <th>Patente</th>
            <th>Año</th>
            <th>Nombre Propietario</th>
          </tr>
        </thead>
        <tbody>
          {lista.map((item) => (
             <tr key={item.IdVehiculo}>
              <td>{item.IdVehiculo}</td>
              <td>{item.VehiculoMarca}</td>
              <td>{item.VehiculoModelo}</td>
              <td>{item.VehiculoPrecio}</td>
              <td>{item.VehiculoPatente}</td>
              <td>{item.VehiculoAñoFabricacion}</td>
              <td>{item.NombrePropietario}</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoVehiculos;