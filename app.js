const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const path = require("path")
const app = express()

app.use(cors({
  origin: 'http://localhost:3000',
  methods:['GET', 'POT', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']

}))

app.use(cors({
  origin: 'http://localhost:3000', // Replace with your React app's URL
  credentials: true
}));

const bp = require("body-parser")
app.use(bp.json());
app.use(bp.urlencoded({extended:false}));

const CustomerSignupRoute = require("./Routes/CustomerSignup_router")
const Customer1SignupRoute = require("./Routes/Customer1Signup_router")
const ProdectListRoute = require("./Routes/ProdectList_router")
const CategoriesRoute = require("./Routes/Categories_Router")
const FormLocationRoute = require("./Routes/FormLocation_Router")
const distanceRoute = require('./Routes/Distance_router')
const ImageRoute = require("./Routes/image_router")
const Category1Route = require("./Routes/Category1_Router")
const VideoRoute = require("./Routes/video_router")
const otpRoute = require("./Routes/Otp_router")
const smsRoute = require("./Routes/Sms_router")
const LoginInRoute = require("./Routes/LoginIn_Router")
const SignUpRoute = require("./Routes/SignUp_Router")
const userlocationRoute = require("./Routes/UserLaction_Router")


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
app.use( express.static('path_to_image_directory'));
app.use("/customersignup", CustomerSignupRoute)
app.use("/customerLogin", Customer1SignupRoute )
app.use("/add-cart", ProdectListRoute)
app.use("/api1", CategoriesRoute)
app.use("/formLocation", FormLocationRoute)
app.use('/distances', distanceRoute);
app.use("/image", ImageRoute)
app.use("/form", Category1Route)
app.use("/video", VideoRoute)
app.use('/otp', otpRoute);
app.use('/smsOtp', smsRoute )
app.use('/login', LoginInRoute)
app.use('/signup', SignUpRoute)
app.use('/userLocation', userlocationRoute) 



