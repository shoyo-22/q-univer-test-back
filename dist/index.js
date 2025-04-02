"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const auth_routes_1 = require("./presentation/routes/auth.routes");
const course_routes_1 = require("./presentation/routes/course.routes");
const user_routes_1 = require("./presentation/routes/user.routes");
const error_middleware_1 = require("./presentation/middlewares/error.middleware");
const cors_1 = __importDefault(require("cors"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const app = (0, express_1.default)();
const allowedOrigins = [
    "http://localhost:5173",
    "https://q-univer-test-front.vercel.app",
    "https://extraordinary-mermaid-1e6a0b.netlify.app/"
];
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later.",
});
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
}));
app.use(limiter);
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use("/uploads", express_1.default.static("public/uploads"));
app.use("/auth", auth_routes_1.authRoutes);
app.use("/courses", course_routes_1.courseRoutes);
app.use("/user", user_routes_1.userRoutes);
app.use(error_middleware_1.errorMiddleware);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
