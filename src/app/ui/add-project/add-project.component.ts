import { Component, OnInit } from '@angular/core';

import { Project } from 'src/app/model/project';
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent implements OnInit {

  project: Project;
  projects: Project[];
  managers: User[];
  selectedManagerId: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.project = new Project();
    this.project.Manager = new User();
    this.project.IsDateEnabled = false;
    this.project.Priority = 0;
    this.getProjects();
    this.getManagers();
  }

  getProjects() {
    this.dataService.getProjects().subscribe(data => this.projects = data, error => console.log(error));
  }

  getManagers() {
    this.dataService.getUsers().subscribe(data => this.managers = data, error => console.log(error));
  }

  selectManager(event: any): void {
    if (event.args) {
      let item = event.args.item;
      if (item) {
        this.selectedManagerId = item.value;
      }
    }
  }

  setManager() {
    this.dataService.getUserById(this.selectedManagerId).subscribe(data => this.project.Manager = data, error => console.log(error));
  }

  createProject() {
    this.dataService.addProject(this.project).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      error => console.log(error)
    );
  }

  updateProject() {
    this.dataService.updateProject(this.project).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      error => console.log(error)
    );
  }

  editProject(id: number) {
    this.dataService.getProjectById(id).subscribe(data => this.project = data, error => console.log(error));
  }

  suspendProject(id: number) {
    this.dataService.suspendProject(id).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      error => console.log(error)
    )
  }

  deleteProject(id: number) {
    this.dataService.deleteProject(id).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      error => console.log(error)
    )
  }

  sortByStartDate() {
    this.projects.sort((s, t) => {
      if (!s.StartDate && !t.StartDate)
        return 0;
      if (s.StartDate && !t.StartDate)
        return 1;
      if (!s.StartDate && t.StartDate)
        return -1;
      if (s.StartDate > t.StartDate)
        return 1;
      if (s.StartDate < t.StartDate)
        return -1;
      return 0;
    });
  }

  sortByEndDate() {
    this.projects.sort((s, t) => {
      if (!s.EndDate && !t.EndDate)
        return 0;
      if (s.EndDate && !t.EndDate)
        return 1;
      if (!s.EndDate && t.EndDate)
        return -1;
      if (s.EndDate > t.EndDate)
        return 1;
      if (s.EndDate < t.EndDate)
        return -1;
      return 0;
    });
  }

  sortByPriority() {
    this.projects.sort((s, t) => s.Priority - t.Priority);
  }

  sortByStatus() {
    this.projects.sort((s, t) => s.Status.localeCompare(t.Status));
  }

}
