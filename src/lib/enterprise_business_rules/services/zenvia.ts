import {ApiClient} from "../util/api_caller/apiCaller";

const ZENVIA_KEY = "=";// process.env.ZENVIA_KEY;

const header = {
    "Authorization": "Basic " + ZENVIA_KEY,
    "Content-Type": "application/json",
    "Accept": "application/json"
};

const zenviaClient = new ApiClient("https://api-rest.zenvia360.com.br/services");

export function sendSMS(request: object) {
    return zenviaClient.callAPI("POST","/send-sms",JSON.stringify(request),header)
}