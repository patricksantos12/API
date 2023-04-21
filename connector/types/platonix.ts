import internal from "stream"

export interface PlatonixApp {
    id: number,
}

export interface Platonix extends PlatonixApp {
    platonixID: number,
    plateNumber: string,
    carRegistrationStatus: string,
    carColor: string,
    carMarker: string,
    carModel: string,
    carCityLocation: string
}