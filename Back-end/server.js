import app from "./src/app.js"
import config from "./src/config/config.js"
import connectDB from "./src/config/db/db.js"



const PORT  = config.PORT || 3000

const startServer = async() => {

    try {
        await connectDB()
        app.listen(PORT , () => {
            console.log(`Server is runing on port ${PORT}`)
        })
    } catch (error) {
        console.error("Unable to connect to server",error)
        process.exit(1)
        
    }

}


startServer()