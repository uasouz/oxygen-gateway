import {User} from "../../enterprise_business_rules/models/User";
import {Either} from "monet";

export interface IUserRepository {
    CountUsers(): Promise<number>
    CountUserWithParams(params: any): Promise<number>
    FindUserWithParams(params: any): Promise<Either<any,User>>
    AddNewUser(user: { password: any; phone: string; email: string; username: string }): Promise<Either<any,User>>
}