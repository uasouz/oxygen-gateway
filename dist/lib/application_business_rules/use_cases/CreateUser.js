"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const binary_uuid_1 = require("../../util/binary-uuid/binary-uuid");
function CreateUser(userRegistration) {
    return {
        uuid: binary_uuid_1.createBinaryUUID().buffer,
        email: userRegistration.email,
        username: userRegistration.username,
        phone: userRegistration.phone,
        password: bcrypt.hashSync(userRegistration.password, 10)
    };
}
exports.CreateUser = CreateUser;
//# sourceMappingURL=CreateUser.js.map