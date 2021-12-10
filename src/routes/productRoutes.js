import express from 'express'
import Product from "../services/mongodb/models/Product"
import Category from "../services/mongodb/models/Category"
const router = express.Router()

/*
type:GET
path:api/v1/product/all
params:none
isProtected:false
 */

router.get('/all',async(req,res)=>{
    try{
       const products = await Product.find({})
       return res.json({
           message:'fetched products',
           products
       })
    }
    catch(error){
        return res.json({
            message:'Failed to fetch products',
            products:[]
        })
    }
})
/*
type:POST
path:api/v1/product/add
params:none
isProtected:true (ADMIN)
 */
// add express validator
router.post('/add',async(req,res)=>{
    try{
      // checking whether the category exists or not
      const category = await Category.findById(req.body.category)
      if(!category){
          return res.json({
              status:'FAILED',
              message:"Invalid Category",
              product:null
          })
      }
      const product =  new Product(req.body)
      await product.save()
      res.json({
         status:'SUCESS',
         message:'product added',
         product
      })
     }
    catch(error){
        res.json({
            status:'FAILED',
            message:error.message,
            product:null
         })
    }
})
/* 
type:PUT
path:api/v1/product/update/:id
params:id 
isProtected:true (ADMIN)
*/

router.put('/update/:id',async(req,res)=>{
    const {id} = req.params
    try{
      if(req.body.category){
        const category = await Category.findById(req.body.category)
        if(!category){
            return res.json({
                status:'FAILED',
                message:"Invalid Category",
                product:null
            })
        }
      }
      const product = await Product.findOneAndUpdate({_id:id},req.body,{
          new:true
      })
      res.json({
          status:'SUCESS',
          message:'updated product',
          product
      })
    }
    catch(error){
        res.json({
            status:'FAILED',
            message:error.message,
            product:null
        })
    }
   
})
/* 
type:PUT
path:api/v1/product/delete/:id
params:none
isProtected:true (ADMIN)
*/

router.put('/delete/:id',async(req,res)=>{
    const {id} = req.params
    try{
       const product = await Product.findByIdAndRemove(id)
       res.json(
           {
               status:'SUCESS',
               message:'product deleted from db',
               product
           }
       )
    }   
    catch(error){
        res.json(
            {
                status:'FAILED',
                message:error.message,
                product:null
            }
        )
    } 
})
export default router