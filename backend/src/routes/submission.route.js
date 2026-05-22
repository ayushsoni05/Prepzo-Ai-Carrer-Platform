import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  createSubmission,
  getProblemSubmissions,
} from "../controllers/submission.controller.js";

const router = Router();

router.use(verifyJWT);

router.route("/").post(createSubmission);
router.route("/problem/:problemId").get(getProblemSubmissions);

export default router;
