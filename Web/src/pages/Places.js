import React, { useState, useEffect } from 'react';
import { placesRequest } from '../api/auth'; // Ajusta la ruta según la ubicación real de tu archivo de API

const Places = () => {
  const [lugares, setLugares] = useState([]);

  useEffect(() => {
    const fetchLugares = async () => {
      try {
        const response = await placesRequest();
        setLugares(response.data);
      } catch (error) {
        console.error('Error al obtener la lista de lugares:', error);
      }
    };

    fetchLugares();
  }, []);

  return (
    <div>
  <h2>Lista de Lugares:</h2>
  <ul>
    {lugares.map(lugar => (
      <li key={lugar._id}>
        {lugar.name} - {' '}
      </li>
    ))}
  </ul>
</div>
  );
};

export default Places;
