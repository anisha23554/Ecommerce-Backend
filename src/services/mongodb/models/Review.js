import mongoose from "mongoose"

const reviewSchema = mongoose.Schema({
    authorName:{
        type:String,
        required:true
    },
    review:{
        type:String,
        required:true
    }
})
const Review = mongoose.model('Review',reviewSchema)

export default Review