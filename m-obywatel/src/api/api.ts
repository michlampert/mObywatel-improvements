import { AED, BloodPoint, Clinic, Localization, SOR } from "./model"
import { randomBloodPoint, randomClinic, randomPlace } from "./randomData"
import { Geolocation } from '@capacitor/geolocation';
import { calculateDistanceKM } from "./utils";

import * as Papa from 'papaparse';

interface AEDCSV {
    access: string;
    defibrillatorLocation: string;
    defibrillatorLocationPl: string;
    description: string;
    descriptionPl: string;
    indoor: string;
    latitude: string;
    location: string;
    longitude: string;
    note: string;
    notePl: string;
    opening_hours: string;
    operator: string;
    osm_id: number;
    phone: string;
    wikimedia_commons: string;
}

interface SORCSV {
    name: string;
    phone: string;
    email: string;
    city: string;
    street: string;
    buildingNumber: string;
    postalCode: string;
    specialization: string;
    lon: string;
    lat: string;
}


export async function getClinics(
    localization: Localization, benefit: string, maxDistanceKM: number = 1000, cito: boolean = false
): Promise<Clinic[]> {
    const CLINICS_API_BASE = 'https://api.nfz.gov.pl/app-itl-api/queues?page=1&limit=25&format=json&api-version=1.3'

    let url = CLINICS_API_BASE + '&benefit=' + benefit + '&case=' + (cito ? '2' : '1');

    let response = await fetch(url);
    let data = await response.json();

    let clinics = data.data.map((row: any) => {
        let clinic = row.attributes;
        return {
            name: clinic.place,
            localization: {
                longitude: clinic.longitude,
                latitude: clinic.latitude
            },
            distance: calculateDistanceKM(localization, {longitude: clinic.longitude, latitude: clinic.latitude}),
            address: {
                city: clinic.locality,
                details: clinic.address
            },
            webpage: clinic.website,
            phone: clinic.phone,
            type: clinic.specialization,
            date: clinic.dates.date
        }
    });

    return clinics.filter((clinic: Clinic) => {
        return calculateDistanceKM(localization, clinic.localization) < maxDistanceKM;
    });
}

export async function getSORs(localization: Localization, maxDistanceKM: number = 1000): Promise<SOR[]> {
    let response = await fetch("src/assets/sor_geocoded.csv");
    let data = await response.text();

    const results = Papa.parse(data, {
        header: true,
    });

    let csvData = results.data as SORCSV[];

    let SORData = csvData.map((sor: SORCSV) => {
        return {
            name: sor.name,
            localization: { latitude: parseFloat(sor.lat), longitude: parseFloat(sor.lon) },
            distance: calculateDistanceKM(localization, { latitude: parseFloat(sor.lat), longitude: parseFloat(sor.lon) }),
            address: {
                city: sor.city,
                details: sor.street + " " + sor.buildingNumber
            },
            webpage: '',
            phone: sor.phone
        }
    });

    return SORData.filter((sor: SOR) => {
        return calculateDistanceKM(localization, sor.localization) < maxDistanceKM;
    });
}

export async function getAEDs(localization: Localization, maxDistanceKM: number = 1000): Promise<AED[]> {
    let response = await fetch("src/assets/aed_poland.csv");
    let data = await response.text();

    const results = Papa.parse(data, {
        header: true,
    });

    let csvData = results.data as AEDCSV[];

    let AEDData = csvData.map((aed: AEDCSV) => {
        return {
            name: aed.defibrillatorLocation,
            localization: {
                longitude: parseFloat(aed.longitude),
                latitude: parseFloat(aed.latitude)
            },
            distance: calculateDistanceKM(localization, { longitude: parseFloat(aed.longitude), latitude: parseFloat(aed.latitude) }),
            address: {
                city: aed.location,
                details: aed.defibrillatorLocation
            },
            webpage: '',
            phone: aed.phone
        }
    });

    return AEDData.filter((aed: AED) => {
        return calculateDistanceKM(localization, aed.localization) < maxDistanceKM;
    });
}

export function getBloodPoints(localization: Localization, maxDistanceKM: number = 1000): BloodPoint[] {
    return Array(5).map(() => randomBloodPoint())
}

export function getCurrentLocation(): Promise<Localization> {
    return Geolocation.getCurrentPosition().then(value => {
        return {
            longitude: value.coords.longitude,
            latitude: value.coords.latitude
        }
    })
}

export async function getPossibleTreatments(): Promise<string[]> {
    let response = await fetch("src/assets/benefits.csv");
    let data = await response.text();

    const results = Papa.parse(data, {});

    const tmp = results.data as string[];

    return tmp.map(innerArray => innerArray[0]);
}
