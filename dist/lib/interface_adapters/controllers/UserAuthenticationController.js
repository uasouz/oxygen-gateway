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
const UserLoginRequest_1 = require("../serializers/UserLoginRequest");
function login(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userLoginRequet = UserLoginRequest_1.UserLoginRequest.serialize(req.body);
        const userAuthentication = yield UserAuthentication_1.UserAuthentication(userLoginRequet, UserRepositoryInMysql_1.userRepository);
        userAuthentication.cata(err => () => {
            response_1.BaseResponse.Fail(res, err.errors);
        }, authentication => () => {
            // @ts-ignore
            return response_1.BaseResponse.Succeed(res, { token: authentication.token });
        })();
    });
}
exports.login = login;
//# sourceMappingURL=UserAuthenticationController.js.map