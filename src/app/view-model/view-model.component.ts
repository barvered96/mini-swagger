import { Component, OnInit } from '@angular/core';
import {Model} from '../../interfaces/model';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project-service/project.service';
import {ToastrService} from 'ngx-toastr';
import {Subject, zip} from 'rxjs';
import {ModelService} from '../../services/model-service/model.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ModelField} from '../../interfaces/modelField';

@Component({
  selector: 'app-view-models',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent implements OnInit {
  public modelName: string;
  public modelFields: ModelField[];
  public newModel: boolean;
  public projectName; string;
  public numFields: number;
  public types = ['number', 'string',' boolean', 'Array<number>', 'Array<string>', 'Array<boolean>'];
  public onClose: Subject<any>;

  constructor(private ref: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject<any>();
  }

  changeNumFields(): void {
    if (this.numFields >= this.modelFields.length) {
      for (let index = 0; index < this.numFields - this.modelFields.length; index++) {
        this.modelFields.push({name: '', fieldType: ''});
      }
    } else {
      for (let index = 0; index < this.modelFields.length - this.numFields; index++) {
        this.modelFields.pop();
      }
    }
  }

  onCreate(): void {
    const model: Model = {
      name: this.modelName,
      fields: this.modelFields
    };
    this.onClose.next([model, false]);
    this.ref.hide();
  }

  onDelete(): void {
    const model: Model = {
      name: this.modelName,
      fields: this.modelFields,
    };
    this.onClose.next([model, true]);
    this.ref.hide();
  }

  onCancel(): void {
      this.onClose.next([null, false]);
      this.ref.hide();
  }

  fieldValidity(): boolean {
    for (const field of this.modelFields) {
      if (!field.name || !field.fieldType) {
        return false;
      }
    }
    return true;
  }

  formValidity(): boolean {
    return this.fieldValidity() && this.modelName.length >= 3;
  }

}

