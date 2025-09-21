import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import { AuthRouter } from "./routes/auth";
import { UserRouter } from "./routes/user";

dotenv.config({ path: ".env" });

const origins = JSON.parse(
    process.env.origins ||
    '["http://localhost:3000", "http://localhost:3001", "http://localhost:5173"]'
);

const app = express();
app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || origins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "X-Requested-With",
            "Accept",
            "Origin",
            "Access-Control-Allow-Origin",
            "X-Forwarded-For",
            "user",
        ],
    })
);

app.use(
    express.json({
        limit: "1024mb",
    })
);

app.use(express.urlencoded({ extended: true }));

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);

app.get('/', (req, res) => {
    res.send('Colbin Backend is running.');
});

export default app;