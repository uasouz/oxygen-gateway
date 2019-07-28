import {Request, Response} from "express";
import {BaseResponse} from "../util/response";
import {
    UserAuthentication
} from "../../application_business_rules/use_cases/UserAuthentication";
import {userRepository} from "../storage/UserRepositoryInMysql";
import {UserLoginRequest} from "../serializers/UserLoginRequest";

export async function login(req: Request, res: Response) {
    const userLoginRequet = UserLoginRequest.serialize(req.body);
    const userAuthentication = await UserAuthentication(userLoginRequet, userRepository);
    if (!userAuthentication.authenticated) {
        return BaseResponse.Fail(res, userAuthentication.errors)
    }
    return BaseResponse.Succeed(res, {token: userAuthentication.token})
}