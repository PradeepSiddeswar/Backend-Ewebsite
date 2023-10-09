const User = require('../Model/DeliveryPartner_Model')

exports.create = async (req, res) => {

    if (!req.body) {
        res.status(400).send("Content Connt Be Empty")
        return;
    }

    
    // Fetch the ShopListing data
    // const users = await User.find({}, 'ShopListing');
    // const shopList = users.map(user => user.ShopListing);

    const user = new User({
        FullName: req.body.FullName,
        Gender: req.body.Gender,
        ContctNumber: req.body.ContctNumber,
        CurrentAddres: req.body.CurrentAddres,
        AadhaarCardNumber: req.body.AadhaarCardNumber,
        PanCardNumber: req.body.PanCardNumber,
        VehicleInsuranceDetails: req.body.VehicleInsuranceDetails,
        VehicleName: req.body.VehicleName,
        VehicleRegistrationNumber: req.body.VehicleRegistrationNumber,
        ShopListing: req.body.ShopListing, // Use the ShopListing from the request body
        
    })
    user.save(user)
        .then(data => {
            res.status(200).send(data)
        })
        .catch(error => {
            res.status(500).send({
                message: error
            })
        })
}