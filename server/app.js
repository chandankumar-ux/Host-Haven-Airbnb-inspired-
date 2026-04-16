
// app.js
import express from "express";
import "dotenv/config";
import cors from "cors";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { v4 as uuidv4 } from 'uuid';
import connectDB from "./config/mongodb.js";
import { NotFoundError } from "./errors/AppError.js";
import adminRouter from "./admin/adminRouter.js";
import hostPostRouter from "./routes/hostPostRouter.js";
import postRouter from "./routes/postRouter.js";
import paymentRouter from "./routes/paymentRoutes.js";
import bookRouter from "./routes/bookingRouter.js";

const app = express();
connectDB();
const allowedOrigins = [
  "http://localhost:5173",
  "https://sthaan.vercel.app",
  "https://sthaan-git-main-amol-kumars-projects.vercel.app",
  "https://sthaan-r1se4nlmx-amol-kumars-projects.vercel.app"
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
}));




app.use(cookieParser());


// request id middleware
app.use((req, res, next) => {
  req.traceId = uuidv4();
  res.setHeader('X-Trace-Id', req.traceId);
  next();
});
app.use(express.json());
app.use('/api/users', userRouter);
app.use('/api/host',hostPostRouter);
app.use("/api/post",postRouter);


app.use('/api/admin',adminRouter);
app.use('/api/auth', authRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/bookings",bookRouter);

app.get("/",(req,res)=>{
    res.send("I'm Here");
})
// 404 handler
app.use((req, res, next) => {
  next(new NotFoundError('Route not found'));
});

// centralized error handler
app.use(errorHandler);

export default app;