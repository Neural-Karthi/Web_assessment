const express = require('express');
const body_Parser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
app.use(body_Parser.json());
app.use(body_Parser.urlencoded({ extended: true }));
app.use(cors());
//database connection
mongoose.connect('mongodb://127.0.0.1:27017/ABC_site', { useNewUrlParser: true });

const userschema=new mongoose.Schema({
    username:String,
    EmailID:String,
    RegDate:Date
})

const usermodel=mongoose.model('customer_details',userschema)

//API for Insert
app.post('/insert', async(req, ress) => {
    const {userDetails,userEmailID}=req.body;
    const d = new Date();
    console.log(d)
const user = new usermodel({
    username: userDetails,
    EmailID: userEmailID,
    RegDate:d
});
    try{
        const inital_check=await usermodel.find({EmailID:userEmailID})
        if(inital_check.length===0){
            await user.save();
            return ress.status(200).send("Data Inserted successfully ")
        }
        else{
            return ress.status(200).send("Email ID already exists")
        }
    }
    catch(error){
        return  ress.status(500).send(error);
    }
});
//API for update
app.put('/Update',async(req,ress)=>{
    const {userDetails,userEmailID}=req.body;
    try{
        const inital_check=await usermodel.find({EmailID:userEmailID})
        if(inital_check.length===1){
            await usermodel.updateOne({EmailID:userEmailID},{$set:{username:userDetails}});
            return ress.status(200).send("Updated successfully ")
        }
        else{
            return ress.status(200).send("Email ID not exists")
        }
    }
    catch(error){
        return  ress.status(500).send(error);
    }
})
//API for Delete
app.post('/Delete',async(req,ress)=>{
    const {userEmailID}=req.body
    try{
        const inital_check=await usermodel.find({EmailID:userEmailID})
        if(inital_check.length===1){
            await usermodel.deleteOne({EmailID:userEmailID});
            return ress.status(200).send("User Data deleted successfully ")
        }
        else{
            return ress.status(200).send("Email ID not exists")
        }
    }
    catch(error){
        return  ress.status(500).send(error);
    }
})
//APT for Display
app.get('/Display',async(req,ress)=>{
    try{
        const inital_check=await usermodel.find({},{__id:0,__v:0})
        if(inital_check.length>0){
           return ress.json(inital_check);
        }
        else{
            return ress.status(200).send("No Record found")
        }
    }
    catch(error){
        return  ress.status(500).send(error);
    }
})
app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
  });