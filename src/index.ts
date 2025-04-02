import express from "express";
import cookieParser from "cookie-parser";
import { authRoutes } from "./presentation/routes/auth.routes";
import { courseRoutes } from "./presentation/routes/course.routes";
import { userRoutes } from "./presentation/routes/user.routes";
import { errorMiddleware } from "./presentation/middlewares/error.middleware";
import cors from "cors";
import rateLimit from "express-rate-limit";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://q-univer-test-front.vercel.app",
];

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
app.use(limiter);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("public/uploads"));

app.use("/auth", authRoutes);
app.use("/courses", courseRoutes);
app.use("/user", userRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
