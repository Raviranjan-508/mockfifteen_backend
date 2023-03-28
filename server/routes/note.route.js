const {Router} = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { authentication } = require('../middlewares/authentication');
const { bmiModel } = require('../model/note.model');

const bmiController = Router();

bmiController.get("/getprofile",authentication,async(req,res)=>{
    const {user_id}=req.body
    const user=await userModel.findOne({_id:user_id})
    console.log(user)
    const {name,email}=user
    res.send({name,email})
})

bmiController.post("/calculatebmi",authentication,async(req,res)=>{
    const {height,weight}=req.body
    const heightin_meter=Number(height)*0.3048
    const BMI=Number(weight)/(heightin_meter)**2
    const new_bmi=new bmiModel({

    })
    await new_bmi.save()
    res.send({BMI})

})
bmiController.get("/getcalculation",authentication,async(req,res)=>{
    const {user_id}=req.body
    const all_bmi=await bmiModel.find({user_id})
    res.send({all_bmi})

})

module.exports = {
    bmiController
}