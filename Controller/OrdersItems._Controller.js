const Order = require('../Model/OrderItems_Model');


exports.createOrder = async (req, res) => {
  try {
    const { HotelName, CustomerName, productName, quantity, price } = req.body;
    const order = new Order({ HotelName, CustomerName, productName, quantity, price });
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// Get total orders placed today with total price
exports.getTotalOrdersToday = async (req, res) => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
  
      const orders = await Order.find({ orderDate: { $gte: today } });
  
      // Calculate the total number of orders
      const totalOrders = orders.length;
  
      // Calculate the total price of orders placed today
      const totalTodayPrice = orders.reduce((total, order) => total + order.price, 0);
  
      res.status(200).json({
        totalOrders,
        totalTodayPrice,
        orders, // Include the list of orders if needed
      });
    } catch (error) {
      console.error('Error fetching orders:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

   // delete method
   exports.delete = (req, res) => {
    const id = req.params.id
    Order.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send(`category not found with ${id}`)
            } else {
                res.send("category deleted successfully")
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
  }