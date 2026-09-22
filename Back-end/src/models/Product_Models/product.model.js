import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, 'Name is required'],
    },
    description:{
        type:String,
        required:[true, 'description is required']
    },
    image:{
        type:String,
        required:[true, "image is required"]
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"categories",
        required:[true, 'category is required']
    }
},{
    timestamps:true
})


const productModel = mongoose.model("products", productSchema)

export default productModel