import ImageKit from 'imagekit'
import config from '../config/config.js'
import multer from "multer"


const client = new ImageKit({
  publicKey: config.IMAGE_KIT_PUBLIC_KEY,
  privateKey: config.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: config.IMAGE_KIT_URL_ENDPOINT,
});


async function uploadImage(file){
    const result = await client.files.upload({
        file,
        filename:"img" + Date.now(),
        folder:"/E-commerce/Back-end"
    })

    return result
}


export {uploadImage}