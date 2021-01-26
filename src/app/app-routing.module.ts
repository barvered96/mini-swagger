import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {ProjectActionsComponent} from './project-actions/project-actions.component';
import {ViewProjectComponent} from './view-project/view-project.component';
import {ResourceActionsComponent} from './resource-actions/resource-actions.component';
import {HomeViewComponent} from './home-view/home-view.component';
import {ModelActionsComponent} from './model-actions/model-actions.component';
import {ErrorPageComponent} from './error-page/error-page.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeViewComponent},
  { path: 'model', component: ModelActionsComponent},
  { path: 'resource', component: ResourceActionsComponent},
  { path: 'view-projects', component: ViewProjectComponent},
  { path: 'project', component: ProjectActionsComponent},
  { path: '**', component: ErrorPageComponent}
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
