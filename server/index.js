import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import db from "./config/db.js";
import authRoutes from "./routes/auth.route.js";
import orderRoutes from "./routes/order.routes.js";

// CONFIGURE ENV
dotenv.config();

// RES OBJECT
const app = express();
const baseURL = "/api/v1";

// MIDDLEWARES
app.use(cors());
app.use(helmet());
app.use(express.json());

// ROUTE
app.use(`${baseURL}/auth`, authRoutes);
app.use(`${baseURL}/orders`, orderRoutes);
// MONGO DB CONNECTION
db();

// RES API
app.use("/", (req, res) =>
  res.send({
    app: "customize_accessories_app",
  })
);

// PORT
const PORT = process.env.PORT || 8080;

// SERVER
app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
