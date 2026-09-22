import dotenv from "dotenv"
dotenv.config()



if(!process.env.PORT){
    throw new error("Port is not defined in the envirnoment variables");
    
}

if(!process.env.MONGO_URI){
    throw new error("Mongo_URI is not defined in the envirnoment variables")
}

if(!process.env.GOOGLE_CLIENT_ID){
    throw new error ("Google Client id is not defined in the envirnoment variables")
}

if(!process.env.GOOGLE_CLIENT_SECRET){
        throw new error(
          "Google Client Secret is not defined in the envirnoment variables",
        );

}

if(!process.env.GOOGLE_REFRESH_TOKEN){
        throw new error(
          "Google Refresh token is not defined in the envirnoment variables",
        );

}

if (!process.env.EMAIL_USER) {
  throw new error("Email User is not defined in the envirnoment variables");
}

if(!process.env.JWT_SECRET){
  throw new error("JWT secret key is not defined in the envirnoment variables")
}

if (!process.env.GMAIL_PASSWORD) {
  throw new error("Gmail password  is not defined in the envirnoment variables");
}

if(!process.env.IMAGE_KIT_PRIVATE_KEY){
  throw new error("Image kit private key is not present in the envirnoment variables")
}

if(!process.env.IMAGE_KIT_PUBLIC_KEY){
  throw new error("Image kit public key is not present in the envirnoment variables")
}

if(!process.env.IMAGE_KIT_URL_ENDPOINT){
  throw new error("Image kit url endpoint is not present in the envirnoment variables")
}


const config = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  EMAIL_USER: process.env.EMAIL_USER,
  JWT_SECRET: process.env.JWT_SECRET,
  GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
  IMAGE_KIT_URL_ENDPOINT:process.env.IMAGE_KIT_URL_ENDPOINT,
  IMAGE_KIT_PUBLIC_KEY:process.env.IMAGE_KIT_PUBLIC_KEY,
  IMAGE_KIT_PRIVATE_KEY:process.env.IMAGE_KIT_PRIVATE_KEY,
};


export default config