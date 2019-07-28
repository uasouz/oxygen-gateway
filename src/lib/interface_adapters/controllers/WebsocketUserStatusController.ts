import {HttpRequest, WebSocket} from "uWebSockets.js";
import {createMessage, Message} from "../../frameworks_drivers/websocket_server/message";
import {Logger} from "../../frameworks_drivers/logger";
import * as querystring from "querystring"
import {ValidateUserToken} from "../../application_business_rules/use_cases/ValdiateUserToken";

function getTokenFromQueryString(query: string) {
    const queryValues = querystring.parse(query);
    if (queryValues.token != null && queryValues.token != "") {
            return queryValues.token.toString()
    }
    return null
}

export function AuthenticateUserWS(ws: WebSocket, request: HttpRequest) {
    const JWTVerify = ValidateUserToken(getTokenFromQueryString(request.getQuery()));
    if(!JWTVerify.isValid){
        ws.send(createMessage(JWTVerify.error,"FailedAuthentication","Falied").toString());
        ws.close();
        return false
    }
    ws.send(createMessage(null, "Welcome").toString())
    return true
}

export function ChangeUserStatus(ws: WebSocket, message: Message) {
    Logger.info("Changing User Status");
    ws.send(createMessage({message: "Changing User Status"}, message.event).toString())
}