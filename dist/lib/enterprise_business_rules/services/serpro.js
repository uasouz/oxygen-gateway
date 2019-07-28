"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apiCaller_1 = require("../util/api_caller/apiCaller");
const SERPRO_KEY = "";
const requestSerproToken = (client) => {
    return client.callAPI("POST", "/token", "grant_type=client_credentials", {
        "Authorization": "Basic " + SERPRO_KEY,
        "Accept": "application/json",
        "Content-Type": "application/x-www-form-urlencoded"
    });
};
const serproClient = new apiCaller_1.ApiClient("https://apigateway.serpro.gov.br", true, requestSerproToken);
function getDocumentAtSerpro(document) {
    return serproClient.callAPI("GET", "/consulta-cpf/v1/cpf/" + document);
}
exports.getDocumentAtSerpro = getDocumentAtSerpro;
//# sourceMappingURL=serpro.js.map