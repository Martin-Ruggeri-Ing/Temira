
export interface VehicleBrandRequest {
    "name": string
}

export interface VehicleTypeRequest { 
    "name": string
}

export interface VehicleRequest {
    "type": string,
    "brand": string,
    "registration": string,
    "model": number
}


export interface VehicleBrandResponse {
    "id": string,
    "name": string
}

export interface VehicleTypeResponse { 
    "id": string,
    "name": string
}

export interface VehicleResponse {
    "id": string,
    "type": string,
    "brand": string,
    "registration": string,
    "model": number
}