const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'], // Define el tipo como "Point" para usar coordenadas geoespaciales
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [Longitud, Latitud]
      index: '2dsphere' // Crea un índice 2dsphere para permitir consultas geoespaciales
    }
  }
});
  
module.exports = mongoose.model('places', placeSchema);