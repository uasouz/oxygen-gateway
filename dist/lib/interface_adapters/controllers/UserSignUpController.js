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
const ValidateUserSignUp_1 = require("../../application_business_rules/use_cases/ValidateUserSignUp");
const CreateUser_1 = require("../../application_business_rules/use_cases/CreateUser");
const UserRepositoryInMysql_1 = require("../storage/UserRepositoryInMysql");
const UserRegistration_1 = require("../serializers/UserRegistration");
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userRegistration = UserRegistration_1.UserRegistration.serialize(req.body);
        const userValidation = yield ValidateUserSignUp_1.ValidateUserSignUp({ userRegistration, errors: [], userRepository: UserRepositoryInMysql_1.userRepository });
        if (!userValidation.isValid) {
            return response_1.BaseResponse.Fail(res, userValidation.errors);
        }
        yield UserRepositoryInMysql_1.userRepository.AddNewUser(CreateUser_1.CreateUser(userRegistration));
        return response_1.BaseResponse.Succeed(res, {});
    });
}
exports.registerUser = registerUser;
//# sourceMappingURL=UserSignUpController.js.map