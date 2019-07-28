import {Request, Response} from "express";
import {BaseResponse} from "../util/response";
import {
    UserAuthentication
} from "../../application_business_rules/use_cases/UserAuthentication";
import {userRepository} from "../storage/UserRepositoryInMysql";

export async function login(req: Request, res: Response) {
    const userAuthentication = await UserAuthentication(req.body,userRepository);
    if(!userAuthentication.authenticated){
        return BaseResponse.Fail(res,userAuthentication.errors)
    }
    return BaseResponse.Succeed(res, {token: userAuthentication.token})
}