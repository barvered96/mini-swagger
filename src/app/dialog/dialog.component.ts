import {Component, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {Resource} from '../interfaces/resource';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  public onClose: Subject<any>;
  public name: string;
  public api: string;
  public description: string;
  public resources: Resource[];
  public action: string;
  constructor(public ref: BsModalRef<DialogComponent>) {}
  ngOnInit(): void {
    this.onClose = new Subject();
  }
  public onSaveProject(): void {
    const project = {
      name: this.name,
      api: this.api,
      description: this.description,
      resources: this.resources
    };
    this.onClose.next(project);
    this.ref.hide();
  }

  public onSaveResource(): void {
    const resource = {
      name: this.name,
      api: this.api,
      description: this.description,
      action: this.action,
      delete_flag: false
    };
    this.onClose.next(resource);
    this.ref.hide();
  }

  public onDelete(): void {
    const resource = {
      name: this.name,
      api: this.api,
      description: this.description,
      action: this.action,
      delete_flag: true
    };
    this.onClose.next(resource);
    this.ref.hide();
  }

  public onCancel(): void {
    console.log('h');
    this.onClose.next(false);
    this.ref.hide();
  }


}
