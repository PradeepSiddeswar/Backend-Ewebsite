const NodeGeocoder = require('node-geocoder');

// Replace with your OpenCage API key
const geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: '39b8722b3e3040eeb59c9482431dd4e3',
});

// Define a function to geocode an address
const geocodeAddress = async (address) => {
  try {
    const response = await geocoder.geocode(address);
    if (response.length > 0) {
      const { latitude, longitude } = response[0];
      return { latitude, longitude };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { geocodeAddress };
