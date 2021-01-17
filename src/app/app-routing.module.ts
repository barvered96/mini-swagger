import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProjectComponent} from './project/project.component';
import {ViewProjectComponent} from './project-views/view-project.component';
import {ResourceComponent} from './resource/resource.component';
import {HomeviewComponent} from './homeview/homeview.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeviewComponent},
  { path: 'createResource', component: ResourceComponent},
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
