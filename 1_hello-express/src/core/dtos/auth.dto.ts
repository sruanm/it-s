export interface SignRequestDTO {
    email: string;
    password: string;
}

export interface SignResponseDTO {
    id: number;
    email: string;
}