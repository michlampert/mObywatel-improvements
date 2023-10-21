import { BloodPoint, Clinic, Place } from "./model";

function randInt(n: number): number {
    return Math.floor(Math.random() * n)
}

function sample<T>(arr: T[]): T {
    const n = randInt(arr.length)
    return arr[n]
}

const names = [
    "Spital im. JP2",
    "Przychodnia im. Lecha Kaczyńskiego",
    "Spital im. Adama Małysza",
]

const cities = [
    "Warszawa",
    "Kraków",
    "Katowice",
]

const types = [
    "ortopeda",
    "chirurg",
    "alergolog"
]

export function randomPlace(): Place {
    return {
        name: sample(names),
        localization: {
            longitude: randInt(2),
            latitude: randInt(2)
        },
        address: {
            city: sample(cities),
            details: "ul. Wiejska 3"
        },
        phone: "123-123-123",
        webpage: "google.com"
    }
}

export function randomClinic(): Clinic {
    const place = randomPlace()
    return {
        ...place,
        date: new Date(2024, 0, 1),
        type: sample(types),
    }
}


export function randomBloodPoint(): BloodPoint {
    const place = randomPlace()
    return {
        ...place,
        state: 0.25 * randInt(5),
        subordinates: [
            randomPlace(),
            randomPlace(),
        ]
    }
}