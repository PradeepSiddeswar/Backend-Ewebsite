const OrdersDetails = require('../Model/OrdersDetails_Model');
const { v4: uuidv4 } = require('uuid');

exports.create = async (req, res) => {
    console.log(req.body);
    console.log(req.protocol + "://" + req.get("host"), "url");

    if (!req.body) {
        res.status(400).send("Content Can't Be Empty");
        return;
    }

    const ordersdetails = new OrdersDetails({
        orderId: uuidv4(),
        image: req.file && req.file.filename ? req.protocol + "://" + req.get("host") + "/images/" + req.file.filename : "",
        productName: req.body.productName,
        totalitems: req.body.totalitems, // Use 'totalitems'
        price: req.body.price,
        offer: req.body.offer,
    });

    // Calculate the total price
    const totalPrice = (ordersdetails.price * ordersdetails.totalitems * (1 - ordersdetails.offer)).toFixed(2);

    ordersdetails.totalPrice = totalPrice;

    const responseArray = [];

    // Create the individual item object
    const individualItem = {
        id: ordersdetails.orderId,
        image: ordersdetails.image,
        name: ordersdetails.productName,
        price: ordersdetails.price,
        "total items": ordersdetails.totalitems,
        offer: ordersdetails.offer,
        "total price": ordersdetails.totalPrice
    };
    responseArray.push(individualItem);

    // Create the total price and total items object
    const totalObject = {
        "total price": totalPrice,
        "Total items": ordersdetails.totalitems
    };
    responseArray.push(totalObject);

    ordersdetails.save(ordersdetails)
        .then(data => {
            res.status(200).send(responseArray);
        })
        .catch(error => {
            res.status(500).send({
                message: error
            });
        });
};



// getall

exports.get = async (req, res) => {
    try {
      // Use Mongoose to find all order details
      const allOrders = await OrdersDetails.find();
  
      // Calculate total price and total items
      let totalPrice = 0;
      let totalItems = 0;
  
      for (const order of allOrders) {
        totalPrice += order.price * order.totalitems * (1 - order.offer);
        totalItems += order.totalitems;
      }
  
      // Create the total object
      const totalObject = {
        'total price': totalPrice.toFixed(2),
        'Total items': totalItems,
      };
  
      // Map the response with both id and orderId
      const response = allOrders.map(order => ({
        id: order._id, // MongoDB _id
        orderId: order.orderId, // Unique orderId
        image: order.image,
        name: order.productName,
        price: order.price,
        'total items': order.totalitems,
        offer: order.offer,
        'total price': (order.price * order.totalitems * (1 - order.offer)).toFixed(2),
      }));
  
      // Add the total object to the response
      response.push(totalObject);
  
      res.status(200).json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


  
  // delete

  exports.delete = (req, res) => {
    const id = req.params.id
    OrdersDetails.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                res.status(400).send(`category not found with ${id}`)
            } else {
                res.send("orders deleted successfully")
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
}