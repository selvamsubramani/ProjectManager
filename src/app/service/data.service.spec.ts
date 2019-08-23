import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'

import { DataService } from './data.service';
import { Task } from '../model/task';
import { User } from '../model/user';
import { Project } from '../model/project';

describe('DataService', () => {
  let dataservice: DataService;
  let httpMock: HttpTestingController;

  let users: User[] = [
    { Id: 1, FirstName: 'FirstName-01', LastName: 'LastName-01', EmployeeId: 100 },
    { Id: 2, FirstName: 'FirstName-02', LastName: 'LastName-02', EmployeeId: 200 }
  ];

  let projects: Project[] = [
    { Id: 1, Name: 'Project-01', Priority: 5, NoOfTasks: 1, Status: 'In progress', IsSuspended: false, IsDateEnabled: false, StartDate: null, EndDate: null, Manager: new User() },
    { Id: 2, Name: 'Project-02', Priority: 10, NoOfTasks: 1, Status: 'In progress', IsSuspended: false, IsDateEnabled: false, StartDate: null, EndDate: null, Manager: new User() }
  ];

  let tasks: Task[] = [
    { Id: 1, Name: 'Task-01', IsParent: false, Parent: null, Priority: 10, IsCompleted: false, StartDate: new Date(), EndDate: new Date(), Owner: null, Project: null },
    { Id: 2, Name: 'Task-02', IsParent: false, Parent: null, Priority: 20, IsCompleted: false, StartDate: new Date(), EndDate: new Date(), Owner: null, Project: null }
  ];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      RouterTestingModule]
  }));

  beforeEach(() => {
    dataservice = TestBed.get(DataService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });

  it('should get all users', () => {

    dataservice.getUsers().subscribe(d => {
      expect(d.length).toBe(2);
      expect(d).toBe(users);
    });

    const req = httpMock.expectOne(dataservice.UserAPI + "GetAllUsers");
    expect(req.request.method).toEqual('GET');
    req.flush(users);
  });

  it('should get error in users', () => {
    let error: any;
    dataservice.getUsers().subscribe(
      res => { },
      e => {
        error = e;
        expect(error).toBeTruthy();
      });

    const req = httpMock.expectOne(dataservice.UserAPI + "GetAllUsers");
    expect(req.request.method).toEqual('GET');
    req.error(new ErrorEvent('Internal error'));
  });

  it('should get one user', () => {

    const userId: number = 1;
    const user = users.find(u => u.Id == userId);
    dataservice.getUserById(userId).subscribe(d => {
      expect(d).toBeTruthy();
      expect(d).toBe(user);
    });

    const req = httpMock.expectOne(dataservice.UserAPI + "GetUserById/" + userId);
    expect(req.request.method).toEqual('GET');
    req.flush(user);
  });

  it('should get no user', () => {

    const userId: number = 0;
    const user: User = users.find(u => u.Id == userId);
    dataservice.getUserById(userId).subscribe(d => {
      expect(d).toBeTruthy();
      expect(d).toBe(user);
    });

    const req = httpMock.expectOne(dataservice.UserAPI + "GetUserById/" + userId);
    expect(req.request.method).toEqual('GET');
  });

  it('should get error in get user by id', () => {

    let response: any;
    let error: any;
    const userId: number = -1;
    const data = "No User";
    const mockResponse = { status: 400, statusText: "Bad Request" };
    dataservice.getUserById(userId).subscribe(
      res => {
        response = res;
        expect(response).toEqual(data);
      },
      e => {
        error = e;
        expect(error.status).toEqual(400);
      });

    const req = httpMock.expectOne(dataservice.UserAPI + "GetUserById/" + userId);
    expect(req.request.method).toEqual('GET');
    req.flush(data, mockResponse);
  });

  it('should add user', () => {
    const user = new User();
    user.Id = 0;
    user.FirstName = "new-User";
    dataservice.addUser(user).subscribe(data => expect(data).toBe(user));

    const req = httpMock.expectOne(dataservice.UserAPI + "CreateUser");
    expect(req.request.method).toEqual('POST');
    req.flush(user);
  });

  it('should not add user', () => {
    const user = users.find(u => u.Id == 1);
    dataservice.addUser(user).subscribe(res => { }, error => expect(error).toBeTruthy());

    const req = httpMock.expectOne(dataservice.UserAPI + "CreateUser");
    expect(req.request.method).toEqual('POST');
    req.error(new ErrorEvent("Cannot Add"));
  });

  it('should update user', () => {
    const user = users.find(u => u.Id == 1);
    user.FirstName = "FirstName Updated";
    dataservice.updateUser(user).subscribe(data => expect(data).toBe(user));

    const req = httpMock.expectOne(dataservice.UserAPI + "UpdateUser");
    expect(req.request.method).toEqual('PUT');
    req.flush(user);
  });

  it('should not update user', () => {
    const user = users.find(u => u.Id == 1);
    dataservice.updateUser(user).subscribe(res => { }, error => expect(error).toBeTruthy());

    const req = httpMock.expectOne(dataservice.UserAPI + "UpdateUser");
    expect(req.request.method).toEqual('PUT');
    req.error(new ErrorEvent("Cannot Update"));
  });

  it('should delete user', () => {
    const userId: number = 2;
    dataservice.deleteUser(userId).subscribe(d => expect(d).toBe(userId));
    const req = httpMock.expectOne(dataservice.UserAPI + "DeleteUser/" + userId);
    expect(req.request.method).toEqual('DELETE');
    req.flush(userId);
  });

  it('should not delete user', () => {
    const userId: number = 1;
    let response: any;
    let error: any;
    const data = "Cannot delete";
    const mockResponse = { status: 400, statusText: "BadRequest" };

    dataservice.deleteUser(userId).subscribe(
      res => expect(res).toEqual(data), e => expect(error.status).toEqual(400));

    const req = httpMock.expectOne(dataservice.UserAPI + "DeleteUser/" + userId);
    expect(req.request.method).toEqual('DELETE');
    req.flush(data, mockResponse);
  });

  it('should get all projects', () => {

    dataservice.getProjects().subscribe(d => {
      expect(d.length).toBe(2);
      expect(d).toBe(projects);
    });

    const req = httpMock.expectOne(dataservice.ProjectAPI + "GetAllProjects");
    expect(req.request.method).toEqual('GET');
    req.flush(projects);
  });

  it('should get error in projects', () => {
    let error: any;
    dataservice.getProjects().subscribe(
      res => { },
      e => {
        error = e;
        expect(error).toBeTruthy();
      });

    const req = httpMock.expectOne(dataservice.ProjectAPI + "GetAllProjects");
    expect(req.request.method).toEqual('GET');
    req.error(new ErrorEvent('Internal error'));
  });

  it('should get one project', () => {

    const projectId: number = 1;
    const project = projects.find(p => p.Id == projectId);
    dataservice.getProjectById(projectId).subscribe(d => {
      expect(d).toBeTruthy();
      expect(d).toBe(project);
    });

    const req = httpMock.expectOne(dataservice.ProjectAPI + "GetProjectById/" + projectId);
    expect(req.request.method).toEqual('GET');
    req.flush(project);
  });

  it('should get no project', () => {

    const projectId: number = 0;
    const project: Project = projects.find(p => p.Id == projectId);
    dataservice.getProjectById(projectId).subscribe(d => {
      expect(d).toBeTruthy();
      expect(d).toBe(project);
    });

    const req = httpMock.expectOne(dataservice.ProjectAPI + "GetProjectById/" + projectId);
    expect(req.request.method).toEqual('GET');
  });

  it('should get error in get project by id', () => {

    let response: any;
    let error: any;
    const projectId: number = -1;
    const data = "No Project";
    const mockResponse = { status: 400, statusText: "Bad Request" };
    dataservice.getProjectById(projectId).subscribe(
      res => {
        response = res;
        expect(response).toEqual(data);
      },
      e => {
        error = e;
        expect(error.status).toEqual(400);
      });

    const req = httpMock.expectOne(dataservice.ProjectAPI + "GetProjectById/" + projectId);
    expect(req.request.method).toEqual('GET');
    req.flush(data, mockResponse);
  });

  it('should add project', () => {
    const project: Project = new Project();
    project.Id = 0;
    project.Name = "new-Project";
    dataservice.addProject(project).subscribe(data => expect(data).toBe(project));

    const req = httpMock.expectOne(dataservice.ProjectAPI + "CreateProject");
    expect(req.request.method).toEqual('POST');
    req.flush(project);
  });

  it('should not add project', () => {
    const project = projects.find(p => p.Id == 1);
    dataservice.addProject(project).subscribe(res => { }, error => expect(error).toBeTruthy());

    const req = httpMock.expectOne(dataservice.ProjectAPI + "CreateProject");
    expect(req.request.method).toEqual('POST');
    req.error(new ErrorEvent("Cannot Add"));
  });

  it('should update project', () => {
    const project = projects.find(p => p.Id == 1);
    project.Name = "Project-Name Updated";
    dataservice.updateProject(project).subscribe(data => expect(data).toBe(project));

    const req = httpMock.expectOne(dataservice.ProjectAPI + "UpdateProject");
    expect(req.request.method).toEqual('PUT');
    req.flush(project);
  });

  it('should not update project', () => {
    const project = projects.find(p => p.Id == 1);
    dataservice.updateProject(project).subscribe(res => { }, error => expect(error).toBeTruthy());

    const req = httpMock.expectOne(dataservice.ProjectAPI + "UpdateProject");
    expect(req.request.method).toEqual('PUT');
    req.error(new ErrorEvent("Cannot Update"));
  });

  it('should delete project', () => {
    const projectId: number = 2;
    dataservice.deleteProject(projectId).subscribe(d => {
      expect(d).toBe(projectId);
    });

    const req = httpMock.expectOne(dataservice.ProjectAPI + "DeleteProject/" + projectId);
    expect(req.request.method).toEqual('DELETE');
    req.flush(projectId);
  });

  it('should not delete project', () => {
    const projectId: number = 1;
    const data = "Cannot delete";
    const mockResponse = { status: 400, statusText: "BadRequest" };

    dataservice.deleteProject(projectId).subscribe(
      res => expect(res).toEqual(data),
      e => expect(e.status).toEqual(400)
    );

    const req = httpMock.expectOne(dataservice.ProjectAPI + "DeleteProject/" + projectId);
    expect(req.request.method).toEqual('DELETE');
    req.flush(data, mockResponse);
  });

  it('should get all tasks', () => {

    dataservice.getTasks().subscribe(d => {
      expect(d.length).toBe(2);
      expect(d).toBe(tasks);
    });

    const req = httpMock.expectOne(dataservice.TaskAPI + "GetAllTasks");
    expect(req.request.method).toEqual('GET');
    req.flush(tasks);
  });

  it('should get error in tasks', () => {
    let error: any;
    dataservice.getTasks().subscribe(
      res => { },
      e => {
        error = e;
        expect(error).toBeTruthy();
      });

    const req = httpMock.expectOne(dataservice.TaskAPI + "GetAllTasks");
    expect(req.request.method).toEqual('GET');
    req.error(new ErrorEvent('Internal error'));
  });

  it('should get one tasks', () => {

    const taskId: number = 1;
    const task = tasks.find(t => t.Id == taskId);
    dataservice.getTaskById(taskId).subscribe(d => {
      expect(d).toBeTruthy();
      expect(d).toBe(task);
    });

    const req = httpMock.expectOne(dataservice.TaskAPI + "GetTaskByTaskId/" + taskId);
    expect(req.request.method).toEqual('GET');
    req.flush(task);
  });

  it('should get no tasks', () => {

    const taskId: number = 0;
    const task: Task = tasks.find(t => t.Id == taskId);
    dataservice.getTaskById(taskId).subscribe(d => {
      expect(d).toBeTruthy();
      expect(d).toBe(task);
    });

    const req = httpMock.expectOne(dataservice.TaskAPI + "GetTaskByTaskId/" + taskId);
    expect(req.request.method).toEqual('GET');
  });

  it('should get error in get task by id', () => {
    let response: any;
    let error: any;
    const taskId: number = -1;
    const data = "No Task";
    const mockResponse = { status: 400, statusText: "Bad Request" };
    dataservice.getTaskById(taskId).subscribe(
      res => {
        response = res;
        expect(response).toEqual(data);
      },
      e => {
        error = e;
        expect(error.status).toEqual(400);
      });

    const req = httpMock.expectOne(dataservice.TaskAPI + "GetTaskByTaskId/" + taskId);
    expect(req.request.method).toEqual('GET');
    req.flush(data, mockResponse);
  });

  it('should add task', () => {
    const task: Task = new Task();
    task.Id = 0;
    task.Name = "new-Task";
    dataservice.addTask(task).subscribe(data => expect(data).toBe(task));

    const req = httpMock.expectOne(dataservice.TaskAPI + "CreateTask");
    expect(req.request.method).toEqual('POST');
    req.flush(task);
  });

  it('should not add task', () => {
    const task = tasks.find(t => t.Id == 1);
    dataservice.addTask(task).subscribe(res => { }, error => expect(error).toBeTruthy());

    const req = httpMock.expectOne(dataservice.TaskAPI + "CreateTask");
    expect(req.request.method).toEqual('POST');
    req.error(new ErrorEvent("Cannot Add"));
  });

  it('should update task', () => {
    const task = tasks.find(t => t.Id == 1);
    task.Name = "Task-Name Updated";
    dataservice.updateTask(task).subscribe(data => expect(data).toBe(task));

    const req = httpMock.expectOne(dataservice.TaskAPI + "UpdateTask");
    expect(req.request.method).toEqual('PUT');
    req.flush(task);
  });

  it('should not update task', () => {
    const taskId: number = 1;
    const task = tasks.find(t => t.Id == taskId);
    dataservice.updateTask(task).subscribe(res => { }, error => expect(error).toBeTruthy());

    const req = httpMock.expectOne(dataservice.TaskAPI + "UpdateTask");
    expect(req.request.method).toEqual('PUT');
    req.error(new ErrorEvent("Cannot Update"));
  });

  it('should delete task', () => {
    const taskId: number = 2;
    dataservice.deleteTask(taskId).subscribe(d => {
      expect(d).toBe(taskId);
    });

    const req = httpMock.expectOne(dataservice.TaskAPI + "DeleteTask/" + taskId);
    expect(req.request.method).toEqual('DELETE');
    req.flush(taskId);
  });

  it('should not delete task', () => {
    const taskId: number = 1;
    const data = "Cannot delete";
    const mockResponse = { status: 400, statusText: "BadRequest" };

    dataservice.deleteTask(taskId).subscribe(
      res => expect(res).toEqual(data),
      e => expect(e.status).toEqual(400)
    );

    const req = httpMock.expectOne(dataservice.TaskAPI + "DeleteTask/" + taskId);
    expect(req.request.method).toEqual('DELETE');
    req.flush(data, mockResponse);
  });

});
