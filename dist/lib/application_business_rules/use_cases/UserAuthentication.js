"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const bcrypt = require("bcrypt");
const errors_1 = require("../../enterprise_business_rules/util/errors");
const { JWT, JWK } = require('@panva/jose');
// const jose = require('@panva/jose');
// const {
//     JWE,   // JSON Web Encryption (JWE)
//     JWK,   // JSON Web Key (JWK)
//     JWKS,  // JSON Web Key Set (JWKS)
//     JWS,   // JSON Web Signature (JWS)
//     JWT,   // JSON Web Token (JWT)
//     errors // errors utilized by @panva/jose
// } = jose;
const key = JWK.asKey(fs.readFileSync('key.pem'));
function validateUserPassword(password, hash) {
    return bcrypt.compareSync(password, hash);
}
function generateToken(user) {
    const payload = {};
    return JWT.sign(payload, key, {
        audience: ['urn:oxygen:client'],
        issuer: 'https://gtw.oxygen.com',
        expiresIn: '10 hours',
        header: {
            typ: 'JWT'
        },
        subject: user.id.toString()
    });
}
function UserAuthentication(userLoginRequest, userRepository) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository.FindUserWithParams([{ email: userLoginRequest.email }, { username: userLoginRequest.username }]);
        if (!user) {
            return { authenticated: false, token: null, errors: [errors_1.getError("AUTH-001")] };
        }
        if (!validateUserPassword(userLoginRequest.password, user.password)) {
            return { authenticated: false, token: null, errors: [errors_1.getError("AUTH-002")] };
        }
        const token = generateToken(user);
        return { authenticated: true, token, errors: [] };
    });
}
exports.UserAuthentication = UserAuthentication;
//# sourceMappingURL=UserAuthentication.js.map