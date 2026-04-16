import jwt from "jsonwebtoken";

const authMiddleware=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token){
        return res.json({success:false,message:"user not authorized login again"});
    }
    try{
         const tokenDecode=jwt.verify(token,process.env.JWT_SECRET);
         if(tokenDecode.id){
            req.authUserId=tokenDecode.id;
         }
         else{return res.json({success:false, message:"not Autorized login again"})}
         return next();

    }catch(err){
        res.json({success:false,message:err.message});
    }
}
export default authMiddleware;