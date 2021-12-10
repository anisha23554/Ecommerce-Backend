/* User Schema:
   firstName: String (required)
   lastName: String default:''
   email:String (required and unique)
   password:String
   roll:Number default:0--> V.imp 

   roll:- for admin role will be 1, hence role will
   decide whether the request is made by the admin or
   normal user
*/
import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        default:""
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:Number,
        default:0
    }
})

const User = mongoose.model('User',userSchema)

export default User