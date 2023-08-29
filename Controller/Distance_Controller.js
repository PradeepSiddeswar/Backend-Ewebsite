const Distance = require('../Model/Distance_model');

exports.createDistance = async (req, res) => {
    try {
      const { distanceInKm } = req.body;
  
      const newDistance = await Distance.create({ distanceInKm });
  
      // Format the distance value with "km" unit
      const formattedDistance = `${distanceInKm}km`;
  
      res.status(201).json({ distanceIn: formattedDistance });
    } catch (error) {
      console.error('Error creating distance', error);
      res.status(500).json({ error: 'Error creating distance' });
    }
  };

exports.getDistance = async (req, res) => {
  try {
    const { source, destination } = req.query;

    const distance = await Distance.findOne({ source, destination });
    if (!distance) {
      return res.status(404).json({ error: 'Distance not found' });
    }

    res.json(distance);
  } catch (error) {
    console.error('Error fetching distance', error);
    res.status(500).json({ error: 'Error fetching distance' });
  }
};
