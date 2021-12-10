import mongoose from 'mongoose'

const connectdb = async()=>{
   try{
      await mongoose.connect(process.env.DB_URL)
      console.log("succesfully connected to the database")
   }
   catch(error){
      console.log(error.message)
   }
}
export default connectdb