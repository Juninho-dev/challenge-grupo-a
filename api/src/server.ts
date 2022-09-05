import "express-async-errors";
import express from "express";
import AuthRoutes from "./routes/auth.routes";
import StudentsRoutes from "./routes/students.routes";
import { errorMiddleware } from "./middleware/errorMiddleware";

const app = express();

app.use(express.json());

app.use(AuthRoutes);
app.use(StudentsRoutes);

app.use(errorMiddleware);

app.listen(3000, () => console.log("Server is running on port 3000"));
