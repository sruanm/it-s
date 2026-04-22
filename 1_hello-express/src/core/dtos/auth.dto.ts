export interface SignRequestDTO {
    email: string;
    password: string;
}

export interface SignResponseDTO {
    id: number;
    email: string;
}

export interface LoginResponseDTO {
    user: {
        id: number
        email: string
    }
    token: string
}