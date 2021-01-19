import {Component, OnInit} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';
import {Resource} from '../interfaces/resource';

@Component({
  selector: 'app-edit-resource',
  templateUrl: './edit-resource.component.html',
  styleUrls: ['./edit-resource.component.css']
})
export class EditResourceComponent implements OnInit {
  public onClose: Subject<Resource>;
  public name: string;
  public apiSuffix: string;
  public description: string;
  public method: string;

  constructor(public ref: BsModalRef<EditResourceComponent>) {}

  ngOnInit(): void {
    this.onClose = new Subject<Resource>();
  }

  public onSaveResource(): void {
    const resource = {
      name: this.name,
      apiSuffix: this.apiSuffix,
      description: this.description,
      method: this.method,
    };

    this.onClose.next(resource);
    this.ref.hide();
  }

  public onCancel(): void {
    this.onClose.next(null);
    this.ref.hide();
  }


}
