"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
function CreateUser(userRegistration) {
    return {
        email: userRegistration.email,
        username: userRegistration.username,
        phone: userRegistration.phone,
        password: bcrypt.hashSync(userRegistration.password, 10)
    };
}
exports.CreateUser = CreateUser;
//# sourceMappingURL=CreateUser.js.map