export interface PlatonixApp {
    platonixID: number,
}

export interface Platonix extends PlatonixApp {
    plateNumber: string,
    carRegistrationStatus: string,
    carColor: string,
    carMarker: string,
    carModel: string,
    carCityLocation: string
}