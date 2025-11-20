import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";

const app = express();
app.use(cors());
app.use(express.json());



// Conectar BD
connectDB();

// Rutas
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import salesRoutes from "./routes/sales.js";
import productRoutes from "./routes/products.js";
import orderRoutes from "./routes/orderRoutes.js";
import  getUserInfo  from "./routes/user.js";

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/userinfo", getUserInfo);


app.listen(5000, () => {
  console.log("Servidor corriendo en http://localhost:5000");
});
