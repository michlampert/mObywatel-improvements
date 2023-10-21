import { AED, BloodPoint, Clinic, Localization, SOR } from "./model"
import { randomBloodPoint, randomClinic, randomPlace } from "./randomData"

function getLocalization(name: string): Localization {
    return {
        longitude: 0,
        latitude: 0
    }
}

function getClinics(localization: Localization, maxDistanceKM: number = 1000): Clinic[] {
    return Array(5).map(() => randomClinic())
}

function getSORs(localization: Localization, maxDistanceKM: number = 1000): SOR[] {
    return Array(5).map(() => randomPlace())
}

function getAEDs(localization: Localization, maxDistanceKM: number = 1000): AED[] {
    // read csv from aed_poland.csv

    return Array(5).map(() => randomPlace())
}

function getBloodPoints(localization: Localization, maxDistanceKM: number = 1000): BloodPoint[] {
    return Array(5).map(() => randomBloodPoint())
}
