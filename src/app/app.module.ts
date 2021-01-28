import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { ProjectActionsComponent } from './project-actions/project-actions.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import {LocalStorageService} from '../services/storage-service/local-storage-service.service';
import { ResourceActionsComponent } from './resource-actions/resource-actions.component';
import {FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ViewResourceComponent } from './view-resource/view-resource.component';
import {ViewModelComponent} from './view-model/view-model.component';
import { ModelJsonCreatorComponent } from './model-json-creator/model-json-creator.component';
import { UrlValidDirective } from '../directives/url-directive/url-valid.directive';
import { ModelActionsComponent } from './model-actions/model-actions.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteValidDirective } from '../directives/route-directive/route-valid.directive';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    UrlValidDirective,
    HomePageComponent,
    HeaderComponent,
    HomeViewComponent,
    ProjectActionsComponent,
    ViewProjectComponent,
    ResourceActionsComponent,
    ViewResourceComponent,
    ViewModelComponent,
    ModelJsonCreatorComponent,
    UrlValidDirective,
    ModelActionsComponent,
    RouteValidDirective,
    ErrorPageComponent,
    ConfirmDeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
