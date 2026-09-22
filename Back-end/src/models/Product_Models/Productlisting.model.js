import mongoose from "mongoose"

const product_listing_Schema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: [true, 'productId is required'],
  },
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:[true , 'seller id is required']
  },
  price:{
    type:Number,
    required:[true, "Price is required"],
    validate:{
        validator:(val) => {
            return val > 0

        },
        message : `Price ${val} must be a positive number`
    }
  },
  stock:{
    type:Number,
    required:[true, 'Stock is required'],
    validate:{
        validator:(val) => {
            return val >= 0
        },
        message:`Stock must be equal or greater then 0`
    }
  }
},{
    timestamps:true
});


const listingModel = mongoose.model("product_listing", product_listing_Schema)

export default listingModel