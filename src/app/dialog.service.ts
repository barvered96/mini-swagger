import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from './dialog/dialog.component';
import {Project} from './project';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }
  openDialogProject(project: Project): Observable<Project> {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: project
    });
    const subject = new Subject<Project>();
    dialogRef.afterClosed().subscribe(result => {
      subject.next(result);
    });
    return subject.asObservable();
  }
}
