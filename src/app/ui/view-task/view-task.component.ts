import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { DataService } from 'src/app/service/data.service';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.css']
})
export class ViewTaskComponent implements OnInit {

  tasks: Task[];
  projects: Project[];
  project: Project;
  projectId: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.project = new Project();
    this.getProjects();
  }

  getTasks() {
    this.dataService.getTasksByProjectId(this.projectId).
      subscribe(
        data => this.tasks = data,
        error => console.log(error));
  }

  getProjects() {
    this.dataService.getProjects().
      subscribe(
        data => this.projects = data,
        error => console.log(error));
  }

  selectProject(event: any): void {
    if (event.args) {
      let item = event.args.item;
      if (item) {
        this.projectId = item.value;
      }
    }
  }

  setProject() {
    this.dataService.getProjectById(this.projectId).subscribe(
      data => {
        this.project = data;
        this.getTasks();
      }, error => console.log(error));
  }

  endTask(id: number) {
    this.dataService.completeTask(id).
      subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => console.log(error));
  }

  deleteTask(id: number) {
    this.dataService.deleteTask(id).
      subscribe(
        res => {
          console.log(res);
          this.ngOnInit();
        },
        error => console.log(error));
  }

  editTask(id: number) {
    this.dataService.changeTask(id);
  }

  sortByStartDate() {
    this.tasks.sort((s, t) => {
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
    this.tasks.sort((s, t) => {
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
    this.tasks.sort((s, t) => s.Priority - t.Priority);
  }

  sortByStatus() {
    this.tasks.sort((s, t) => s.IsCompleted === t.IsCompleted ? 0 : s.IsCompleted? -1 : 1);
  }

}
