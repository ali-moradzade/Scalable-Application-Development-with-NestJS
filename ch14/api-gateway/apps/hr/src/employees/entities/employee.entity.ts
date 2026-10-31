export enum Department {
    HR= 'HR',
    IT= 'IT',
    FINANCE= 'FINANCE',
}

export class Employee {
    id: number;
    name: string;
    email: string;
    department: Department;
}
