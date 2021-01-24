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

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    HomeViewComponent,
    ProjectActionsComponent,
    ViewProjectComponent,
    ResourceActionsComponent,
    ViewResourceComponent,
    ViewModelComponent,
    ModelJsonCreatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
