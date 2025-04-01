import express from "express";
import cookieParser from "cookie-parser";
import { authRoutes } from "./presentation/routes/auth.routes";
import { courseRoutes } from "./presentation/routes/course.routes";
import { userRoutes } from "./presentation/routes/user.routes";
import { errorMiddleware } from "./presentation/middlewares/error.middleware";

const app = express();

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
