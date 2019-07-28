"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserLoginRequest {
    constructor(email, password, username) {
        this.email = email;
        this.password = password;
        this.username = username;
    }
    static serializeSingle(user) {
        return new this(user.email, user.password, user.username);
    }
    static serialize(data) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(this.serializeSingle)[0];
        }
        return this.serializeSingle(data);
    }
}
exports.UserLoginRequest = UserLoginRequest;
//# sourceMappingURL=UserLoginRequest.js.map