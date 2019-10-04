"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserStatus_1 = require("../../enterprise_business_rules/models/UserStatus");
function ValidateUserStatus(statusID) {
    return Object.values(UserStatus_1.UserStatus).includes(statusID);
}
exports.ValidateUserStatus = ValidateUserStatus;
//# sourceMappingURL=ValidateUserStatus.js.map