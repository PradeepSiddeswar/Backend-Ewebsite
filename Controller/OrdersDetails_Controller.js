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
  
      res.status(200).json(allOrders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };