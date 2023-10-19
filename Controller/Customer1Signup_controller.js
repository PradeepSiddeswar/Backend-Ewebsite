const Customer1SignupDB = require('../Model/Customer1Signup_model');

exports.create = async(req, res) => {
    console.log(req.body);
    console.log(req.protocol + "://" + req.get("host"), "url")
    if(!req.body) {
        res.status(400).send("Content Connt Be Empty")
        return
    }
    const customer1signup = new Customer1SignupDB({
        shopName: req.body.shopName,
        ownerName: req.body.ownerName,
        phone: req.body.phone,
        email: req.body.email,
        gstRegistrationNo: req.body.gstRegistrationNo,
        BbmpCertificateNo: req.body.BbmpCertificateNo,
        image: req.file&&req.file.filename ? req.protocol + "://" +req.get("host")+"/images/" + req.file.filename : "",
        locationInfo: req.body.locationInfo, 
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
// getall

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

exports.getProfile = async (req, res) => {
    const profileId = req.params.profileId; // Correct the parameter name to 'profileId'

    console.log("Received request for profileId: ", profileId); // Add this line for debugging

    try {
        const profile = await Customer1SignupDB.findById(profileId);

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





// update id 
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send("User Address not found")
    }
    const id = req.params.id
    Customer1SignupDB.findByIdAndUpdate(id, req.body, { new: true })
        .then(data => {
            if (!data) {
                res.status(400).send(`Can not found user Address with ${id}`)
            } else {
                res.send(data)
            }
        })
        .catch(error => {
            res.status(500).send(error)
        })
}

// delete method
exports.delete = (req, res) => {
    const id = req.params.id
    Customer1SignupDB.findByIdAndDelete(id)
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