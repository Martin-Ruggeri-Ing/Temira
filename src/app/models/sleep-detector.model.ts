export interface SleepDetectorModelRequest { 
    "name": string
}

export interface SleepDetectorRequest {
    "name": string,
    "model": string
}

export interface SleepDetectorModelResponse { 
    "id": string,
    "name": string
}

export interface SleepDetectorResponse {
    "id": string,
    "name": string,
    "model": string
}