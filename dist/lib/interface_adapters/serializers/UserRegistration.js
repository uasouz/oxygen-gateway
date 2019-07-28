"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserRegistration {
    constructor(email, password, phone, username) {
        this.email = email;
        this.password = password;
        this.phone = phone;
        this.username = username;
    }
    static serializeSingleUser(user) {
        return new this(user.email, user.password, user.phone, user.username);
    }
    static serialize(data) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(this.serializeSingleUser)[0];
        }
        return this.serializeSingleUser(data);
    }
    static serializeAll(data) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(this.serializeSingleUser);
        }
        return [];
    }
}
exports.UserRegistration = UserRegistration;
//# sourceMappingURL=UserRegistration.js.map