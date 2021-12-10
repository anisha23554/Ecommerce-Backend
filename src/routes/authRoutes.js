import express from 'express'
import User from "../services/mongodb/models/User"
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken"
import isAdmin from '../middlewares/isAdmin'
import { body } from 'express-validator'
import { validationResult } from 'express-validator'

const router = express.Router()

/*
  type:get (to fetch all the users from the db)
  path:/api/v1/auth/users
  params:none
  isProtected:true (to be accessed only by the ADMIN)
*/
router.get('/users',async(req,res)=>{
    try{
        const users = await User.find({})
        res.json({
            status:'SUCCESS',
            message:"fetched users from db",
            users
        })
    }
    catch(error){
        res.json({
           status:"FAILED",
           message:error.message,
           users:[]
        })
    }
})
/*
  type:post (to add a user)
  path:/api/v1/auth/signup
  params:none
  isProtected:false (public route)
*/

router.post('/signup',body('firstName').isLength({min:5}),
                      body('email').isEmail(),
                      body('password').isLength({min:5}),
  async(req,res)=>{
    const {errors} = validationResult(req)
    if(errors.length>0){return res.json({message:"Bad Request"})}
    try{
       const {firstName,lastName='',email,password} = req.body
    //    hashing user's password using bcryptjs
       const salt = await bcrypt.genSalt(5)
       const hashedPassword = await bcrypt.hashSync(password,salt)
       const user = User({firstName,lastName,email,password:hashedPassword})
       await user.save()

       res.json({
          status:"SUCCESS",
          message:'User created',
          user
       })
    }
    catch(error){
       res.json({
        status:"FAILED",
        message:error.message,
        user:[]
       })
    }
})
/*
  type:post (to add a user)
  path:/api/v1/auth/login
  params:none
  isProtected:false (public route)
*/
router.post('/login',async(req,res)=>{
    try{
       const {email,password} = req.body
       const user = await User.findOne({email})
       if(user){
         const passwordMatched = await bcrypt.compare(password,user.password)
         if(passwordMatched){
             const {_id,role}=user
             const token = jwt.sign({_id,role},process.env.SECRET)
             return res.json(
                 {
                    status:"SUCESS",
                    message: "logged in",
                    token
                 })
          }
          else{
            return res.json({
                status:"FAILED",
                message: "Wrong Password",
                token:null
              })
          }
       }
       return res.json({
        status:'FAILED',
        message:"User not found",
        token:null
      })
    }
    catch(error){
        return res.json({
            status:'FAILED',
            message:"User not found",
            token:null
        })  
    }
})

export default router
