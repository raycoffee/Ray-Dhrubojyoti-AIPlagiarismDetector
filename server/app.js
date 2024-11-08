import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import plagiarismRoutes from "./routes/plagiarismRoutes.js";

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '1mb' }));

app.use("/api/v1/plagiarism", plagiarismRoutes);

export default app;