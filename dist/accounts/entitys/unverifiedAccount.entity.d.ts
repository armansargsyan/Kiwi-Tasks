import { BaseEntity } from 'typeorm';
export declare class UnverifiedAccount extends BaseEntity {
    id: number;
    name: string;
    age: number;
    email: string;
    passwordHash: string;
    verificationCode: string;
    phoneNumber: string;
}
