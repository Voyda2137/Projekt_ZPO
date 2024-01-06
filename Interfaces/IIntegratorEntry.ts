
export interface IntegratorEntry {
    utcCreationTime: string;
    utcDateTime: string ;
    // rate at which the stones were crushed - kg/60s
    rate: number;
    // tape speed - m/s
    speed: number;
    // total stones crushed - kg
    total: number;
}
