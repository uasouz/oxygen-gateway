"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiCaller_1 = require("../util/api_caller/apiCaller");
const ZENVIA_KEY = "="; // process.env.ZENVIA_KEY;
const header = {
    "Authorization": "Basic " + ZENVIA_KEY,
    "Content-Type": "application/json",
    "Accept": "application/json"
};
const zenviaClient = new apiCaller_1.ApiClient("https://api-rest.zenvia360.com.br/services");
function sendSMS(request) {
    return zenviaClient.callAPI("POST", "/send-sms", JSON.stringify(request), header);
}
exports.sendSMS = sendSMS;
//# sourceMappingURL=zenvia.js.map