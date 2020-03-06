export interface IUser { 
    name?: string;
    email?: string;
    password?: string;
    role?: string;
    tokens?: Array<string>;
}