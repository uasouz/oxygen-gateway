"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserSignUpController_1 = require("../../interface_adapters/controllers/UserSignUpController");
const user_signup = express_1.Router();
user_signup.post("/signup", UserSignUpController_1.registerUser);
exports.default = user_signup;
//# sourceMappingURL=user_signup.js.map