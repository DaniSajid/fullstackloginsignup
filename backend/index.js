import  dotenv  from "dotenv";
import express from "express"
import { connedtDb } from "./db/index.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoute from "./routes/user.route.js";
dotenv.config({path:"./.env"});

const app = express();

// json express 
app.use(express.json());
app.use(cookieParser());


// cors 
app.use(cors());

connedtDb().then(() => {

  app.listen(process.env.PORT || 8000, () => {
    console.log(`server is running on port ${process.env.PORT}`);
  });

}).catch((err)=>{
  console.log("Server Crashed :", err);
});
app.use("/api/v1/user", userRoute);