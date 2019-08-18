import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http'
import { Router } from '@angular/router'
import { environment } from './../../environments/environment'
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  UserAPI: string = environment.serviceUrl + "user/";
  ProjectAPI: string = environment.serviceUrl + "project/";
  TaskAPI: string = environment.serviceUrl + "task/";

  constructor(private http: HttpClient) { }

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

}
