const UserLocationDB = require('../Model/UserLocation_Model');

exports.create = async(req, res) => {
    console.log(req.body);
    if(!req.body) {
        res.status(400).send("Content Connt Be Empty")
        return
    }
    const userlocation = new UserLocationDB({
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        Name: req.body.Name,
        addressLine1: req.body.addressLine1,
        addressLine2: req.body.addressLine2,
        state: req.body.state,
        postCode: req.body.postCode
    })
    userlocation.save(userlocation)
                   .then(data => {
                    res.status(200).send(data)
                   })
                   .catch(error => {
                    res.status(500).send({
                        message: error
                    })
                   })
}
/// get all
exports.get =  (req, res) => {
    console.log(req.query,"user")
    Customer1SignupDB.find({user_id:req.query.user_id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}