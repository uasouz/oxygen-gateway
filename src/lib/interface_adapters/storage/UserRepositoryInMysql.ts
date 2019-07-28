import {User} from "../../frameworks_drivers/database/users";
import {IUserRepository} from "../../application_business_rules/repositories/UserRepository";

class UserRepositoryInMysql implements IUserRepository{
    async CountUsers() {
        return User.count();
    }

    async CountUserWithParams(params: any) {
        return User.count({where: params});
    }

    async FindUserWithParams(params: any) {
        return User.findOne({where: params});
    }

    async AddNewUser(user: { password: any; phone: string; email: string; username: string }) {
        return User.create(user)
    }

}

export const userRepository = new UserRepositoryInMysql();