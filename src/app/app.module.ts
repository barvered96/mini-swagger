import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './home-page/home-page.component';
import { HeaderComponent } from './header/header.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import {LocalStorageService} from '../services/storage-service/local-storage-service.service';
import { EditResourceComponent } from './edit-resource/edit-resource.component';
import { CreateResourceComponent } from './create-resource/create-resource.component';
import {FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { ViewResourceComponent } from './view-resource/view-resource.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    HomeViewComponent,
    CreateProjectComponent,
    ViewProjectComponent,
    EditResourceComponent,
    CreateResourceComponent,
    EditProjectComponent,
    ViewResourceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  entryComponents: [EditResourceComponent],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
