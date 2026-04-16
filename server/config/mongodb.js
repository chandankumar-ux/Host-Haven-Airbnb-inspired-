import mongoose from "mongoose";
const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected✔✅");
    }
    catch(error){
        console.error('❌ Database Connection Error:', error.message);
         process.exit(1);
    }
}
export default connectDB;