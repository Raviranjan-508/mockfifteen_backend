const {Router} = require('express');
const userController = Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { userModel } = require('../model/user.model');



userController.post("/signup" , async(req,res) => {
    const { email , password , age } = req.body;

    bcrypt.hash(password , 6 , async function(err , hash){
        if(err){
            res.send('Something went wrong, please try again')
        }
        const user = new userModel({
            email,
            password : hash,
            age
        })
        try{
            await user.save();
            res.json({msg: "Signup Successfully"})
        }
        catch(err){
            console.log(err);
            res.send('Something went wrong, please try again')
        }
    })
})


userController.post("/login", async (req,res) => {
    const { email , password } = req.body;
    const user = await userModel.findOne({email})
    const hash = user.password;
    bcrypt.compare(password , hash , async function(err , result) {
        if(err){
            res.send(`Something went wrong, try again later`)
        }
        if(result){
            const token = jwt.sign({ userId : user._id } , process.env.SECRET) 
            res.send({message: "Login Successful", token})
        }
        else{
            res.send(`Invalid credential , plz signup if you haven`)
        }
    })
})

module.exports = {
    userController
}