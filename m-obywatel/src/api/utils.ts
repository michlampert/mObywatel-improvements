import { Localization } from "./model";

import * as Papa from 'papaparse';


export function calculateDistanceKM(from: Localization, to: Localization) {
    const R = 6371e3; // metres
    const φ1 = from.latitude * Math.PI / 180; // φ, λ in radians
    const φ2 = to.latitude * Math.PI / 180;
    const Δφ = (to.latitude - from.latitude) * Math.PI / 180;
    const Δλ = (to.longitude - from.longitude) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c; // in metres
    return d / 1000;
}

interface CoordsCSV {
    city: string,
    longitude: string,
    latitude: string
}

export async function cityToLocalization(city: string): Promise<Localization> {
    if (city === '') {
        await new Promise(r => setTimeout(r, 2000));

        return  {
            longitude: 0,
            latitude: 0
        }
    }
    let response = await fetch("src/assets/pl_coords.csv");
    let data = await response.text();

    const results = Papa.parse(data, {
        header: true,
    });

    const cities: CoordsCSV[] = results.data as CoordsCSV[];

    let foundedCity = cities.find((row: any) => row.city.trim().toLowerCase() === city.toLowerCase())

    if (foundedCity === undefined) {
        return {
            longitude: 0,
            latitude: 0
        }
    }
    return {
        longitude: parseFloat(foundedCity.longitude),
        latitude: parseFloat(foundedCity.latitude)
    }
}

export async function localizationToCity(localization: Localization): Promise<string> {
    let response = await fetch("src/assets/pl_coords.csv");
    let data = await response.text();

    const results = Papa.parse(data, {
        header: true,
    });

    const cities: CoordsCSV[] = results.data as CoordsCSV[];
    let closestCity = null;
    let minDistance = Number.MAX_VALUE;

    for (const city of cities) {
        const distance = calculateDistanceKM(localization, {latitude: parseFloat(city.latitude), longitude: parseFloat(city.longitude)});
        if (distance < minDistance) {
            minDistance = distance;
            closestCity = city.city;
        }
    }

    return closestCity as string;
}
