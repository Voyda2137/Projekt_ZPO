import {IntegratorGroup} from "./IIntegratorGroup";

export interface IUser {
    userID?: string
    login?: string
    password?: string
    name?: string
    surname?: string
    role: {
        isService: boolean
        isManager: boolean
    }
    integratorGroups: IntegratorGroup[]
    type: "user"
}
