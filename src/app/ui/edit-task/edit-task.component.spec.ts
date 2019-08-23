import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { jqxListBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';

import { EditTaskComponent } from './edit-task.component';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { Task } from 'src/app/model/task';
import { DataService } from 'src/app/service/data.service';
import { DebugElement } from '@angular/core';

describe('EditTaskComponent', () => {

  class MockDataService {

    taskId = new BehaviorSubject(1);
    currentTaskId = this.taskId.asObservable();

    Users: User[] = [
      { Id: 1, FirstName: 'FirstName-01', LastName: 'LastName-01', EmployeeId: 100 },
      { Id: 2, FirstName: 'FirstName-02', LastName: 'LastName-02', EmployeeId: 200 }
    ];

    Projects: Project[] = [
      { Id: 1, Name: 'Project-01', Priority: 5, NoOfTasks: 1, Status: 'In progress', IsSuspended: false, IsDateEnabled: false, StartDate: null, EndDate: null, Manager: new User() },
      { Id: 2, Name: 'Project-02', Priority: 10, NoOfTasks: 1, Status: 'In progress', IsSuspended: false, IsDateEnabled: false, StartDate: null, EndDate: null, Manager: new User() }
    ];

    Tasks: Task[] = [
      { Id: 1, Name: 'Task-01', IsParent: false, Parent: null, Priority: 10, IsCompleted: false, StartDate: new Date(), EndDate: new Date(), Owner: null, Project: null },
      { Id: 2, Name: 'Task-02', IsParent: false, Parent: null, Priority: 20, IsCompleted: false, StartDate: new Date(), EndDate: new Date(), Owner: null, Project: null }
    ];

    getUsers(): Observable<User[]> {
      return of(this.Users);
    }

    getParentTasks(): Observable<Task[]> {
      return of(this.Tasks);
    }

    getUserById(id: number): Observable<User> {
      let user = this.Users.find(u => u.Id == id);
      return of(user);
    }

    getTaskById(id: number): Observable<Task> {
      let task = this.Tasks.find(t => t.Id == id);
      return of(task);
    }

    updateTask(task: Task):Observable<any> {
      const editTask = this.Tasks.find(t => t.Id == task.Id);
      editTask.Name = task.Name;
      editTask.Parent = task.Parent;
      editTask.Priority = task.Priority;
      return of("task is updated");
    }
  }

  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;
  let debugElement: DebugElement;
  let service: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [
        EditTaskComponent,
        jqxListBoxComponent],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    service = debugElement.injector.get(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task & parent tasks', () => {
    service.taskId.next(1);
    component.ngOnInit();
    expect(component.parentTasks).toBeTruthy();
    expect(component.task).toBeTruthy();
  });

  it('should update task', () => {
    service.taskId.next(1);
    component.ngOnInit();
    component.task.Name = "Task-01-Edit";
    component.updateTask();
    expect(component.task).toBeTruthy();
    expect(component.task.Name).toEqual("Task-01-Edit");
  });

  it('should set user', () => {
    component.ngOnInit();
    component.selectUser({ args: { item: { value: 1 } } });
    component.setUser();
    expect(component.selectedUserId).toEqual(1);
  });

  it('should set parent task', () => {
    component.ngOnInit();
    component.selectParentTask({ args: { item: { value: 1 } } });
    component.setParentTask();
    expect(component.selectedParentTaskId).toEqual(1);
  });
});
