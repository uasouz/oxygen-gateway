import {Router} from "express";
import {login} from "../../interface_adapters/controllers/UserAuthenticationController";

const user_authentication = Router();

user_authentication.post("/login",login);

export default user_authentication;