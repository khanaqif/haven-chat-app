import { Router } from "express";
import {
  getUserInfo,
  signup,
  login,
  updateProfile,
  addProfileImage,
  removeProfileImage,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddleware.js";

// multer for upload
import multer from "multer";

const authRoutes = Router();

const upload = multer({ dest: "uploads/profiles/" });

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);

// add profile image
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
);

authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
export default authRoutes;
