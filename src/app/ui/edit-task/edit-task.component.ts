import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { User } from 'src/app/model/user';
import { DataService } from 'src/app/service/data.service';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  taskId: number;
  task: Task;
  parentTasks: Task[];
  selectedParentTaskId: number;

  users: User[];
  selectedUserId: number;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.task = new Task();
    this.task.Owner = new User();
    this.task.Project = new Project();
    this.task.Parent = new Task();
    this.task.Priority = 0;

    this.dataService.currentTaskId.subscribe(
      data => this.taskId = data,
      error => console.log(error)
    );
    
    if (this.taskId > 0) {
      this.dataService.getTaskById(this.taskId).subscribe(
        data => {
          this.task = data;
          if (!this.task.Project)
            this.task.Project = new Project();
          if (!this.task.Owner)
            this.task.Owner = new User();
          if (!this.task.Parent)
            this.task.Parent = new Task();
        },
        error => console.log(error));
    }

    this.getUsers();
    this.getParentTasks();
  }

  getUsers() {
    this.dataService.getUsers().subscribe(data => this.users = data, error => console.log(error));
  }

  getParentTasks() {
    this.dataService.getParentTasks().subscribe(data => this.parentTasks = data, error => console.log(error));
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

  updateTask() {
    this.dataService.updateTask(this.task).subscribe(
      res => {
        console.log(res);
      },
      error => console.log(error));
  }

}
