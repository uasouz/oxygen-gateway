import * as bcrypt from "bcrypt";
import {IUserRegistration} from "./ValidateUserSignUp";
import {createBinaryUUID} from "../../util/binary-uuid/binary-uuid";

export function CreateUser(userRegistration: IUserRegistration) {
    return {
        uuid: createBinaryUUID().buffer,
        email: userRegistration.email,
        username: userRegistration.username,
        phone: userRegistration.phone,
        password: bcrypt.hashSync(userRegistration.password,10)
    }
}