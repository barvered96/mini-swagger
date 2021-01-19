import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {CreateProjectComponent} from './create-project/create-project.component';
import {ViewProjectComponent} from './view-project/view-project.component';
import {CreateResourceComponent} from './create-resource/create-resource.component';
import {HomeViewComponent} from './home-view/home-view.component';
import {CreateModelComponent} from './create-model/create-model.component';
import {ViewResourceComponent} from './view-resource/view-resource.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeViewComponent},
  { path: 'createModel', component: CreateModelComponent},
  { path: 'createResource', component: CreateResourceComponent, pathMatch: 'full'},
  { path: 'viewProjects', component: ViewProjectComponent},
  { path: 'viewResources', component: ViewResourceComponent, pathMatch: 'full'},
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
