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
const response_1 = require("../util/response");
const UserAuthentication_1 = require("../../application_business_rules/use_cases/UserAuthentication");
const UserRepositoryInMysql_1 = require("../storage/UserRepositoryInMysql");
const userRepository = new UserRepositoryInMysql_1.UserRepositoryInMysql();
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // const user = await userRepository.FindUserWithParams({[Op.or]: [{email: req.body.email}, {username: req.body.username}]});
        // if (!user) {
        //     BaseResponse.Fail(res, [getError("AUTH-001")])
        // }
        // if (!validateUserPassword(req.body.password, user!!.password)) {
        //     BaseResponse.Fail(res, [getError("AUTH-002")])
        // }
        // const token = generateToken(user!!);
        const userAuthentication = yield UserAuthentication_1.UserAuthentication(req.body, userRepository);
        if (!userAuthentication.authenticated) {
            return response_1.BaseResponse.Fail(res, userAuthentication.errors);
        }
        return response_1.BaseResponse.Succeed(res, { token: userAuthentication.token });
    });
}
exports.login = login;
//# sourceMappingURL=UserAuthenticationController.js.map