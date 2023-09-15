const LoginInDB = require('../Model/LoginIn_Model');

exports.create = async(req, res) => {
    console.log(req.body);
    if(!req.body) {
        res.status(400).send("Content Connt Be Empty")
        return
    }
    const loginin = new LoginInDB({
        Email: req.body.Email,
        Password: req.body.Password,
       
    })
    loginin.save(loginin)
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
    LoginInDB.find({user_id:req.query.user_id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}