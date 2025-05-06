import express from "express";
import {
  signin,
  signup,
  refreshToken,
  logout,
} from "@controllers/authController";

const router = express.Router();

router.post("/signin", signin);

router.post("/signup", signup);

router.post("/refresh", refreshToken);

router.delete("/logout", logout);

export const authRoutes = router;
