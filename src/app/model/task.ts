import { User } from './user';
import { Project } from './project';

export class Task {
    Id: number;
    Name: string;
    StartDate: Date;
    EndDate: Date;
    Priority: number;
    IsCompleted: boolean;
    IsParent: boolean;
    Parent: Task;
    Owner: User;
    Project: Project;
}
