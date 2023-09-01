const Customer1SignupDB = require('../Model/Customer1Signup_model');

exports.create = async(req, res) => {
    console.log(req.body);
    console.log(req.protocol + "://" + req.get("host"), "url")
    if(!req.body) {
        res.status(400).send("Content Connt Be Empty")
        return
    }

    const { name, phone, email, gstRegistrationNo, latitude, longitude } = req.body;

    const customer1signup = new Customer1SignupDB({
        shopName: req.body.shopName,
        ownerName: req.body.ownerName,
        phone: req.body.phone,
        email: req.body.email,
        gstRegistrationNo: req.body.gstRegistrationNo,
        BbmpCertificateNo: req.body.BbmpCertificateNo,
        image: req.file&&req.file.filename ? req.protocol + "://" +req.get("host")+"/images/" + req.file.filename : "", 
    })
    customer1signup.save(customer1signup)
                   .then(data => {
                    res.status(200).send(data)
                   })
                   .catch(error => {
                    res.status(500).send({
                        message: error
                    })
                   })
}