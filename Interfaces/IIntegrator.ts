import {IntegratorGroup} from "./IIntegratorGroup";
import {IntegratorEntry} from "./IIntegratorEntry";

export interface Integrator {
    integratorID?: string
    location?: string
    serialNumber?: string
    userID?: string
    IntegratorGroup?: IntegratorGroup[]
    IntegratorEntries?: IntegratorEntry[]
    type?: "integrator"
}
