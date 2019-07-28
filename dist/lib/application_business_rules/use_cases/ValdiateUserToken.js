"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const logger_1 = require("../../frameworks_drivers/logger");
const { JWT, JWK } = require('@panva/jose');
const key = JWK.asKey(fs.readFileSync('key.pem'));
function ValidateUserToken(token) {
    if (!token) {
        return { isValid: false, error: { name: "JWTCantBeNull",
                "code": "ERR_JWT_IS_NULL",
                "level": "error" }, data: null };
    }
    logger_1.Logger.info(token);
    try {
        const verified = JWT.verify(token, key, {
            audience: 'urn:oxygen:client',
            issuer: 'https://gtw.oxygen.com',
            clockTolerance: '1 min'
        });
        return { isValid: true, error: null, data: verified };
    }
    catch (e) {
        return { isValid: false, error: e, data: null };
    }
}
exports.ValidateUserToken = ValidateUserToken;
//# sourceMappingURL=ValdiateUserToken.js.map