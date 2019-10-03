"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../../frameworks_drivers/websocket_server/message");
const querystring = require("querystring");
const ValdiateUserToken_1 = require("../../application_business_rules/use_cases/ValdiateUserToken");
const client_1 = require("../../frameworks_drivers/redis/client");
const UserStatus_1 = require("../../enterprise_business_rules/models/UserStatus");
const ValidateUserStatus_1 = require("../../application_business_rules/use_cases/ValidateUserStatus");
function getTokenFromQueryString(query) {
    const queryValues = querystring.parse(query);
    if (queryValues.token != null && queryValues.token != "") {
        return queryValues.token.toString();
    }
    return null;
}
//Authenticate user on websocket server
function AuthenticateUserWS(ws, request) {
    const JWTVerify = ValdiateUserToken_1.ValidateUserToken(getTokenFromQueryString(request.getQuery()));
    if (!JWTVerify.isValid) {
        ws.send(message_1.createMessage(JWTVerify.error, "FailedAuthentication", "Failed").toString());
        ws.close();
        return { isValid: false, data: null };
    }
    client_1.RedisService.redis.set(JWTVerify.data.sub, JSON.stringify({ status: UserStatus_1.UserStatus.ONLINE }));
    ws.send(message_1.createMessage(null, "Welcome").toString());
    return { isValid: true, data: JWTVerify.data };
}
exports.AuthenticateUserWS = AuthenticateUserWS;
function SetUserStatusOffline(ws) {
    client_1.RedisService.redis.set(ws.userData.sub, JSON.stringify({ status: UserStatus_1.UserStatus.OFFLINE }));
}
exports.SetUserStatusOffline = SetUserStatusOffline;
//Set user status at Gateway
function ChangeUserStatus(ws, message) {
    if (ValidateUserStatus_1.ValidateUserStatus(message.data.status)) {
        client_1.RedisService.redis.set(ws.userData.sub, JSON.stringify({ status: message.data.status })).then((result) => {
            if (result == "OK") {
                ws.send(message_1.createMessage({ message: "Changing User Status to " + UserStatus_1.UserStatus[message.data.status] }, message.event).toString());
            }
            else {
                ws.send(message_1.createMessage({ message: "Failed to change user status" }, message.event, "Failed").toString());
            }
        });
    }
    else {
        ws.send(message_1.createMessage({ message: "Invalid Status" }, message.event, "Failed").toString());
    }
}
exports.ChangeUserStatus = ChangeUserStatus;
function GetUserGuilds(ws, message) {
}
exports.GetUserGuilds = GetUserGuilds;
function GetGuildChannels(ws, message) {
}
exports.GetGuildChannels = GetGuildChannels;
//# sourceMappingURL=WebsocketUserStatusController.js.map