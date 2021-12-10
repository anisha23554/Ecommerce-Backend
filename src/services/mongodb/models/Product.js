import mongoose from "mongoose"

const productSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"category"
    },
    listprice:{
        type:String,
        required:true
    },
    actualprice:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    compatibleWith:{
        type:[
          {
              type:String
          }
        ] 
    },
    imageURL:{
        type:String
    },
    Stock:{
        type:Number,
        required:true
    },
    Reviews:{
        type:mongoose.Types.ObjectId,
        ref:"Review"
    }
})

const Product = mongoose.model('Product',productSchema)

export default Product