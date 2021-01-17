import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateProjectComponent} from './create-project/create-project.component';
import {ViewProjectComponent} from './view-project/view-project.component';
import {CreateResourceComponent} from './create-resource/create-resource.component';
import {HomeviewComponent} from './homeview/homeview.component';
import {CreateModelComponent} from './create-model/create-model.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeviewComponent},
  { path: 'createModel', component: CreateModelComponent},
  { path: 'createResource', component: CreateResourceComponent},
  { path: 'viewProjects', component: ViewProjectComponent},
  { path: 'createProject', component: CreateProjectComponent}
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
