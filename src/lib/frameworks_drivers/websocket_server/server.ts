import {App, TemplatedApp} from "uWebSockets.js";
import {createMessage, Message, validateMessage} from "./message";
import {eventProcessor} from "./event_processor"
import {AuthenticateUserWS, ChangeUserStatus} from "../../interface_adapters/controllers/WebsocketUserStatusController";

export default class uWsServer {
    public app: TemplatedApp;
    decoder = new TextDecoder("utf-8");

    constructor() {
        this.app = App();
        this.app.ws("/*", {
            /* Options */
            compression: 0,//0 - disabled | 1 - Shared Compressor | 2 - Dedicated Compressor
            maxPayloadLength: 16 * 1024 * 1024,
            idleTimeout: 30,
            /* Handlers */
            open: (ws, req) => {
                AuthenticateUserWS(ws,req)
            },
            message: (ws, data, isBinary) => {
                const message = JSON.parse(this.decoder.decode(data)) as Message;
                if (message && validateMessage(message)) {
                    eventProcessor.processEvent(ws, message.event, message)
                } else {
                    ws.send(createMessage({success: false, error: "invalid body"}, 'InvalidMessage',"Failed").toString())
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
        eventProcessor.addEventHandler(ChangeUserStatus)
    }

    registerRoutes() {
        this.app.any('/*', (res, req) => {
            res.end('Nothing to see here!');
        });
    }

    listen(port: number) {
        this.app.listen(port, (token) => {
            if (token) {
                console.log('Listening to port ' + port);
            } else {
                console.log('Failed to listen to port ' + port);
            }
        })
    }
}