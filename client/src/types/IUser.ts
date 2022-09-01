interface Role {
    id: number;
    name: string;
    description: string;
}

export interface IUser {
    email: string;
    id: number;
    role: Role[]
}