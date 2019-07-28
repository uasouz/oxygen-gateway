import {BaseResponse} from "../util/response";
import {Request, Response} from "express";
import { ValidateUserSignUp
} from "../../application_business_rules/use_cases/ValidateUserSignUp";
import {CreateUser} from "../../application_business_rules/use_cases/CreateUser";
import {userRepository} from "../storage/UserRepositoryInMysql";
import {UserRegistration} from "../serializers/UserRegistration";

export async function registerUser(req: Request, res: Response) {
    const userRegistration = UserRegistration.serialize(req.body);
    const userValidation = await ValidateUserSignUp({userRegistration, errors: [], userRepository});
    if(!userValidation.isValid){
        return BaseResponse.Fail(res, userValidation.errors)
    }
    await userRepository.AddNewUser(CreateUser(userRegistration));
    return BaseResponse.Succeed(res, {})
}