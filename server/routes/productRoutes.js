// Routes for particular product or just product and added rate-limiting.......

import express from "express";
import rateLimit from "express-rate-limit";
import { protect, admin } from "../middleware/authMiddleware.js";
import {getProducts,getProductById} from "../controllers/productController.js";

const router = express.Router();
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    message:
      "Too many requests from this IP, please try again after 15 minutes",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
router.route("/").get(apiLimiter, getProducts);

router.route("/:id").get(getProductById);

export default router;
