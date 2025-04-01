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
const app = (0, express_1.default)();
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
