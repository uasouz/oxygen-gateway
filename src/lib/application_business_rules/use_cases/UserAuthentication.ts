
import * as fs from "fs";
import * as bcrypt from "bcrypt";
import {IUserRepository} from "../repositories/UserRepository";
import {Op} from "sequelize";
import {getError} from "../../enterprise_business_rules/util/errors";
import {User} from "../../enterprise_business_rules/models/User";

const {JWT, JWK} = require('@panva/jose');
// const jose = require('@panva/jose');
// const {
//     JWE,   // JSON Web Encryption (JWE)
//     JWK,   // JSON Web Key (JWK)
//     JWKS,  // JSON Web Key Set (JWKS)
//     JWS,   // JSON Web Signature (JWS)
//     JWT,   // JSON Web Token (JWT)
//     errors // errors utilized by @panva/jose
// } = jose;

const key = JWK.asKey(fs.readFileSync('key.pem'));


function validateUserPassword(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
}

function generateToken(user: User) {
    const payload = {};
    return JWT.sign(payload, key, {
        audience: ['urn:oxygen:client'],
        issuer: 'https://gtw.oxygen.com',
        expiresIn: '10 hours',
        header: {
            typ: 'JWT'
        },
        subject: user!!.id!!.toString()
    });
}

export interface IUserLoginRequest {
    username?: string;
    email?: string;
    password: string;
}

export async function UserAuthentication(userLoginRequest: IUserLoginRequest,userRepository: IUserRepository) {
    const user = await userRepository.FindUserWithParams({[Op.or]: [{email: userLoginRequest.email}, {username: userLoginRequest.username}]});
    if (!user) {
        return {authenticated: false,token:null, errors: [getError("AUTH-001")]}
    }
    if (!validateUserPassword(userLoginRequest.password, user!!.password)) {
        return {authenticated: false,token:null, errors: [getError("AUTH-002")]}
    }
    const token = generateToken(user!!);
    return {authenticated: true,token, errors: []}
}