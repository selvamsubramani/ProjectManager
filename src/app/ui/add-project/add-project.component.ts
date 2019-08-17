import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: Project;
  projects: Project[];

  constructor() { }

  ngOnInit() {
    this.project = new Project();
    this.projects = [
      {
        Id: 1, Name: "Project-01", Priority: 5, IsSuspended: false, StartDate: new Date(), EndDate: new Date(),
        Manager: { Id: 1, FirstName: 'FirstName-01', LastName: 'LastName-01', EmployeeId: 100 }
      },
      {
        Id: 2, Name: "Project-02", Priority: 15, IsSuspended: false, StartDate: new Date(), EndDate: new Date(),
        Manager: { Id: 2, FirstName: 'FirstName-02', LastName: 'LastName-02', EmployeeId: 200 }
      }
    ];
  }

}
