const mongoose = require("mongoose")
const schema = mongoose.Schema

const CustomerSignupSchema = new schema({
    name: {
        type: String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    email: {
        type: String,
        lowercase:true,
    },
    password:{
          type:Number,
          required:true,
    },
    confirmPassword:{
        type:Number,
        required:true,
    }
})

const CustomerSignupDB = mongoose.model("CustomerSignup", CustomerSignupSchema)
module.exports = CustomerSignupDB