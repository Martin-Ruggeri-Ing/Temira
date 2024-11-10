export interface VehicleBrand {
    "id": string,
    "name": string
}
export interface VehicleType { 
    "id": string,
    "name": string
}

export interface VehicleRequest {
    "type": VehicleType,
    "brand": VehicleBrand,
    "registration": string,
    "model": number
}

export interface VehicleResponse {
    "id": string,
    "type": string,
    "brand": string,
    "registration": string,
    "model": number
}