import "express-async-errors";
import express from "express";
import AuthRoutes from "./routes/auth.routes";
import StudentsRoutes from "./routes/students.routes";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(AuthRoutes);
app.use(StudentsRoutes);

app.use(errorMiddleware);

app.listen(3000, () => console.log("Server is running on port 3000"));
