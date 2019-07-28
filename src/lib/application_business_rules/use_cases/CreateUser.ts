import * as bcrypt from "bcrypt";
import {UserRegistration} from "./ValidateUserSignUp";


export function CreateUser(userRegistration: UserRegistration) {
    return {
        email: userRegistration.email,
        username: userRegistration.username,
        phone: userRegistration.phone,
        password: bcrypt.hashSync(userRegistration.password,10)
    }
}