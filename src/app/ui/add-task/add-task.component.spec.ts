import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { jqxListBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';

import { AddTaskComponent } from './add-task.component';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';
import { Task } from 'src/app/model/task';
import { DataService } from 'src/app/service/data.service';

describe('AddTaskComponent', () => {

  class MockDataService {
    Projects: Project[] = [
      {
        Id: 1, Name: 'Project-01', Priority: 5, StartDate: null, EndDate: null, IsDateEnabled: false, IsSuspended: false, NoOfTasks: 5, Status: 'In progress',
        Manager: { Id: 1, FirstName: 'FirstName-01', LastName: 'LastName-01', EmployeeId: 100 }
      },
      {
        Id: 2, Name: 'Project-02', Priority: 10, StartDate: null, EndDate: null, IsDateEnabled: false, IsSuspended: false, NoOfTasks: 5, Status: 'In progress',
        Manager: { Id: 2, FirstName: 'FirstName-02', LastName: 'LastName-02', EmployeeId: 200 }
      }
    ];

    Users: User[] = [
      {
        Id: 1, FirstName: 'FirstName-01', LastName: 'LastName-01', EmployeeId: 100
      },
      {
        Id: 2, FirstName: 'FirstName-02', LastName: 'LastName-02', EmployeeId: 200
      }
    ];

    Tasks: Task[] = [

    ];

    getUsers(): Observable<User[]> {
      return of(this.Users);
    }

    getProjects(): Observable<Project[]> {
      return of(this.Projects);
    }

    getParentTasks(): Observable<Task[]> {
      return of(this.Tasks);
    }
  }

  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [
        AddTaskComponent,
        jqxListBoxComponent],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
