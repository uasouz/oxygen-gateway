import {HttpRequest, WebSocket} from "uWebSockets.js";
import {createMessage, Message} from "../../frameworks_drivers/websocket_server/message";
import {Logger} from "../../frameworks_drivers/logger";
import * as querystring from "querystring"
import {ValidateUserToken} from "../../application_business_rules/use_cases/ValdiateUserToken";
import {RedisService} from "../../frameworks_drivers/redis/client";
import {UserStatus} from "../../enterprise_business_rules/models/UserStatus";
import {ValidateUserStatus} from "../../application_business_rules/use_cases/ValidateUserStatus";

function getTokenFromQueryString(query: string) {
    const queryValues = querystring.parse(query);
    if (queryValues.token != null && queryValues.token != "") {
        return queryValues.token.toString()
    }
    return null
}

//Authenticate user on websocket server
export function AuthenticateUserWS(ws: WebSocket, request: HttpRequest) {
    const JWTVerify = ValidateUserToken(getTokenFromQueryString(request.getQuery()));
    if (!JWTVerify.isValid) {
        ws.send(createMessage(JWTVerify.error, "FailedAuthentication", "Failed").toString());
        ws.close();
        return {isValid: false, data: null}
    }
    RedisService.redis.set(JWTVerify.data.sub, JSON.stringify({status: UserStatus.ONLINE}));
    ws.send(createMessage(null, "Welcome").toString());
    return {isValid: true, data: JWTVerify.data}
}

export function SetUserStatusOffline(ws:WebSocket){
    RedisService.redis.set(ws.userData.sub, JSON.stringify({status: UserStatus.OFFLINE}))
}

//Set user status at Gateway
export function ChangeUserStatus(ws: WebSocket, message: Message) {
    if(ValidateUserStatus(message.data.status)) {
        RedisService.redis.set(ws.userData.sub, JSON.stringify({status: message.data.status})).then((result) => {
            if (result == "OK") {
                ws.send(createMessage({message: "Changing User Status to " + UserStatus[message.data.status]}, message.event).toString())
            } else {
                ws.send(createMessage({message: "Failed to change user status"}, message.event, "Failed").toString())
            }
        });
    } else {
        ws.send(createMessage({message: "Invalid Status"}, message.event, "Failed").toString())
    }
}

export function GetUserGuilds(ws: WebSocket, message: Message){

}

export function GetGuildChannels(ws: WebSocket,message: Message) {

}