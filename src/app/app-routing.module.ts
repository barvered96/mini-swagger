import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProjectComponent} from './project/project.component';
import {HomeviewComponent} from './homeview/homeview.component';
import {ViewProjectComponent} from './projectviews/view-project.component';


const routes: Routes = [
  { path: '', component: HomeviewComponent},
  { path: 'viewProjects', component: ViewProjectComponent},
  { path: 'createProject', component: ProjectComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }