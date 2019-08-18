import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { RouterTestingModule } from '@angular/router/testing'
import { Observable, of, BehaviorSubject, throwError } from 'rxjs';

import { AddUserComponent } from './add-user.component';
import { DataService } from 'src/app/service/data.service';
import { User } from 'src/app/model/user';

describe('AddUserComponent', () => {
  class MockDataService { 
    Users: User[] = [
      { 
        Id:1, FirstName:'FirstName-01', LastName:'LastName-01', EmployeeId:100
      },
      { 
        Id:2, FirstName:'FirstName-02', LastName:'LastName-02', EmployeeId:200
      }
    ];
    getUsers() : Observable<User[]>
    {
      return of(this.Users);
    }
  }

  let component: AddUserComponent;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        RouterTestingModule],
      declarations: [AddUserComponent],
      providers: [
        { provide: DataService, useClass: MockDataService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
