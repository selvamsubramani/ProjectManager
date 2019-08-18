import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { DataService } from 'src/app/service/data.service';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  task: Task;
  parentTasks: Task[];
  selectedParentTaskId: number;

  projects: Project[];
  selectedProjectId: number;

  users: User[];
  selectedUserId: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.task = new Task();
    this.task.Owner = new User();
    this.task.Project = new Project();
    this.task.Parent = new Task();
    this.task.Priority = 0;
    this.getProjects();
    this.getUsers();
    this.getParentTasks();
  }

  getProjects() {
    this.dataService.getProjects().subscribe(data => this.projects = data, error => console.log(error));
  }

  getUsers() {
    this.dataService.getUsers().subscribe(data => this.users = data, error => console.log(error));
  }

  getParentTasks() {
    this.dataService.getParentTasks().subscribe(data => this.parentTasks = data, error => console.log(error));
  }

  selectProject(event: any): void {
    if (event.args) {
      let item = event.args.item;
      if (item) {
        this.selectedProjectId = item.value;
      }
    }
  }

  setProject() {
    this.dataService.getProjectById(this.selectedProjectId).subscribe(data => this.task.Project = data, error => console.log(error));
  }

  selectUser(event: any): void {
    if (event.args) {
      let item = event.args.item;
      if (item) {
        this.selectedUserId = item.value;
      }
    }
  }

  setUser() {
    this.dataService.getUserById(this.selectedUserId).subscribe(data => this.task.Owner = data, error => console.log(error));
  }

  selectParentTask(event: any): void {
    if (event.args) {
      let item = event.args.item;
      if (item) {
        this.selectedParentTaskId = item.value;
      }
    }
  }

  setParentTask() {
    this.dataService.getTaskById(this.selectedParentTaskId).subscribe(data => this.task.Parent = data, error => console.log(error));
  }

  addTask() {
    this.dataService.addTask(this.task).subscribe(
      res => {
        console.log(res);
      },
      error => console.log(error));
  }

}
