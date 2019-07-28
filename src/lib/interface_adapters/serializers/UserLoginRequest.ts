import {IUserLoginRequest} from "../../application_business_rules/use_cases/UserAuthentication";

export class UserLoginRequest implements IUserLoginRequest{
    email: string;
    password: string;
    username: string;

    constructor(email: string,password: string,username: string){
        this.email = email;
        this.password = password;
        this.username = username;
    }


    private static serializeSingle(user: any){
        return new this(user.email,user.password,user.username);
    }

    static serialize(data: object){
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(this.serializeSingle)[0];
        }
        return this.serializeSingle(data)
    }

}