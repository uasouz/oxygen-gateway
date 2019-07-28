"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserAuthenticationController_1 = require("../../interface_adapters/controllers/UserAuthenticationController");
const user_authentication = express_1.Router();
user_authentication.post("/login", UserAuthenticationController_1.login);
exports.default = user_authentication;
//# sourceMappingURL=user_authentication.js.map