import {IUserRegistration} from "../../application_business_rules/use_cases/ValidateUserSignUp";

export class UserRegistration implements IUserRegistration {
    email: string;
    password: string;
    phone: string;
    username: string;

    constructor(email: string,password: string,phone: string,username: string){
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.username = username;
    }

    private static serializeSingleUser(user: any){
        return new this(user.email,user.password,user.phone,user.username);
    }

    static serialize(data: object){
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(this.serializeSingleUser)[0];
        }
        return this.serializeSingleUser(data)
    }

    static serializeAll(data: object[]){
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(this.serializeSingleUser);
        }
        return []
    }

}