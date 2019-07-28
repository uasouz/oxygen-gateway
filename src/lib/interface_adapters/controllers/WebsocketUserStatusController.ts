import {WebSocket} from "uWebSockets.js";
import {createMessage, Message} from "../../frameworks_drivers/websocket_server/message";
import {Logger} from "../../frameworks_drivers/logger";

export function ChangeUserStatus(ws: WebSocket, message: Message) {
    Logger.info("Changing User Status");
    ws.send(createMessage(null,message.event).toString())
}