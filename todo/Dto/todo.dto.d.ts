export declare class TodoDto {
    UserId: number;
    Task: string;
    Priority: string;
    Status: boolean;
    Date?: Date;
    Dateline?: Date;
    Id?: number;
    constructor(UserId: number, Task: string, Priority: string, Status: boolean, Date?: Date, Dateline?: Date, Id?: number);
}
