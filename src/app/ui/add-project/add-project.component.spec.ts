import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';
import { jqxListBoxComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxlistbox';

import { AddProjectComponent } from './add-project.component';
import { DataService } from 'src/app/service/data.service';
import { Project } from 'src/app/model/project';
import { User } from 'src/app/model/user';

describe('AddProjectComponent', () => {
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
    getUsers(): Observable<User[]> {
      return of(this.Users);
    }

    getProjects(): Observable<Project[]> {
      return of(this.Projects);
    }
  }
  let component: AddProjectComponent;
  let fixture: ComponentFixture<AddProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [
        AddProjectComponent,
        jqxListBoxComponent],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
