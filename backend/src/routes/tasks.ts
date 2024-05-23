import { Router } from "express";
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTaskById,
  updateTaskStatus,
} from "../controllers/taskController";
import authenticate from "../middleware/authenticate";

const router = Router();

router.get("/getTasks", authenticate, getTasks);
router.post("/createTask", authenticate, createTask);
router.put("/:id", authenticate, updateTask);
router.delete("/:id", authenticate, deleteTask);
router.get("/:id", authenticate, getTaskById);
router.patch("/updateTaskStatus/:id", authenticate, updateTaskStatus);

export default router;
