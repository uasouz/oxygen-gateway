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
const database_1 = require("../../frameworks_drivers/database");
const User_1 = require("../../enterprise_business_rules/models/User");
class UserRepositoryInMysql {
    CountUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default('users').count({ count: '*' });
            return result[0].count;
        });
    }
    CountUserWithParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default('users').where(params).count({ count: '*' });
            return result[0].count;
        });
    }
    //Pass array for or conditions
    FindUserWithParams(params) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = database_1.default('users');
            if (Array.isArray(params)) {
                params.forEach((value) => {
                    result = result.orWhere(value);
                });
            }
            else {
                result = result.where(params);
            }
            return User_1.User.serialize(yield result);
        });
    }
    AddNewUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield database_1.default('users').insert(user, ["*"]);
            return User_1.User.serialize(this.FindUserWithParams({ id: result[0] }));
        });
    }
}
exports.userRepository = new UserRepositoryInMysql();
//# sourceMappingURL=UserRepositoryInMysql.js.map