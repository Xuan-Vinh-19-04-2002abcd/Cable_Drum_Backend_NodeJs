import express from 'express';
import  dotenv from "dotenv";
import bodyParser from "body-parser";
import  morgan from "morgan";
import mongoose from "mongoose";
import router from "./routers/product.js";
import routeUser from "./routers/user.js";
import routeContract from "./routers/contract.js";
import routeRequest from "./routers/request.js";
import routerApi from "./routers/api.js"
import cookieParser from 'cookie-parser';
import cors from "cors";
const  app = express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("tiny"));
const  api = process.env.API_URL;
app.use(`${api}/products`,router);
app.use(`${api}/users`,routeUser);
app.use(`${api}/contracts`,routeContract);
app.use(`${api}/requests`,routeRequest);
app.use(`${api}`,routerApi);

mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
        console.log('Connect successfully');
    }).catch((error) => {
        console.error('Lỗi kết nối MongoDB:', error);
    });
app.listen(3000,()=> {
    console.log(api);
    console.log("Server is running http://localhost:3000")
})