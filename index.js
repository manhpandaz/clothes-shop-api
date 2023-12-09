import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouters from "./routes/users.js";
import authRouters from "./routes/auth.js";
import productRouters from "./routes/products.js";
import orderRouters from "./routes/orders.js";
import cartRouters from "./routes/carts.js";

const app = express();

dotenv.config();
const port = process.env.PORT;

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb connected"))
  .catch((err) => {
    console.log(err);
  });

// app.get("/", (req, res) => {
//   res.send("hello word");
// });
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());

app.use("/api/auth", authRouters);
app.use("/api/users", userRouters);
app.use("/api/products", productRouters);
app.use("/api/orders", orderRouters);
app.use("/api/carts", cartRouters);

app.listen(port || 8089, () => {
  console.log(`Backend server is working on port http://localhost:${port}`);
});
