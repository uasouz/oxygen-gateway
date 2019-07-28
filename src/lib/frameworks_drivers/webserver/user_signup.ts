import {Router} from "express";
import {registerUser} from "../../interface_adapters/controllers/UserSignUpController";

const user_signup = Router();

user_signup.post("/signup",registerUser);

export default user_signup;