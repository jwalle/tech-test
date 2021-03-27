import express from "express";
import cors from "cors";
import { authRouter } from "./routes/authRoutes";
import { jwtAuthenticationMiddleware } from "./routes/routeHelper";
import { scoreRouter } from "./routes/scoreRoutes";

const app = express();

app.use(express.json());

app.use(cors());

app.get("/hello", (req, res) => {
  res.status(200).end();
});

app.use(jwtAuthenticationMiddleware);
app.use(authRouter);
app.use(scoreRouter);

export default app;
