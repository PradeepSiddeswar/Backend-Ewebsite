const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const app = express()

app.use(cors({
  origin: 'http://localhost:3000/',
  methods:['GET', 'POT', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']

}))

const bp = require("body-parser")
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

const CustomerSignupRoute = require("./Routes/CustomerSignup_router")
const Customer1SignupRoute = require("./Routes/Customer1Signup_router")
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


  

app.use(express.static("upload"))
app.use("/customersignup", CustomerSignupRoute)
app.use("/customerRegistration", Customer1SignupRoute )
