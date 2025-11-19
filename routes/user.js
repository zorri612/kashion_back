import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:id", getUserInfo);

export default router;
