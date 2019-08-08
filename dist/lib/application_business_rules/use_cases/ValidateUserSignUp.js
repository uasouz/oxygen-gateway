"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const errors_1 = require("../../enterprise_business_rules/util/errors");
const when_1 = require("../../util/when");
const phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();
const validateEmail = (email) => {
    const validationRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return validationRegex.test(email);
};
const formatName = (name) => {
    const personNames = name.toLowerCase().replace(/\b\w/g, l => l.toUpperCase()).split(" ");
    return personNames[0] + " " + personNames[personNames.length - 1];
};
function validatePhone(telefone) {
    try {
        const number = phoneUtil.parseAndKeepRawInput(telefone, 'BR');
        return phoneUtil.isValidNumber(number);
    }
    catch (e) {
        return false;
    }
}
/*
Validates the informed email address
 */
function emailAbleToRegister({ userRegistration, errors, userRepository }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!validateEmail(userRegistration.email)) {
            return {
                userRegistration,
                errors: [...errors, errors_1.getError("SGP-001")], userRepository
            };
        }
        const countMail = yield userRepository.CountUserWithParams({ email: userRegistration.email });
        return countMail > 0 ? {
            userRegistration,
            errors: [...errors, errors_1.getError("SGP-002")], userRepository
        } : { userRegistration, errors, userRepository };
    });
}
function validateCellphone({ userRegistration, errors, userRepository }) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!validatePhone(userRegistration.phone)) {
            return {
                userRegistration,
                errors: [...errors, errors_1.getError("SGP-003")], userRepository
            };
        }
        const countPhone = yield userRepository.CountUserWithParams({ phone: userRegistration.phone });
        return countPhone > 0 ? {
            userRegistration,
            errors: [...errors, errors_1.getError("SGP-004")], userRepository
        } : { userRegistration, errors, userRepository };
    });
}
const userValidator = ramda_1.pipeP(emailAbleToRegister, validateCellphone);
function ValidateUserSignUp({ userRegistration, errors, userRepository }) {
    return __awaiter(this, void 0, void 0, function* () {
        const userValidation = yield userValidator({ userRegistration, errors, userRepository });
        return when_1.when(userValidation.errors.length).is((length) => {
            return length > 0;
        }, () => {
            return { isValid: false, errors: userValidation.errors };
        }).otherwise(() => {
            return { isValid: true, errors: userValidation.errors };
        });
    });
}
exports.ValidateUserSignUp = ValidateUserSignUp;
//# sourceMappingURL=ValidateUserSignUp.js.map