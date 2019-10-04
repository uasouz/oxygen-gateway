import {HttpRequest, WebSocket} from "uWebSockets.js";
import {createMessage, Message} from "../../frameworks_drivers/websocket_server/message";
import {Logger} from "../../frameworks_drivers/logger";
import * as querystring from "querystring"
import {ValidateUserToken} from "../../application_business_rules/use_cases/ValdiateUserToken";
import {RedisService} from "../../frameworks_drivers/redis/client";
import {UserStatus} from "../../enterprise_business_rules/models/UserStatus";
import {ValidateUserStatus} from "../../application_business_rules/use_cases/ValidateUserStatus";
import {Events} from "../../frameworks_drivers/websocket_server/events";

function getTokenFromQueryString(query: string) {
    const queryValues = querystring.parse(query);
    if (queryValues.token != null && queryValues.token != "") {
        return queryValues.token.toString()
    }
    return null
}

//Authenticate user on websocket server
export function Identify(ws: WebSocket, request: HttpRequest) {
    const JWTVerify = ValidateUserToken(getTokenFromQueryString(request.getQuery()));
    if (!JWTVerify.isValid) {
        ws.send(createMessage(JWTVerify.error, Events.InvalidSession, "Failed").toString());
        ws.close();
        return {isValid: false, data: null}
    }
    RedisService.redis.set(JWTVerify.data.sub, JSON.stringify({status: UserStatus.ONLINE}));
    ws.send(createMessage(null, Events.Hello).toString(),);
    return {isValid: true, data: JWTVerify.data}
}

export function SetUserStatusOffline(ws:WebSocket){
    RedisService.redis.set(ws.userData.sub, JSON.stringify({status: UserStatus.OFFLINE}))
}

//Set user status at Gateway
export function UpdateStatus(ws: WebSocket, message: Message) {
    if(ValidateUserStatus(message.data.status)) {
        RedisService.redis.set(ws.userData.sub, JSON.stringify({status: message.data.status})).then((result) => {
            if (result == "OK") {
                ws.send(createMessage({message: "Changing User Status to " + UserStatus[message.data.status]}, Events.PresenceUpdate).toString())
            } else {
                ws.send(createMessage({message: "Failed to change user status"}, Events.PresenceUpdate, "Failed").toString())
            }
        });
    } else {
        ws.send(createMessage({message: "Invalid Status"}, Events.PresenceUpdate, "Failed").toString())
    }
}

export function UpdateVoiceStatus(ws: WebSocket, message: Message) {

}

export function GetUserGuilds(ws: WebSocket, message: Message){

}

export function RequestGuildMembers(ws: WebSocket, message: Message) {

}

export function GetGuildChannels(ws: WebSocket,message: Message) {

}