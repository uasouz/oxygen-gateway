import {User} from "../../enterprise_business_rules/models/User";

export interface IUserRepository {
    CountUsers(): Promise<number>
    CountUserWithParams(params: any): Promise<number>
    FindUserWithParams(params: any): Promise<User | null>
    AddNewUser(user: { password: any; phone: string; email: string; username: string }): Promise<User>
}