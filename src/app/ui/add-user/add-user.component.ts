import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  user: User;
  users: User[];
  constructor() { }

  ngOnInit() {
    this.user = new User();
    this.users = [
      { Id: 1, FirstName: 'FirstName-01', LastName: 'LastName-01', EmployeeId: 100 },
      { Id: 2, FirstName: 'FirstName-02', LastName: 'LastName-02', EmployeeId: 200 }
    ];
  }

}
