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
    distance: number,
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
    state: Object,
    subordinates?: Place[],
}

// XD
export interface PlacesCombined extends Place {
    type?: string,
    date?: Date,
    state?: number,
    subordinates?: Place[]
}
