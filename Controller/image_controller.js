const ImageDB = require('../Model/image_model');

exports.create = async(req, res) => {
    console.log(req.body);
    console.log(req.protocol + "://" + req.get("host"), "url")
    if(!req.body) {
        res.status(400).send("Content Connt Be Empty")
        return
    }



    const image = new ImageDB({
        title: req.body.title,
        image: req.file&&req.file.filename ? req.protocol + "://" +req.get("host")+"/images/" + req.file.filename : "",
    })
    image.save(image)
                   .then(data => {
                    res.status(200).send(data)
                   })
                   .catch(error => {
                    res.status(500).send({
                        message: error
                    })
                   })
}

// find user 
    exports.find = (req, res) => {
      if (req.params.title) {
          const title = req.params.title
          ImageDB.findOne({ title: title }
          ).then(data => {
              if (!data) {
                  res.status(400).send("User not found")
              } else {
                  res.send(data)
              }
          })
              .catch(err => {
                  res.status(500).send(err)
              })
      }
      else
          ImageDB.find()
              .then(user => {
                  res.send(user)
              })
              .catch(err => {
                  res.status(500).send(err)
              })
  }   