export interface StatementRequest {
    "sleepDetectorId": string,
    "driverId": string,
    "vehicleId": string,
    "destination": string,
    "csvFile": File,
}

export interface StatementResponse {
    "id": string,
    "sleepDetector": string,
    "driver": string,
    "vehicle": string,
    "destination": string,
    "pathPdf": string,
}