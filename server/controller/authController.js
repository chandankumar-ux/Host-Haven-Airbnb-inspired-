import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import transporter from "../config/nodemailer.js";
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from "../config/emailTemplates.js";

// custom errors
import { AlreadyExistsError, BadRequestError, MissingDetailsError } from "../errors/AppError.js";

// register
const register = async (req, res, next) => {
  try {
    //  Joi middleware se already validated data
    const { firstName,lastName, email, mobile, password } = req.body;

    console.log(" Checking existing user...");

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(
        new AlreadyExistsError(
          "User already exists with this email",
          { field: "email" }
        )
      );
    }

    console.log(" Hashing password...");
    const hashedPass = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      mobile,
      password: hashedPass,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

     console.log(" Email being sent to:", newUser.email);
         await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to our website",
            text: `Hello ${firstName}, welcome to our website! You are registered with ${email}.`,
        });

    return res.status(201).json({
      success: true,
      message: "Registered successfully",
    });

  } catch (error) {
    next(error); // 🔥 global error handler
  }
};
const login=async(req,res,next)=>{
  try{
  const {email, password}=req.body;
  if(!email || !password){
        return res.json({success:false, message:"Missing login Details"});
    }
const existingUser = await User.findOne({ email });
if (!existingUser) {
  return next(new BadRequestError("Invalid credentials"));
}
  const isMatch=await bcrypt.compare(password,existingUser.password);
  if(!isMatch){
    return next(new BadRequestError("Invalid Credintials",{field:"password"}));
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",  });

 res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    return res.status(201).json({
      success: true,
      message: "LoggedIn successfully",
      user: {
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        email: existingUser.email,
        mobile: existingUser.mobile,
        role: existingUser.role,
        isVerified: existingUser.isVerified,
        id: existingUser._id,
        profileImage:existingUser.profileImage,
      }
    }); 
  }catch(err){
    next(err);
  }
}

const logout=async(req,res,next)=>{
  try{
 res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
  return res.status(201).json({
    success:true,
    message:"Loggedout successflly"
  })  }
  catch(err){
    next(err);
  }
}

const generateOtp=async(req,res,next)=>{
  try{
    const userId=req.authUserId;
    if(!userId){
      return next(new BadRequestError("Please login form the otp"))
    }
    const currUser=await User.findById(userId);
    if(!currUser){
      return next(new BadRequestError( "User Doesn't exist"))
    }
      const otp=String(Math.floor(100000 +  Math.random()*900000));
      currUser.verifyOtp=otp;
      currUser.verifyOtpExpireAt=Date.now()+24*60*60*1000;
      await currUser.save();
  console.log("sendig otp by email--",otp);
  await transporter.sendMail({
  from: process.env.SENDER_EMAIL,
  to: currUser.email,
  subject: "Accont verification otp",
  text: `Hello ${currUser.name}, This is your otp to verify yourself-- ${otp}.`,
  html:EMAIL_VERIFY_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",currUser.email)
});
 return res.status(201).json({
    success:true,
    message:"Otp send successfully"
  });
  }catch(err){
    next(err);
  }
}
const fetchUser=async(req,res,next)=>{
  try{
    console.log("host",req.params.id);
  const {id}=req.params;
  if(!id) next(new BadRequestError("Invalid credentials"));

  const user=await User.findById(id);
  if(!user) next(new BadRequestError("Host doesn't exist"));
  if(user.role!=="provider") next (new BadRequestError("User in not a provider"));
  return res.status(201).json({
    success:true,
    message:"data send succesfuly",
    user,
  });
}catch(err){
  next(err);
}}
const verifyEmail=async(req,res,next)=>{
  const {otp}=req.body;
  console.log("req.body",req.body);
  console.log(otp);
  const userId=req.authUserId; 
  if(!userId ||!otp){
    return next(new MissingDetailsError("Otp is required",{field:"otp"}))
  }
  try{
    const currUser=await User.findById(userId);
    if(!currUser){
      return next(new BadRequestError("User doesn't exist"));
    }
    if(currUser.verifyOtp==="" || currUser.verifyOtp!==otp){
    return next(new MissingDetailsError("Invalid Otp",{field:"otp"}))
    }
    if(currUser.verifyOtpExpireAt<Date.now()){
    return next(new BadRequestError("Otp is expired ",{field:"otp"}))
    }
    currUser.isVerified=true;
    currUser.verifyOtp="";
    currUser.verifyOtpExpireAt=0;
    await currUser.save();
    return res.status(201).json({success:true,message:"Email successfully verified"});
  }catch(err){
    next(err);
  }
}

const isAuthenticated = async (req, res, next) => {
  try {
    const user = await User.findById(req.authUserId);
    return res.status(201).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};

  const sendResetOtp=async(req,res, next)=>{
  const email=req.body.email;
  console.log(email);
  if(!email){
    return next (new MissingDetailsError("invalid credentials",{field:"email"}))
    }
  try{
    const currUser=await User.findOne({email})
    if(!currUser){
      return next(new BadRequestError("User doesn't exist"))
    }
    const otp=String(Math.floor(100000 +  Math.random()*900000));
    currUser.resetOtp=otp;
    currUser.resetOtpExpireAt=Date.now()+24*60*60*1000;
    await currUser.save();

    await transporter.sendMail({
  from: process.env.SENDER_EMAIL,
  to: currUser.email,
  subject: "Password reset otp",
  text: `Hello ${currUser.name},Your OTP for resetting your password is -- ${otp}.
  Use this OTP to proceed with resettig your password`,
  html:PASSWORD_RESET_TEMPLATE.replace("{{otp}}",otp).replace("{{email}}",currUser.email)

});
res.json({success:true, message:"Otp has been send on user's mail..."})
  }catch(err){
    next(err);
    }
}

  const resetPassword=async(req,res,next)=>{
  const {email,otp,newPassword}=req.body;
  console.log("req.body--");
  console.log(req.body);
  if(!email || !otp || !newPassword){
    return next(new MissingDetailsError("Invalid credentials"))
  }
  try{
    const currUser=await User.findOne({email});
    if(!currUser){
      return next(new BadRequestError("User doesn't exists"));
        }

    if(currUser.resetOtp==="" || currUser.resetOtp!==otp){
      return next(new MissingDetailsError("invalid credentials",{field:"otp"}))
        }
    if(currUser.resetOtpExpireAt<Date.now()){
      return next (new BadRequestError("Otp is expired"));
        }
    const hashedPass=await bcrypt.hash(newPassword,10);
    currUser.password=hashedPass;
    currUser.resetOtp="";
    currUser.resetOtpExpireAt=0;
    await currUser.save();
    return res.status(201).json({success:true,message:" pasword reset successfully"});
  }catch(err){
    next(err);
    }
}



export { register, login,logout, fetchUser, generateOtp, verifyEmail, isAuthenticated, sendResetOtp,resetPassword  };
