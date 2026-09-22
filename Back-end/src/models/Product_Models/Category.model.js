import mongoose from "mongoose"


const categorySchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, ' name is required']
    },
    description:{
        type:String
    }
},{
    timestamps:true
})


const categoryModel = mongoose.model("categories", categorySchema)

export default categoryModel