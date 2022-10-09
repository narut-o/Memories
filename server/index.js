import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import * as dotenv from "dotenv";
dotenv.config();




const app = express();

app.use(cors());
app.use(bodyParser.json({limit: "30mb",extended:true}));
app.use(bodyParser.urlencoded({limit: "30mb",extended:true}));

app.use('/posts',postRoutes);
app.use('/user',userRoutes);

const PORT = process.env.PORT;

mongoose.connect(process.env.CONNECTION_URL)
.then(()=>{app.listen(PORT,()=>{console.log(`Server running on port: ${PORT}`);})})
.catch((error)=>{console.log(error.message);});



