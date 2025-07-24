import express from "express";
import {
  createReview,
  getReviewsByFood,
  deleteReview,
  updateReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:foodId", protect, createReview);
router.get("/:foodId", getReviewsByFood);
router.delete("/delete/:reviewId", protect, deleteReview);
router.put("/update/:reviewId", protect, updateReview);

export default router;
