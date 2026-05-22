import { Router } from "express";
import { protect } from "../middleware/auth.middleware.js";
import {
  createSubmission,
  getProblemSubmissions,
} from "../controllers/submission.controller.js";

const router = Router();

router.use(protect);

router.route("/").post(createSubmission);
router.route("/problem/:problemId").get(getProblemSubmissions);

export default router;
