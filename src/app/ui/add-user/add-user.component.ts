import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/model/user';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit {

  user: User;
  users: User[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.user = new User();
    this.getUsers();
  }

  getUsers() {
    this.dataService.getUsers().subscribe(data => this.users = data);
  }

  createUser() {
    this.dataService.addUser(this.user).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      error => console.log(error)
    );
  }

  updateUser() {
    this.dataService.addUser(this.user).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      error => console.log(error)
    );
  }

  editUser(id: number) {
    this.dataService.getUserById(id).subscribe(
      data => this.user = data,
      error => console.log(error)
    );
  }

  deleteUser(id: number) {
    this.dataService.deleteUser(id).subscribe(
      res => {
        console.log(res);
        this.ngOnInit();
      },
      error => console.log(error)
    )
  }

}
