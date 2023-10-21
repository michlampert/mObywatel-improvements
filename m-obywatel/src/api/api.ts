import { AED, BloodPoint, Clinic, Localization, SOR } from "./model"
import { randomBloodPoint, randomClinic, randomPlace } from "./randomData"

function getLocalization(name: string): Localization {
    return {
        longitude: 0,
        latitude: 0
    }
}

function getClinics(localization: Localization): Clinic[] {
    return Array(5).map(() => randomClinic())
}

function getSORs(localization: Localization): SOR[] {
    return Array(5).map(() => randomPlace())
}

function getAEDs(localization: Localization): AED[] {
    return Array(5).map(() => randomPlace())
}

function getBloodPoints(localization: Localization): BloodPoint[] {
    return Array(5).map(() => randomBloodPoint())
}