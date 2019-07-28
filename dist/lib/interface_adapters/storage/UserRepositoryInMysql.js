"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("../../frameworks_drivers/database/users");
class UserRepositoryInMysql {
    CountUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return users_1.User.count();
        });
    }
    CountUserWithParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_1.User.count({ where: params });
        });
    }
    FindUserWithParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_1.User.findOne({ where: params });
        });
    }
    AddNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return users_1.User.create(user);
        });
    }
}
exports.userRepository = new UserRepositoryInMysql();
//# sourceMappingURL=UserRepositoryInMysql.js.map