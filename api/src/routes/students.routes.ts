import { Router } from "express";
import { StudentsController } from "../controllers/StudentsController";
import { authenticateToken } from "../middleware/authenticateToken";

const router = Router();
const studentsController = new StudentsController();

router.get("/students", authenticateToken, studentsController.index);
router.post("/students", authenticateToken, studentsController.create);

export default router;
