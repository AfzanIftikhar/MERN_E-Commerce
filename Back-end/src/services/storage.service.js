import ImageKit from '@imagekit/nodejs'
import config from '../config/config.js'
import multer from "multer"


const client = new ImageKit({
    privateKey: config.IMAGE_KIT_PRIVATE_KEY,
});


async function uploadImage(file){
    const result = await client.files.upload({
        file,
        fileName:"img" + Date.now(),
        folder:"/E-commerce/Back-end"
    })

    return result
}


export {uploadImage}