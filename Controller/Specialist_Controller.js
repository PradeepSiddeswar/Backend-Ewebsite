const Specialist = require("../Model/Specialist_Model");



exports.create = async(req, res) => {
    console.log(req.body);
    console.log(req.protocol + "://" + req.get("host"), "url")
    if(!req.body) {
        res.status(400).send("Content Connt Be Empty")
        return
    }
    const newSpecialist = new Specialist({
        name: req.body.name,
        title: req.body.title,
        language: req.body.language,
        mrp: req.body.mrp,
        image: req.file&&req.file.filename ? req.protocol + "://" +req.get("host")+"/images/" + req.file.filename : "",
        tags: req.body.tags, 
        ratings: req.body.ratings
    })
    newSpecialist.save(newSpecialist)
                   .then(data => {
                    res.status(201).json({ message: "success", specialist: newSpecialist });
                })
                   .catch(error => {
                    res.status(500).json({ message: "Internal server error", error });
                   })
}
// GET all specialists
exports.getAllSpecialists = async (req, res) => {
  try {
    const specialists = await Specialist.find();
    res.status(200).json({ message: "success", specialists: { ReviewLists: specialists } });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};


// delete method
exports.delete = (req, res) => {
    const id = req.params.id
    Specialist.findByIdAndDelete(id)
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

