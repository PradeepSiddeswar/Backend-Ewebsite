const NavbarSchemaDB = require('../Model/Navbar_Model')

exports.create = async (req, res) => {
    if (!req.body) {
      res.status(400).send("Content Can't Be Empty");
      return;
    }
  
    const { username, email } = req.body;
  
    try {
      // Check if the email is already registered
      const existingUser = await NavbarSchemaDB.findOne({ email });
  
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }
  
      // Create a new user using the User model
      const navbar = new NavbarSchemaDB({
        username,
        email,
      });
  
      // Save the user to the database
      const savedNavbar = await navbar.save();
  
      res.status(201).json(savedNavbar);
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Server error',
      });
    }
  };
  exports.get =  (req, res) => {
    console.log(req.query,"user")
    NavbarSchemaDB.find({user_id:req.query.user_id})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json(error)
        })
}

// delete method
exports.delete = (req, res) => {
    const id = req.params.id
    NavbarSchemaDB.findByIdAndDelete(id)
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