import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddProjectComponent } from './ui/add-project/add-project.component';
import { AddUserComponent } from './ui/add-user/add-user.component';
import { AddTaskComponent } from './ui/add-task/add-task.component';
import { EditTaskComponent } from './ui/edit-task/edit-task.component';
import { ViewTaskComponent } from './ui/view-task/view-task.component';

const routes: Routes = [
  { path: '', redirectTo: "/", pathMatch: 'full' },
  { path: 'addproject', component: AddProjectComponent },
  { path: 'addtask', component: AddTaskComponent },
  { path: 'adduser', component: AddUserComponent },
  { path: 'viewtask', component: ViewTaskComponent },
  { path: 'edittask', component: EditTaskComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const RoutingComponents = [AddProjectComponent, AddUserComponent, AddTaskComponent, EditTaskComponent, ViewTaskComponent]
