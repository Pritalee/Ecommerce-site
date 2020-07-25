const User=require('../models/UserModel');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {jwtSecret,jwtExpire}=require('../config/keys')


exports.signupController= async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=  await User.findOne({email});
        if(user){
            return res.status(400).json({
                errorMessage:"Email already exists",
            });
        }
        const newUser=new User();
        newUser.email=email;

        const salt= await bcrypt.genSalt(10);
        newUser.password= await bcrypt.hash(password,salt);
        await newUser.save();
        //console.log('user saved to db');

        res.json({
            successMessage:'Registration successful.Please login.',
        });

        
    }
    catch(err){
        //console.log('signupController error',err);
        res.json({
            errorMessage:'Server error',
        });
    }
};


exports.loginController= async (req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});
        if(!user){
            res.status(400).json({
                errorMessage:'User does not exists',
            });   
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            res.status(400).json({
                errorMessage:'Invalid credentials',
            });
            
        }
        const payload={
            user:{
                _id:user._id,
            },
        };
        jwt.sign(payload,jwtSecret,{expiresIn:jwtExpire},(err,token)=>{
            if(err) console.log('jwt error',err);
            const {_id,email,role}= user;
            res.json({
                token,
                user:{_id,email,role},
            });


        });

       

    }
    catch(err){
        //console.log('Login server error',err);
        res.status(400).json({
            errorMessage:'Server error',
        }); 
    }
};

