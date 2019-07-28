"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uWebSockets_js_1 = require("uWebSockets.js");
const message_1 = require("./message");
const event_processor_1 = require("./event_processor");
const WebsocketUserStatusController_1 = require("../../interface_adapters/controllers/WebsocketUserStatusController");
class uWsServer {
    constructor() {
        this.decoder = new TextDecoder("utf-8");
        this.app = uWebSockets_js_1.App();
        this.app.ws("/*", {
            /* Options */
            compression: 0,
            maxPayloadLength: 16 * 1024 * 1024,
            idleTimeout: 30,
            /* Handlers */
            open: (ws, req) => {
                WebsocketUserStatusController_1.AuthenticateUserWS(ws, req);
            },
            message: (ws, data, isBinary) => {
                const message = JSON.parse(this.decoder.decode(data));
                if (message && message_1.validateMessage(message)) {
                    event_processor_1.eventProcessor.processEvent(ws, message.event, message);
                }
                else {
                    ws.send(message_1.createMessage({ success: false, error: "invalid body" }, 'InvalidMessage', "Failed").toString());
                }
            },
            drain: (ws) => {
                console.log('WebSocket backpressure: ' + ws.getBufferedAmount());
            },
            close: (ws, code, message) => {
                console.log('WebSocket closed');
            }
        });
    }
    initializeHandlers() {
        event_processor_1.eventProcessor.addEventHandler(WebsocketUserStatusController_1.ChangeUserStatus);
    }
    registerRoutes() {
        this.app.any('/*', (res, req) => {
            res.end('Nothing to see here!');
        });
    }
    listen(port) {
        this.app.listen(port, (token) => {
            if (token) {
                console.log('Listening to port ' + port);
            }
            else {
                console.log('Failed to listen to port ' + port);
            }
        });
    }
}
exports.default = uWsServer;
//# sourceMappingURL=server.js.map