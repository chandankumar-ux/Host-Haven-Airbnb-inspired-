import jwt from "jsonwebtoken";
import { BadRequestError } from "../errors/AppError.js";
import User from "../models/User.js";
 const hostChecker=async(req,res,next)=>{
     const {token}=req.cookies;
        if(!token){
             return next(new BadRequestError("Not authorized, Login again!"));
        }
        console.log("token---",token);
        try{
             const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
             
             if(tokenDecode.id){
                const user=await User.findById(tokenDecode.id);
                console.log("User", user);
                if(user.role!=="provider" ){
                    return next(new BadRequestError("You'r not a provider"));
                }
                
                req.authUserId=tokenDecode.id;
                console.log("req User ID--", req.authUserId);
             }
             else{return next(new BadRequestError("Not authorized, Login again!"));}
             return next();
    
        }catch(err){
            next(err);
        }
 }
 export default hostChecker;