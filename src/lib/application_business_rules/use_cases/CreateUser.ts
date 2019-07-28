import * as bcrypt from "bcrypt";
import {IUserRegistration} from "./ValidateUserSignUp";

export function CreateUser(userRegistration: IUserRegistration) {
    return {
        email: userRegistration.email,
        username: userRegistration.username,
        phone: userRegistration.phone,
        password: bcrypt.hashSync(userRegistration.password,10)
    }
}