import jwt from "jsonwebtoken"
import config from "../config/config.js"
import crypto from "crypto"
import sessionModel from "../models/auth_models/session.model.js"


// Verifying Refresh Token
async function verifyRefreshToken(req,res,next){
    const refreshToken = req.cookies.refreshToken
    if(!refreshToken){
        return res.status(409).json({
            message:"Refresh Token not found"
        })
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest("hex")

    
  const session = await sessionModel.findOne({
    refreshTokenHash,
    revoked: false,
  });

  if(!session){
    return res.status(409).json({
      message:"Invalid refresh Token"
    })
  }

    req.user = decoded
    req.session = session
    next()
}



export {
    verifyRefreshToken
}