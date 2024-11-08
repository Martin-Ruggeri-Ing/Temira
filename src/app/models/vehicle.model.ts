
export interface VehicleBrand {
    "id": string,
    "name": string
}

export interface VehicleType { 
    "id": string,
    "name": string
}

export interface Vehicle {
    "id": string,
    "type": string,
    "brand": string,
    "registration": string,
    "model": number
}