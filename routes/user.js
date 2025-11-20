import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:email", getUserInfo);

export default router;
