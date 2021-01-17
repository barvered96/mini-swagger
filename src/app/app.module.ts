import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { HeaderComponent } from './header/header.component';
import { HomeviewComponent } from './homeview/homeview.component';
import { ProjectComponent } from './project/project.component';
import { ViewProjectComponent } from './view-project/view-project.component';
import {LocalStorageService} from '../services/storage-service/local-storage-service.service';
import { DialogComponent } from './dialog/dialog.component';
import { ResourceComponent } from './resource/resource.component';
import { NgSelectModule } from '@ng-select/ng-select';
import {FormsModule} from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import {DialogService} from '../services/dialog-service/dialog.service';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    HeaderComponent,
    HomeviewComponent,
    ProjectComponent,
    ViewProjectComponent,
    DialogComponent,
    ResourceComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgSelectModule,
    ToastrModule.forRoot(),
    ModalModule.forRoot(),
    FormsModule
  ],
  entryComponents: [DialogComponent],
  providers: [LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
