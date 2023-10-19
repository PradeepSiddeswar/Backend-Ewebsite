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

// getall

exports.get =  (req, res) => {
    console.log(req.query,"user")
    User.find({user_id:req.query.user_id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

exports.getProfile = async (req, res) => {
    const profileId = req.params.profileId; // Correct the parameter name to 'profileId'

    console.log("Received request for profileId: ", profileId); // Add this line for debugging

    try {
        const profile = await User.findById(profileId);

        console.log("Retrieved profile from the database: ", profile); // Add this line for debugging

        if (!profile) {
            console.log("Profile not found in the database"); // Add this line for debugging
            return res.status(404).json({ message: 'Profile not found' });
        }

        res.status(200).json(profile);
    } catch (error) {
        console.error("Error while retrieving profile:", error); // Add this line for debugging
        res.status(500).json({ message: 'Internal Server Error' });
    }
};