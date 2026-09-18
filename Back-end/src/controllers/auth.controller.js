import userModel from "../models/user.model.js";
import bcrypt from "bcrypt";
import { generateotp, generateOtpHtml } from "../utils/utils.js";
import crypto from "crypto";
import otpModel from "../models/otp.model.js";
import { sendEmail } from "../services/email.service.js";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../models/session.model.js";

// Registering a user
async function registerUser(req, res) {
  try {
    const { firstname, lastname, email, password } = req.body;

    // checking if user exists or not
    const is_user_exist = await userModel.findOne({
      email,
    });

    if (is_user_exist) {
      return res
        .status(409)
        .json({ success: false, message: "User already Exist" });
    }

    //   Hashing Password
    const hashed_Password = await bcrypt.hash(password, 10);

    //   Creating User
    const user = await userModel.create({
      firstname,
      lastname,
      email,
      password: hashed_Password,
    });

    // generating OTP
    const otp = generateotp();

    // Converting OTP to HASH
    const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

    // Generating the OTP HTML file which will be visible on the email
    const otpHTMl = generateOtpHtml(otp);

    // Creating OTP in the Database
    await otpModel.create({
      user: user._id,
      email: user.email,
      otpHash: otpHash,
    });

    // Sending the Email
    await sendEmail(
      email,
      `OTP verification`,
      `Your otp code is ${otp}`,
      otpHTMl,
    );

    // The User is created
    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user: {
        userId: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        verified: user.verified,
      },
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(400).json({
        success: false,

        error: error.message,
      });
    }

    if (error.name === "ER_DUP_ENTRY") {
      return res.status(409).json({
        success: false,
        error: "Email already Exist",
      });
    }
    console.log(error);

    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
}

// Verifying a user
async function verifyEmail(req, res) {
 try {
  
   const { otp, email } = req.body;

   const otpHash = crypto.createHash("sha256").update(otp).digest("hex");

   const otpDox = await otpModel.findOne({
     otpHash,
     email,
   });

   if (!otpDox) {
     return res.status(400).json({
       success: false,
       message: "Invalid otp",
     });
   }

   const user = await userModel.findByIdAndUpdate(
     otpDox.user,
     {
       verified: true,
     },
     {
       new: true,
     },
   );

   await otpModel.deleteMany({
     user: otpDox.user,
   });

   res.status(200).json({
     message: "Email Verified successfully",
     user: {
       firstName: user.firstname,
       email: user.email,
       verified: user.verified,
     },
   });
 } catch (error) {
  
  return res.status(500).json({
    message:"Unexpected Error occured", error
  })
 }
}

// Logging in a user
async function login(req, res) {


  try {
    
      const { email, password } = req.body;

      // Finding User By Email
      const user = await userModel.findOne({ email });

      // if user with the email is not present
      if (!user) {
        return res.status(401).json({
          success: false,
          message: "Invalid credentials",
        });
      }

      // If user is presnt but not verified
      if (!user.verified) {
        return res.status(401).json({
          message: "User is not verified",
        });
      }

      // Checking password if the password is valid then we will continue to create refresh token + Session + Access Token
      const is_password_valid = await bcrypt.compare(password, user.password);

      // If password is not valid
      if (!is_password_valid) {
        return res.status(404).json({
          message: "Invalid Password",
        });
      }

      // Creating refresh token

      const refreshToken = jwt.sign(
        {
          id: user._id,
        },
        config.JWT_SECRET,
        {
          expiresIn: "7d",
        },
      );

      // Converting refresh token to hash
      const refreshTokenHash = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

      // Creating session

      const session = await sessionModel.create({
        user: user._id,
        refreshTokenHash,
        ip: req.ip,
        userAgent: req.headers["user-agent"],
      });

      // Creating Access token
      const accessToken = jwt.sign(
        {
          id: user._id,
          sessionId: session._id,
        },
        config.JWT_SECRET,
        {
          expiresIn: "15m",
        },
      );

      // Storing refresh token in a cookie

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000, // -> 7 days
      });

      res.status(201).json({
        success: true,
        message: "Log in Successfully",
        user: {
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
        },
        accessToken,
      });
  } catch (error) {
    return res.status(500).json({
      message:"Unexpected error Occured"
    })
  }
}


// Generating a Refresh Token

async function refreshToken(req,res){
  try {
   
    const {user,session} = req

  const accessToken = jwt.sign({
    user:user.id
  },config.JWT_SECRET,{
    expiresIn:"15m"
  })

  const newRefreshToken = jwt.sign({
    id:user.id

  },config.JWT_SECRET,{
    expiresIn:'7d'
  })

  const newRefreshTokenHash = crypto.createHash('sha256').update(newRefreshToken).digest('hex')

  session.refreshTokenHash = newRefreshTokenHash
  await session.save()

  res.cookie("refreshToken", newRefreshToken,{
    httpOnly:true,
    secure:true,
    sameSite:'none',
    maxAge:7*24*60*60*1000
  })

  res.status(200).json({
    success:true,
    accessToken
  })


  } catch (error) {
    return res.status(500).json({
      message:"Unexpected error occured",error
    })
  }
}

// Log out a user
async function logout(req,res) {
try {
   const {session} = req

  session.revoked = true;
  await session.save();

  res.clearCookie("refreshToken");

  res.status(200).json({
    message: "Logged out successfully",
  });

} 
catch (error) {
  return res.status(500).json({
    message:"Unexpected error occured",error
  })
}
  
}

// Logout a user from all devices
async function logOutall(req,res) {

  try {
    const {user} = req
    await sessionModel.updateMany(
      {
        user: user.id,
        revoked: false,
      },
      {
        revoked: true,
      },
    );

    res.clearCookie("refreshToken");

    res.status(200).json({
      success: true,
      message: "logged Out from all devices",
    });
  } catch (error) {
    
    return res.status(500).json({
      message:"Unexpected error occured",error
    })
  }

}

export { registerUser, login, verifyEmail, logout,logOutall,refreshToken };
