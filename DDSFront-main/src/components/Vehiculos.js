import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import ListadoVehiculos from './ListadoVehiculos'

const Vehiculos = () => {
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  
  const [lista, setLista] = useState([]);
  const [marcas, setMarcas] = useState(["Todas"]);  // Lista para almacenar las marcas 

  useEffect(() => {
    const fetchVehiculos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/vehiculos');
        setLista(response.data);

        // Extrayendo todas las marcas únicas
        const marcas = [...new Set(response.data.map(item => item.VehiculoMarca))];
        setMarcas(["Todas", ...marcas]);

      } catch (error) {
        console.error(error);
      }
    }

    fetchVehiculos();
  }, []);

  const onSubmit = async (data) => {
    if (data.filtro.length < 3) {
      alert("El filtro debe contener al menos 3 caracteres");
      return;
    }

    try {
      const response = await axios.get('http://localhost:4000/api/vehiculos', {
        params: data
      });
      
      console.log(response.data)
      setLista(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
     <h1>Vehiculos</h1>
     <hr />
      <div className="card mb-3">
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label className="form-label">Filtro:</label>
              <input type="text" className="form-control" {...register('filtro', { minLength: 3 })} />
              {errors.filtro && <p>El filtro debe contener al menos 3 caracteres</p>}
            </div>
            <div className="mb-3">
              <label className="form-label">Marca:</label>
              <select className="form-control" {...register('marca')}>
                {marcas.map((marca, index) => (
                  <option key={index} value={marca}>{marca}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Buscar</button>
          </form>
        </div>
      </div>
      <ListadoVehiculos lista={lista} />
    </div>
  );
};

export default Vehiculos;
