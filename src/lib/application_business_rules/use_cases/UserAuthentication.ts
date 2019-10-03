import * as fs from "fs";
import * as bcrypt from "bcrypt";
import {IUserRepository} from "../repositories/UserRepository";
import {getError} from "../../enterprise_business_rules/util/errors";
import {User} from "../../enterprise_business_rules/models/User";
import {Either, Left, Right} from "monet";
import {Logger} from "../../frameworks_drivers/logger";

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

function generateToken(user: User): Either<Error, string> {
    const payload = {
        uuid: user.uuid
    };
    try {
        return Right(JWT.sign(payload, key, {
            audience: ['urn:oxygen:client'],
            issuer: 'https://gtw.oxygen.com',
            expiresIn: '10 days',
            header: {
                typ: 'JWT'
            },
            subject: user!!.id!!.toString()
        }));
    } catch (e) {
        return Left(e)
    }
}

export interface IUserLoginRequest {
    username?: string;
    email?: string;
    password: string;
}

export async function UserAuthentication(userLoginRequest: IUserLoginRequest, userRepository: IUserRepository) {
    const user = await userRepository.FindUserWithParams([{email: userLoginRequest.email}, {username: userLoginRequest.username}]);
    return user
        .flatMap<User>(userData => userData ? Right(userData as User) : Left({
            authenticated: false,
            token: null,
            errors: [getError("AUTH-001")]
        }))
        .flatMap<User>((data) => {
                return validateUserPassword(userLoginRequest.password, data.password) ?
                    Right(data) :
                    Left({authenticated: false, token: null, errors: [getError("AUTH-002")]})
            })
        .flatMap((data: User) => {
            return generateToken(data)
        })
        .flatMap((token: string) => {
            return token ? Right({authenticated: true, token, errors: []}) : Left(new Error("Null Token"))
        });
}