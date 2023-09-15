const SignUpDB = require('../Model/SignUp_Model');

exports.create = async(req, res) => {
    console.log(req.body);
    if(!req.body) {
        res.status(400).send("Content Connt Be Empty")
        return
    }
    const signup = new SignUpDB({
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Phone: req.body.Phone,
       
    })
    signup.save(signup)
                   .then(data => {
                    res.status(200).send(data)
                   })
                   .catch(error => {
                    res.status(500).send({
                        message: error
                    })
                   })
}


exports.get =  (req, res) => {
    console.log(req.query,"user")
    SignUpDB.find({user_id:req.query.user_id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}