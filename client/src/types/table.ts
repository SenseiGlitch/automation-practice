export interface TableData {
    [key: string]: string | number; // Index signature to allow dynamic keys
    id: string;
    name: string;
    email: string;
    status: string;
    role: string;
}
