const { v4: uuidv4 } = require('uuid');
const ShippingOrder = require('../Model/ShippingOrders_Model');
const { geocodeAddress } = require('../services/geocoding'); // Implement the geocoding service

// Create a new shipping order
exports.createShippingOrder = async (req, res) => {
  try {
    // Destructure the fields from the request body
    const { name, status } = req.body;

    // Create a new shipping order using uuidv4 for orderId and the provided fields
    const newShippingOrder = new ShippingOrder({
      orderId: uuidv4(), // Automatically generates a unique Order ID
      name: name, // Extracted from the request body
      status: status, // Extracted from the request body
      // You can add more fields as needed
    });

    // Save the shipping order to the database
    const savedShippingOrder = await newShippingOrder.save();

    res.status(201).json(savedShippingOrder); // Respond with the created shipping order
  } catch (error) {
    console.error('Error creating shipping order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


exports.getLocationByOrderId = async (req, res) => {
    try {
      // Extract the order ID from the request parameters
      const orderId = req.params.orderId;
  
      // Find the shipping order in the database by order ID
      const shippingOrder = await ShippingOrder.findOne({ orderId });
  
      // If the order is not found, return a 404 response
      if (!shippingOrder) {
        return res.status(404).json({ error: 'Order not found' });
      }
  
      // Extract the address (name) from the shipping order
      const { name } = shippingOrder;
  
      // Use the geocoding service to obtain coordinates (latitude and longitude)
      const coordinates = await geocodeAddress(name);
  
      // Respond with the coordinates
      res.json(coordinates);
    } catch (error) {
      console.error('Error retrieving location data:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };