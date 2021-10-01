import { BaseEntity } from 'typeorm';
export declare class ToDo extends BaseEntity {
    Id: number;
    UserId: number;
    Date: Date;
    Dateline: Date;
    Task: string;
    Priority: string;
    Status: boolean;
}
