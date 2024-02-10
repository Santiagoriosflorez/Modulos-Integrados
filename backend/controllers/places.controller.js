const Places = require('../models/places.model')

module.exports.getplaces= async (req,res)=>{
    const places = await Places.find()
    res.json(places)
};




module.exports.postplaces = (req, res) => {
  const { name, coordinates } = req.body;

  Places.findOne({ name: name })
    .then(existingPlace => {
      if (existingPlace) {
        return res.json({ message: 'El lugar ya existe en la base de datos' });
      } else {
        const newPlace = new Places({
          name: name,
          location: {
            type: 'Point',
            coordinates: coordinates
          }
        });

        newPlace.save()
          .then(savedPlace => {
            console.log('Lugar guardado:', savedPlace);
            res.status(200).json({ message: 'Lugar guardado correctamente', data: savedPlace });
          })
          .catch(error => {
            console.error('Error al guardar el lugar:', error);
            res.status(500).json({ message: 'Error al guardar el lugar' });
          });
      }
    })
    .catch(error => {
      console.error('Error al buscar el lugar:', error);
      res.status(500).json({ message: 'Error al buscar el lugar en la base de datos' });
    });
};





