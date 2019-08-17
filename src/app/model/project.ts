import { User } from './user';

export class Project {
    Id: number;
    Name: string;
    StartDate: Date;
    EndDate: Date;
    Priority: number;
    Manager: User;
    IsSuspended: boolean;
}
