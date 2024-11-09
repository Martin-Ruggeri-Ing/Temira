export interface StatementRequest {
    "sleepDetector": string,
    "driver": string,
    "vehicle": string,
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