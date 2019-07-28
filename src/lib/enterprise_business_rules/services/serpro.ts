import {ApiClient} from "../util/api_caller/apiCaller";

const SERPRO_KEY = "";

const requestSerproToken = (client: any) => {
    return client.callAPI("POST", "/token", "grant_type=client_credentials",
        {
            "Authorization": "Basic " + SERPRO_KEY,
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        })
};

const serproClient = new ApiClient("https://apigateway.serpro.gov.br", true, requestSerproToken);

export function getDocumentAtSerpro(document: string) {
    return serproClient.callAPI("GET","/consulta-cpf/v1/cpf/"+document)
}