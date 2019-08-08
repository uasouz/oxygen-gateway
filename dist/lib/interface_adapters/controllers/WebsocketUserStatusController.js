"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../../frameworks_drivers/websocket_server/message");
const logger_1 = require("../../frameworks_drivers/logger");
const querystring = require("querystring");
const ValdiateUserToken_1 = require("../../application_business_rules/use_cases/ValdiateUserToken");
const client_1 = require("../../frameworks_drivers/redis/client");
function getTokenFromQueryString(query) {
    const queryValues = querystring.parse(query);
    if (queryValues.token != null && queryValues.token != "") {
        return queryValues.token.toString();
    }
    return null;
}
function AuthenticateUserWS(ws, request) {
    const JWTVerify = ValdiateUserToken_1.ValidateUserToken(getTokenFromQueryString(request.getQuery()));
    if (!JWTVerify.isValid) {
        ws.send(message_1.createMessage(JWTVerify.error, "FailedAuthentication", "Falied").toString());
        ws.close();
        return false;
    }
    client_1.RedisService.redis.set(JWTVerify.data.sub, JSON.stringify({ status: "ONLINE" }));
    ws.send(message_1.createMessage(null, "Welcome").toString());
    return true;
}
exports.AuthenticateUserWS = AuthenticateUserWS;
function ChangeUserStatus(ws, message) {
    logger_1.Logger.info("Changing User Status");
    ws.send(message_1.createMessage({ message: "Changing User Status" }, message.event).toString());
}
exports.ChangeUserStatus = ChangeUserStatus;
//# sourceMappingURL=WebsocketUserStatusController.js.map