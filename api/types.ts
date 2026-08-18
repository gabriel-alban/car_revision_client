export interface User {
    email: string;
    username: string;
    password: string;
}

export type PublicUser = Omit<User, 'password'>;
export interface Car {
    brand: string;
    model: string;
    km_range: string;
    user: PublicUser
}