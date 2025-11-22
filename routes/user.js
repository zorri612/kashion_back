import express from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  getUserIds
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/:email", getUserInfo);
router.get("/", getUserIds);

export default router;
