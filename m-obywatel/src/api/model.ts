export interface Localization {
    longitude: number,
    latitude: number
}

export interface Address {
    city: string
    details: string
}

export interface Place {
    name: string,
    desc?: string,
    localization: Localization,
    address: Address
    webpage?: string,
    phone?: string,
}

export interface Clinic extends Place {
    type: string,
    date: Date,
}

export interface SOR extends Place {

}

export interface AED extends Place {

}

export interface BloodPoint extends Place {
    state: number,
    subordinates: Place[],
}