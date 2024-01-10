
export interface IntegratorEntry {
    utcCreationTime: number;
    utcDateTime: number ;
    // rate at which the stones were crushed - kg/h
    rate: number;
    // tape speed - m/s
    speed: number;
    // total stones crushed - kg
    total: number;
}
