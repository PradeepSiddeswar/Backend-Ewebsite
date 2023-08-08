const CustomerNameDB = require("../Model/CustomerSignup_model")
const path = require("path")


exports.create = async (req, res) => {
    if (!req.body) {
        res.status(400).send("Name and password are required")
        return
    }
    const CustomerName = new CustomerNameDB({
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    })
    CustomerName.save(CustomerName)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: error
            })
        })
}