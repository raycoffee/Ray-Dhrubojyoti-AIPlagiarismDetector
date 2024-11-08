import express from "express"
import { checkPlagiarism } from "../controllers/PlagiarismController.js"

const router = express.Router()


router.post("/check-plagiarism", checkPlagiarism)

export default router