import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of } from 'rxjs';
import { jqxListBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';

import { ViewTaskComponent } from './view-task.component';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { Task } from 'src/app/model/task';
import { DataService } from 'src/app/service/data.service';
import { DebugElement } from '@angular/core';

describe('ViewTaskComponent', () => {
  class MockDataService {

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

    getProjects(): Observable<Project[]> {
      return of(this.Projects);
    }

    getTasksByProjectId(id: number): Observable<Task[]> {
      return of(this.Tasks);
    }

    getProjectById(id: number): Observable<Project> {
      let project = this.Projects.find(p => p.Id == id);
      return of(project);
    }

    endTask(id: number): Observable<any> {
      const tasks = this.Tasks;
      const task = tasks.find(t => t.Id == id);
      task.IsCompleted = true;
      return of("Task is completed");
    }

    deleteTask(id: number): Observable<any> {
      const tasks = this.Tasks;
      const index = tasks.findIndex(t => t.Id == id);
      tasks.splice(index, 1);
      return of("Task is deleted");
    }

    completeTask(id: number): Observable<any> {
      const tasks = this.Tasks;
      const task = tasks.find(t => t.Id == id);
      task.IsCompleted = true;
      return of("Task is completed");
    }

    changeTask(id: number) {
    }
  }

  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;
  let debugElement: DebugElement;
  let service: DataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [ViewTaskComponent,
        jqxListBoxComponent],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    debugElement = fixture.debugElement;
    service = debugElement.injector.get(DataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects', () => {
    component.ngOnInit();
    expect(component.projects).toBeTruthy();
    expect(component.projects.length).toBeTruthy(2);
  });

  it('should set project', () => {
    component.ngOnInit();
    component.projectId = 1;
    component.setProject();
    expect(component.project).toBeTruthy();
    expect(component.project.Id).toBeTruthy(1);
  });

  it('should get tasks for project', () => {
    component.ngOnInit();
    component.projectId = 1;
    component.setProject();
    component.getTasks();
    expect(component.tasks).toBeTruthy();
    expect(component.tasks.length).toBeTruthy(2);
  });

  it('should close tasks', () => {
    component.ngOnInit();
    component.projectId = 1;
    component.setProject();
    component.getTasks();
    const taskId = 1;
    component.endTask(taskId);
    const task = component.tasks.find(t => t.Id == taskId);
    expect(task).toBeTruthy();
    expect(task.IsCompleted).toEqual(true);
  });

  it('should delete tasks', () => {
    component.ngOnInit();
    component.projectId = 1;
    component.setProject();
    component.getTasks();
    const taskId = 2;
    component.deleteTask(taskId);
    const task = component.tasks.find(t => t.Id == taskId);
    expect(component.tasks.length).toEqual(1);
    expect(task).toBeUndefined();
  });

  it('should initiate edit task', () => {
    component.ngOnInit();
    component.projectId = 1;
    component.setProject();
    component.getTasks();
    const taskId = 1;
    component.editTask(taskId);
    const task = component.tasks.find(t => t.Id == taskId);
    expect(task).toBeTruthy();
  });

  it('should set project', () => {
    component.ngOnInit();
    component.selectProject({ args: { item: { value: 1 } } });
    component.setProject();
    expect(component.projectId).toEqual(1);
  });

});
