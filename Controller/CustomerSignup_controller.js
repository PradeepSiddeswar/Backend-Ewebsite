const CustomerSignupDB = require("../Model/CustomerSignup_model");

const register = async (req, res) => {
  const { name, phoneNumber, email, password, confirmPassword } = req.body;

  if (!name || !phoneNumber || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if email already exists
    const existingUser = await CustomerSignupDB.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    // If email is not found, create a new user
    const newUser = await CustomerSignupDB.create({ name, phoneNumber, email, password, confirmPassword });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
};

module.exports = {
  register,
};
