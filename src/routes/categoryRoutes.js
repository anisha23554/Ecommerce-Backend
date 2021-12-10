import express from 'express'
import Category from "../services/mongodb/models/Category"
const router = express.Router()

router.get('/all',async(req,res)=>{
     try{
        const categories = await Category.find({})
        res.json({
            status:'SUCESS',
            message:'categories fetched',
            categories
        })
     }
     catch(error){
        res.json({
            status:'FAILURE',
            message:error.message,
            categories:[]
        })
     }
})
// add express validator as well
router.post('/add',async(req,res)=>{
    try{
        const category = new Category(req.body)
        await category.save()
        res.json({
            status:"SUCESS",
            message:"category added",
            category
        })
    }
    catch(error){
        res.json({
            status:"FAILED",
            message:error.message,
            category:[]
        })
    }
})
// update category route
router.post('/update:id',async(req,res)=>{
    try{
        const {id} = req.params
        const category = await Category.findOneAndUpdate({_id:id},req.body)
        res.json({
            status:"SUCESS",
            message:"category added",
            category
        })
    }
    catch(error){
        res.json({
            status:"FAILED",
            message:error.message,
            category:[]
        })
    }
})
// delete category route

export default router