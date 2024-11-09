
export interface SleepDetectorModel{ 
    "id": string,
    "name": string
}
export interface SleepDetectorRequest {
    "name": string,
    "model": SleepDetectorModel
}

export interface SleepDetectorResponse {
    "id": string,
    "name": string,
    "model": string
}