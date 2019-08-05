import {IUserRepository} from "../repositories/UserRepository";
import {pipeP,when} from "ramda";
import {getError} from "../../enterprise_business_rules/util/errors";

const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

const validateEmail = (email: string) => {
    const validationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return validationRegex.test(email)
};

const formatName = (name: string) => {
    const personNames = name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).split(" ");
    return personNames[0] + " " + personNames[personNames.length - 1];
};

function validatePhone(telefone: string) {
    try {
        const number = phoneUtil.parseAndKeepRawInput(telefone, 'BR');
        return phoneUtil.isValidNumber(number)
    }catch (e) {
        return false
    }
}

//Interfaces
export interface IUserRegistration {
    username: string;
    email: string;
    phone: string;
    password: string;
}

interface UserValidationPayload {
    userRegistration: IUserRegistration,
    errors: string[],
    userRepository: IUserRepository
}

/*
Validates the informed email address
 */
async function emailAbleToRegister({userRegistration, errors, userRepository}: UserValidationPayload) {
    if (!validateEmail(userRegistration.email)) {
        return {
            userRegistration,
            errors: [...errors, getError("SGP-001")], userRepository
        }
    }
    const countMail = await userRepository.CountUserWithParams({email: userRegistration.email});
    return countMail > 0 ? {
        userRegistration,
        errors: [...errors, getError("SGP-002")], userRepository
    } : {userRegistration, errors, userRepository};
}

async function validateCellphone({userRegistration, errors, userRepository}: UserValidationPayload) {
    if (!validatePhone(userRegistration.phone)) {
        return {
            userRegistration,
            errors: [...errors, getError("SGP-003")], userRepository
        }
    }
    const countPhone = await userRepository.CountUserWithParams({phone: userRegistration.phone});
    return countPhone > 0 ? {
        userRegistration,
        errors: [...errors, getError("SGP-004")], userRepository
    } : {userRegistration, errors, userRepository};
}

const userValidator = pipeP(emailAbleToRegister, validateCellphone);



export async function ValidateUserSignUp({userRegistration, errors, userRepository}: UserValidationPayload) {
    const userValidation = await userValidator({userRegistration, errors, userRepository});
    if (userValidation.errors.length > 0) {
        return {isValid: false , errors: userValidation.errors}
    }
    return {isValid: true , errors: userValidation.errors}
}