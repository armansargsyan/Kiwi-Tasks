export class TodoDto {
  constructor(
    public UserId: number,
    public Task: string,
    public Priority: string,
    public Status: boolean,
    public Date?: Date,
    public Dateline?: Date,
    public Id?: number,
  ) {}
}
