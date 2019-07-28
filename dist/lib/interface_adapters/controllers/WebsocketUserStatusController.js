"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../../frameworks_drivers/websocket_server/message");
const logger_1 = require("../../frameworks_drivers/logger");
function ChangeUserStatus(ws, message) {
    logger_1.Logger.info("Changing User Status");
    ws.send(message_1.createMessage(null, message.event).toString());
}
exports.ChangeUserStatus = ChangeUserStatus;
//# sourceMappingURL=WebsocketUserStatusController.js.map