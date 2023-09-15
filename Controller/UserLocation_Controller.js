const UserLocationDB = require('../Model/UserLocation_Model');

exports.create = async (req, res) => {
    console.log(req.body);
    if (!req.body) {
        res.status(400).send("Content Cannot Be Empty");
        return;
    }
    
    const { address, City, StreetAddress, PostalCode } = req.body;
    
    // Check if PostalCode is provided in the request body
    const userlocationFields = {
        address,
        City,
        StreetAddress
    };
    
    if (PostalCode) {
        userlocationFields.PostalCode = PostalCode;
    }

    const userlocation = new UserLocationDB(userlocationFields);

    userlocation.save()
        .then(data => {
            res.status(200).send(data);
        })
        .catch(error => {
            res.status(500).send({
                message: error
            });
        });
}

/// get all
exports.get =  (req, res) => {
    console.log(req.query,"user")
    UserLocationDB.find({user_id:req.query.user_id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}