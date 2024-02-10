/*import axios  from 'axios'

const ORS_API_KEY='5b3ce3597851110001cf6248574e049c429a4d3eb5b1fea3b7b7f022';

const openRouteService = axios.create({
    baseURL:'https://api.openrouteservice.org',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': ORS_API_KEY
    }
  });

export const getRoute = async (coordinates) => {
    try {
      const response = await openRouteService.post('/v2/directions/foot-walking/json', {
        coordinates: coordinates,
        format: 'json'
      });
      return response.data;
    } catch (error) {
      throw new Error('Error al obtener la ruta desde OpenRouteService');
    }
  };
  
  export default openRouteService;*/