/* ADMIN CREDS:
   email:admin@gmail.com
   password:admin12
 */
import jwt from "jsonwebtoken"

const isAdmin = (req,res,next)=>{
    // checking whether the user(admin or normal user) is logged in or not
    // logged in user will contain a valid jwt token
    const token = req.headers.authorization
    // console.log(token)
    // verifying the token 
    if(token){
      const decodedPayload = jwt.verify(token,process.env.SECRET)
      console.log(decodedPayload)
      const {role} = decodedPayload
      if(role == 1) next()
      else{
          return res.json({
              message:"ACCESS DENIED"
          })
      }
    }
    else{
    // user is not logged in
     return res.json({
       message:'UNAUTHORISED'
     })
    }
}
export default isAdmin