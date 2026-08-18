export interface User {
    email: string;
    username: string;
    password: string;
}

export interface Car {
    brand: string;
    model: string;
    km_range: string;
    user: User
}