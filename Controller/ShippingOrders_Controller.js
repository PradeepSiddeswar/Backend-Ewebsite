const { v4: uuidv4 } = require('uuid');
const ShippingOrder = require('../Model/ShippingOrders_Model');
const { geocodeAddress } = require('../services/geocoding'); // Implement the geocoding service

// Create a new shipping order
exports.createShippingOrder = async (req, res) => {
  try {
    const { name, status } = req.body;

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
    const orderId = req.params.orderId;

    const shippingOrder = await ShippingOrder.findOne({ orderId });

    if (!shippingOrder) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const { name } = shippingOrder;

    const coordinates = await geocodeAddress(name);

    res.json(coordinates);
  } catch (error) {
    console.error('Error retrieving location data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};