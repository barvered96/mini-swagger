import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModelField} from '../../interfaces/modelField';
import {EntityActionsComponent} from '../entity-actions/entity-actions.component';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectService} from '../../services/project-service/project.service';
import {ToastrService} from 'ngx-toastr';
import {zip} from 'rxjs';

@Component({
  selector: 'app-model-actions',
  templateUrl: './model-actions.component.html',
  styleUrls: ['./model-actions.component.css']
})
export class ModelActionsComponent extends EntityActionsComponent implements OnInit {
  modelForm: FormGroup;
  public projectIndex: number;
  public projectName: string;
  public numberFields = 1;
  public options = ['string', 'number', 'boolean', 'Array<number>', 'Array<string>', 'Array<boolean>'];
  public fields: ModelField[] = [{name: 'Some Field', fieldType: 'string'}];

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private projectService: ProjectService, protected toastr: ToastrService) { super(toastr) }

  ngOnInit(): void {
    const mergeObservables = zip(this.activatedRoute.queryParams, this.projectService.getProjects());
    mergeObservables.subscribe((params: Params) => {
      this.projectName = params[0].projectName;
      this.name = params[0].modelName;
      if (params[0].fields) {
        this.fields = params[0].fields;
      }
      this.edit = params[0].edit;
      for (const [index, project] of params[1].entries()) {
        if (project.name === this.projectName) {
          this.projectIndex = index;
        }
      }
      this.modelForm = this.formBuilder.group({
        modelName: new FormControl(this.name),
        fields:  new FormArray([])
      });
      this.t.push(this.formBuilder.group( {
        fieldName: ['Some Field', [Validators.required, Validators.minLength]],
        fieldType: ['number', Validators.required]
      }));
    });
  }

  onExtraField(): void {
    this.numberFields += 1;
    this.onChangeNumFields();
  }

  onMinusField(): void {
    if (this.numberFields > 1) {
      this.numberFields -= 1;
      this.onChangeNumFields();
    }
  }

  onChangeNumFields(): void {
    if (this.t.length < this.numberFields) {
      for (let i = this.t.length; i < this.numberFields; i++) {
        this.t.push(this.formBuilder.group({
          fieldName: ['', [Validators.required, Validators.minLength]],
          fieldType: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.t.length; i >= this.numberFields; i--) {
        this.t.removeAt(i);
      }
    }
  }

  addModel(): void {
    console.log(this.t.value);
  }

  editModel(): void {

  }

  get f(): any { return this.modelForm.controls; }
  get t(): any { return this.f.fields as FormArray; }

}
