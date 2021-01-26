import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ModelField} from '../../interfaces/modelField';
import {EntityActionsComponent} from '../entity-actions/entity-actions.component';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectService} from '../../services/project-service/project.service';
import {ToastrService} from 'ngx-toastr';
import {zip} from 'rxjs';
import {Model} from '../../interfaces/model';
import {ModelService} from '../../services/model-service/model.service';
import {Project} from '../../interfaces/project';
import {EntitiesEnum} from '../../enums/entities.enum';
import {FieldTypesEnum} from '../../enums/field-types.enum';

@Component({
  selector: 'app-model-actions',
  templateUrl: './model-actions.component.html',
  styleUrls: ['./model-actions.component.css']
})
export class ModelActionsComponent extends EntityActionsComponent implements OnInit {
  modelForm: FormGroup;
  public project: Project;
  public numberFields: number;
  public options = Object.keys(FieldTypesEnum).filter(key => isNaN(parseInt(key, 10)));
  public fields: ModelField[] = [{name: 'Some Field', fieldType: 'string'}];

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private projectService: ProjectService, private modelService: ModelService,
              protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    const mergeObservables = zip(this.activatedRoute.queryParams, this.projectService.getProjects());
    mergeObservables.subscribe((params: Params) => {
      this.project = params[1].find(project => project.name === params[0].projectName);
      this.name = params[0].modelName;
      this.edit = params[0].edit;
      this.modelForm = this.formBuilder.group({
        modelName: new FormControl(this.name, [Validators.required, Validators.minLength(3)]),
        fields: new FormArray([])
      });
      if (this.edit) {
        const fields = this.project.models.find(model => model.name === this.name).fields;
        for (const field of fields) {
          this.formArray.push(this.formBuilder.group({
            name: [field.name, Validators.required],
            fieldType: [field.fieldType, Validators.required]
          }));
        }
        this.numberFields = fields.length;
      }
      else {
        this.formArray.push(this.formBuilder.group({
          name: ['Some Field', Validators.required],
          fieldType: ['number', Validators.required]
        }));
        this.numberFields = 1;
      }
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
    if (this.formArray.length < this.numberFields) {
      for (let i = this.formArray.length; i < this.numberFields; i++) {
        this.formArray.push(this.formBuilder.group({
          name: ['', Validators.required],
          fieldType: ['', Validators.required]
        }));
      }
    } else {
      for (let i = this.formArray.length; i >= this.numberFields; i--) {
        this.formArray.removeAt(i);
      }
    }
  }

  addModel(): void {
    const model: Model = {
      name: this.formVariables.modelName.value,
      fields: this.formArray.value
    };
    super.addEntity(model, this.modelService.addModel(this.project, model), EntitiesEnum.Model);
  }

  editModel(): void {
    const model: Model = {
      name: this.formVariables.modelName.value,
      fields: this.formArray.value
    };
    super.editEntity(model, this.modelService.editModel(this.project, model), EntitiesEnum.Model);
  }

  get formVariables(): any {
    return this.modelForm.controls;
  }

  get formArray(): any {
    return this.formVariables.fields as FormArray;
  }

}
