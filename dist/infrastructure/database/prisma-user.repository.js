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
exports.PrismaUserRepository = void 0;
const client_1 = require("@prisma/client");
const user_1 = require("../../domain/entities/user");
const prisma = new client_1.PrismaClient();
class PrismaUserRepository {
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const createdUser = yield prisma.user.create({
                data: {
                    username: user.username,
                    password: user.password,
                },
            });
            return new user_1.User(createdUser);
        });
    }
    findByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { username },
            });
            return user ? new user_1.User(user) : null;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma.user.findUnique({
                where: { id },
            });
            return user ? new user_1.User(user) : null;
        });
    }
}
exports.PrismaUserRepository = PrismaUserRepository;
