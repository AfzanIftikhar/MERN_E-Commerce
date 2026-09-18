import mongoose from "mongoose";
import config from "../config.js";
import dns from "dns"
dns.setServers(['8.8.8.8','8.8.4.4'])

async function connectDB(){
    try {
        await mongoose.connect(config.MONGO_URI)
        console.log("Database connected successfully")
    } catch (error) {

        console.log("Unable to connect to database", error)
        
    }
}

export default connectDB