const mongoose = require("mongoose")
const schema = mongoose.Schema

const CustomerSignupSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phoneNumber:{type: Number, required: true},
    email: { type: String, required: true },
    password: { type: Number, required: true },
    confirmPassword: {type: Number, required: true}
    
  })

const CustomerSignupDB = mongoose.model("CustomerSignup", CustomerSignupSchema)
module.exports = CustomerSignupDB