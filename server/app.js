import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import plagiarismRoutes from "./routes/plagiarismRoutes.js";

const app = express();
const corsOptions = {
    origin: ['https://rayanswersai.xyz', 'https://api.rayanswersai.xyz', 'api.rayanswersai.xyz', 'rayanswersai.xyz'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use(cookieParser());
app.use(bodyParser.json({ limit: '1mb' }));

app.use("/api/v1/plagiarism", plagiarismRoutes);

export default app;