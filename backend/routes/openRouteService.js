const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/post-route", async (req, res) => {
  const { origin, destination } = req.body;

  try {
    // Geocodificar nombres de lugares a coordenadas
    const geocodeOrigin = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        origin
      )}`
    );
    const geocodeDestination = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        destination
      )}`
    );

    // Extraer coordenadas de la respuesta de Nominatim
    const originCoordinates = [
      geocodeOrigin.data[0].lon,
      geocodeOrigin.data[0].lat,
    ];
    const destinationCoordinates = [
      geocodeDestination.data[0].lon,
      geocodeDestination.data[0].lat,
    ];

    // Realizar solicitud a OpenRouteService con las coordenadas
    const apiKey = "5b3ce3597851110001cf6248ef860606bdb44f28b81564fab9c02fb3";
    const response = await axios.get(
      `https://api.openrouteservice.org/v2/directions/foot-walking?api_key=${apiKey}&start=${originCoordinates.join(
        ","
      )}&end=${destinationCoordinates.join(",")}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error al obtener la ruta:", error);
    res.status(500).json({ error: "Error al obtener la ruta" });
  }
});

module.exports = router;

/*const express = require('express');
const { Directions } = require('openrouteservice-js');


const ORSclient = new Directions({
  api_key:'5b3ce3597851110001cf6248574e049c429a4d3eb5b1fea3b7b7f022'
});*/

/*router.get('/get-route', async (req, res) => {
  try {
    const { lat: lat1, lon: lon1 } = req.query.origin;
    const { lat: lat2, lon: lon2 } = req.query.destination;

    const response = await ORSclient.calculate({
      coordinates: [[lon1, lat1], [lon2, lat2]],
      profile: 'driving-car',
      units: 'km'
    });
    const distance = response.routes[0].summary.distance; 
    res.json({ distance });

  } catch (error) {
    console.error('Error al calcular distancia:', error);
    res.status(500).json({ message: 'Error al calcular distancia' });
  }
});*/

/*router.post('/post-route', async (req, res) => {
  try {

   const {origin,destination}=req.body;

    const response = await ORSclient.calculate({
      coordinates: [[origin.lon, origin.lat], [destination.lon, destination.lat]],
      profile: 'driving-car',
      units: 'km'
    });
    const distance = response.routes[0].summary.distance; 
    res.json({ distance });

  } catch (error) {
    console.error('Error al calcular distancia:', error);
    res.status(500).json({ message: 'Error al calcular distancia' });
  }
});
*/

module.exports = router;

//const lat1 = 8.681495; // Latitud del punto de origen
//const lon1 = -49.41461; // Longitud del punto de origen
//const lat2 = 34.0522; // Latitud del punto de destino
//const lon2 = -118.2437; // Longitud del punto de destino
