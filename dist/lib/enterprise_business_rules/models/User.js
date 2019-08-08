"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const binary_uuid_1 = require("../../util/binary-uuid/binary-uuid");
class User {
    static serializeSingleUser(user) {
        return {
            id: user.id,
            email: user.email,
            uuid: binary_uuid_1.fromBinaryUUID(user.uuid),
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
    static serialize(data) {
        if (!data) {
            throw new Error('Expect data to be not undefined nor null');
        }
        if (Array.isArray(data)) {
            return data.map(this.serializeSingleUser)[0];
        }
        return this.serializeSingleUser(data);
    }
}
exports.User = User;
//# sourceMappingURL=User.js.map