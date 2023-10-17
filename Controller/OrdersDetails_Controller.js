const OrdersDetails = require('../Model/OrdersDetails_Model');

exports.create = async(req, res) => {
    console.log(req.body);
    console.log(req.protocol + "://" + req.get("host"), "url")
    if(!req.body) {
        res.status(400).send("Content Connt Be Empty")
        return
    }
    const ordersdetails = new OrdersDetails({
        image: req.file&&req.file.filename ? req.protocol + "://" +req.get("host")+"/images/" + req.file.filename : "",
        productName: req.body.productName,
        quantity: req.body.quantity,
        price: req.body.price,
    })
    ordersdetails.save(ordersdetails)
                   .then(data => {
                    res.status(200).send(data)
                   })
                   .catch(error => {
                    res.status(500).send({
                        message: error
                    })
                   })
}
// getall

exports.get =  (req, res) => {
    console.log(req.query,"user")
    OrdersDetails.find({user_id:req.query.user_id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}