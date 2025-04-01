"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const user_1 = require("../../domain/entities/user");
const password_utils_1 = require("../../utils/password.utils");
const jwt_utils_1 = require("../../utils/jwt.utils");
class AuthService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    register(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield (0, password_utils_1.hashPassword)(password);
            const user = new user_1.User({ username, password: hashedPassword });
            return this.userRepository.create(user);
        });
    }
    login(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.userRepository.findByUsername(username);
            if (!user)
                throw new Error("User not found");
            const isValid = yield (0, password_utils_1.verifyPassword)(password, user.password);
            if (!isValid)
                throw new Error("Invalid password");
            return (0, jwt_utils_1.generateToken)({ id: user.id, username: user.username });
        });
    }
}
exports.AuthService = AuthService;
