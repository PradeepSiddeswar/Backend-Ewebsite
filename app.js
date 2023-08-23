const express = require("express")
const dotenv = require("dotenv")
const path = require("path")
const app = express()

const bp = require("body-parser")
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

const CustomerSignupRoute = require("./Routes/CustomerSignup_router")

dotenv.config({ path: '.env'})
const PORT = process.env.PORT || 8080
console.log("Server Started", PORT)
const mongoose = require("mongoose");
mongoose.pluralize(null)

mongoose.connect(process.env.MONGO_URL, {

})
.then(() => console.log(`Connected To Database`))
.then(() => {
    app.listen(PORT);
})
.catch((error) => console.log(error));


app.get("/", (req, res) => {
    res.send("Hello world")
})

app.post('/api/register', (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
  
    if ( !password || !confirmPassword) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
  
    // Here you can proceed with user registration or other actions
    res.json({ message: 'Registration successful' });
  });
  


app.use("/customersignup", CustomerSignupRoute)
