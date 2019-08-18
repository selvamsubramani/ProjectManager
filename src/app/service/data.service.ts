import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { environment } from './../../environments/environment'
import { User } from '../model/user';
import { Project } from '../model/project';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  UserAPI: string = environment.serviceUrl + "user/";
  ProjectAPI: string = environment.serviceUrl + "project/";
  TaskAPI: string = environment.serviceUrl + "task/";

  taskId = new BehaviorSubject(0);
  currentTaskId = this.taskId.asObservable();

  constructor(private http: HttpClient) { }

  changeTask(id: number) {
    this.taskId.next(id);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.UserAPI + "GetAllUsers");
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.UserAPI + "GetUserById/" + id);
  }

  addUser(user: User) {
    return this.http.post(this.UserAPI + "CreateUser", user);
  }

  updateUser(user: User) {
    return this.http.put(this.UserAPI + "UpdateUser", user);
  }

  deleteUser(id: number) {
    return this.http.delete(this.UserAPI + "DeleteUser/" + id);
  }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.ProjectAPI + "GetAllProjects");
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(this.ProjectAPI + "GetProjectById/" + id);
  }

  addProject(project: Project) {
    return this.http.post(this.ProjectAPI + "CreateProject", project);
  }

  updateProject(project: Project) {
    return this.http.put(this.ProjectAPI + "UpdateProject", project);
  }

  suspendProject(id: number) {
    return this.http.put(this.ProjectAPI + "SuspendProject/" + id, null);
  }

  deleteProject(id: number) {
    return this.http.delete(this.ProjectAPI + "DeleteProject/" + id);
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.TaskAPI + "GetAllTasks");
  }

  getParentTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.TaskAPI + "GetAllParentTasks");
  }

  getTasksByProjectId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.TaskAPI + "GetAllTasksByProjectId/" + id);
  }

  getParentasksByProjectId(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.TaskAPI + "GetAllParentTasksByProjectId/" + id);
  }

  getTaskById(id: number): Observable<Task> {
    return this.http.get<Task>(this.TaskAPI + "GetTaskByTaskId/" + id);
  }

  addTask(task: Task) {
    return this.http.post(this.TaskAPI + "CreateTask", task);
  }

  updateTask(task: Task) {
    return this.http.put(this.TaskAPI + "UpdateTask", task);
  }

  completeTask(id: number) {
    return this.http.put(this.TaskAPI + "CompleteTask/" + id, null);
  }

  deleteTask(id: number) {
    return this.http.delete(this.TaskAPI + "DeleteTask/" + id);
  }
}
