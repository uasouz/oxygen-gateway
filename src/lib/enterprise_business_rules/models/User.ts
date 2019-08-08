import {fromBinaryUUID} from "../../util/binary-uuid/binary-uuid";

export class User {
    public id?: number;
    public uuid!: string;
    public username!: string;
    public password!: string;
    public email!: string;
    public phone!: string;
    public bio?: string;
    public type?: string;
    public active?: number;
    public photo?: string;
    public status?: number;


    private static serializeSingleUser(user: any) {
        return {
            id: user.id,
            email: user.email,
            uuid: fromBinaryUUID(user.uuid),
            password: user.password,
            phone: user.phone,
            username: user.username,
            bio: user.bio,
            type: user.type,
            active: user.active,
            photo: user.photo,
            status: user.status
        };
    }

    static serialize(data: object) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(this.serializeSingleUser)[0];
        }
        return this.serializeSingleUser(data)
    }
}