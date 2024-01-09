import {IntegratorEntry} from "./IIntegratorEntry";

export interface Integrator {
    integratorID?: string
    location?: string
    serialNumber?: string
    userID?: string
    IntegratorGroup?: string
    IntegratorEntries?: IntegratorEntry[]
    type?: "integrator"
}
