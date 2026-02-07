import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { Connectionofdb } from "./db.js";
import Userroutes from './routes.js'
import { initRabbitMQ } from "./producer.js";
// import  cookieParser from 'cookie-parser'

const app = express();
const PORT = process.env.PORT;


Connectionofdb()
await initRabbitMQ(); // ✅ only once

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1',Userroutes)
app.use((req, res, next) => {
  console.log("Incoming body:", req.body);
  next();
});




// app.use(cookieParser());

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 User service  running at http://localhost:${PORT}`);
})