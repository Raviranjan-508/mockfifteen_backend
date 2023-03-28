const express = require('express');
const { connection } = require("./config/db.js");
const { authentication } = require('./middlewares/authentication.js');
const {  bmiController } = require('./routes/note.route.js');
const { userController } = require('./routes/user.route.js');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT;

app.get("/" , (req,res) => {
    res.send('Hello from express');
}) 

app.use("/user" , userController);
app.use(authentication);
app.use("/bmi", bmiController);
app.listen(8080 , async() => {
    try{
        await connection
        console.log("Connected DB Successfully");
    }
    catch(err) {
        console.log(`error connecting to db`);
    }
    console.log(`It's running on ${PORT}`)
})