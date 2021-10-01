import { BaseEntity } from 'typeorm';
export declare class Account extends BaseEntity {
    id: number;
    name: string;
    age: number;
    email: string;
    passwordHash: string;
    phoneNumber: string;
}
