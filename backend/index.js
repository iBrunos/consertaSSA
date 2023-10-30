import express from "express";
import connectDatabase from "./src/database/db.js"
import dotenv from "dotenv"

import authRoute from "./src/routes/auth.routes.js"
import orderRoute from "./src/routes/order.routes.js"
import userRoute from "./src/routes/user.routes.js"
import sexRoute from "./src/routes/sex.routes.js"
import cors from 'cors';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors({

  origin: [
    'https://happymakeup.vercel.app',
    'http://localhost:5173'
  ]
}))


connectDatabase();
//ROTAS
app.use(express.json())
app.use("/", sexRoute)
app.use("/order", orderRoute)
app.use("/user", userRoute)


app.use("/auth", authRoute)


app.listen(3000, () => console.log(`Server running on port ${port}`));