import {Component, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {Resource} from '../interfaces/resource';
import {Project} from '../interfaces/project';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})

export class EditProjectComponent implements OnInit {
  public onClose: Subject<Project>;
  public name: string;
  public fullApiUrl: string;
  public description: string;
  public resources: Resource[];

  constructor(public ref: BsModalRef<EditProjectComponent>) {}

  ngOnInit(): void {
    this.onClose = new Subject<Project>();
  }

  public onSaveProject(): void {
    const project: Project = {
      name: this.name,
      fullApiUrl: this.fullApiUrl,
      description: this.description,
      resources: this.resources
    };

    this.onClose.next(project);
    this.ref.hide();
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.ref.hide();
  }


}
