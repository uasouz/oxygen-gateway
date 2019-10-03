import {UserStatus} from "../../enterprise_business_rules/models/UserStatus";

export function ValidateUserStatus(statusID: number) {
    return Object.values(UserStatus).includes(statusID)
}