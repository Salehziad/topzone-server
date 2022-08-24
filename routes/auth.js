'use strict';
const express = require('express');
const router=express.Router();
const{signup,signin,signout}=require('../controllers/auth') ;
const {userSignupValidator}=require('../validator/index') ;
router.post('/signup',userSignupValidator,signup);
router.post('/signin',signin);
router.get('/signout',signout);
router.get('/hi',(req,res)=>{
    res.send("hhhhh")
})
module.exports=router;