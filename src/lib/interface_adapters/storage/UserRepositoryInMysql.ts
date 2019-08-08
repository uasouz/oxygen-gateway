import {IUserRepository} from "../../application_business_rules/repositories/UserRepository";
import database from "../../frameworks_drivers/database";
import {User} from "../../enterprise_business_rules/models/User";

class UserRepositoryInMysql implements IUserRepository {
    async CountUsers() {
        const result = await database('users').count<Record<string, { count: number }>>({count: '*'});
        return result[0].count
    }

    async CountUserWithParams(params: any) {
        const result = await database('users').where(params).count<Record<string, { count: number }>>({count: '*'});
        return result[0].count
    }


    //Pass array for or conditions
    async FindUserWithParams(params: any) {
        let result = database('users');
        if (Array.isArray(params)) {
            params.forEach((value) => {
                result = result.orWhere(value)
            })
        } else {
            result = result.where(params)
        }
        return User.serialize(await result)
    }

    async AddNewUser(user: { password: any; phone: string; email: string; username: string }) {
        const result = await database('users').insert(user, ["*"]);
        return User.serialize(this.FindUserWithParams({id: result[0]}))
    }

}

export const userRepository = new UserRepositoryInMysql();