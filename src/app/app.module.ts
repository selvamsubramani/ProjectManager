import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddProjectComponent } from './ui/add-project/add-project.component';
import { AddUserComponent } from './ui/add-user/add-user.component';
import { AddTaskComponent } from './ui/add-task/add-task.component';
import { EditTaskComponent } from './ui/edit-task/edit-task.component';
import { ViewTaskComponent } from './ui/view-task/view-task.component';

@NgModule({
  declarations: [
    AppComponent,
    AddProjectComponent,
    AddUserComponent,
    AddTaskComponent,
    EditTaskComponent,
    ViewTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
