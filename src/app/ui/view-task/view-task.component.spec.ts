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

describe('ViewTaskComponent', () => {
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

    Tasks: Task[] = [
      {
        Id: 1, Name: 'Task-01', Priority: 1, StartDate: new Date(), EndDate: new Date(), IsCompleted: false, IsParent: false,
        Owner: new User(),
        Parent: new Task(),
        Project: {
          Id: 1, Name: 'Project-01', Priority: 5, StartDate: null, EndDate: null, IsDateEnabled: false, IsSuspended: false, NoOfTasks: 5, Status: 'In progress',
          Manager: { Id: 1, FirstName: 'FirstName-01', LastName: 'LastName-01', EmployeeId: 100 }
        }
      }
    ];

    getProjects(): Observable<Project[]> {
      return of(this.Projects);
    }

    getTasksByProjectId(id: number): Observable<Task[]> {
      return of(this.Tasks);
    }

    getProjectById(id: number): Observable<Project> {
      const project = this.Projects.find(p => p.Id == 1);
      return of(project);
    }
  }

  let component: ViewTaskComponent;
  let fixture: ComponentFixture<ViewTaskComponent>;

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
