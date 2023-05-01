import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProjectActionsComponent} from './project-actions/project-actions.component';
import {ViewProjectComponent} from './view-project/view-project.component';
import {ResourceActionsComponent} from './resource-actions/resource-actions.component';
import {HomeViewComponent} from './home-view/home-view.component';
import {ModelActionsComponent} from './model-actions/model-actions.component';
import {ViewResourceComponent} from './view-resource/view-resource.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeViewComponent},
  { path: 'createModel', component: ModelActionsComponent},
  { path: 'createResource', component: ResourceActionsComponent, pathMatch: 'full'},
  { path: 'viewProjects', component: ViewProjectComponent},
  { path: 'viewResources', component: ViewResourceComponent, pathMatch: 'full'},
  { path: 'project', component: ProjectActionsComponent}
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
