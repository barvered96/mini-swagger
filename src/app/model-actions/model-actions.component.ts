import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {EntityActionsComponent} from '../entity-actions/entity-actions.component';
import {ActivatedRoute, Params} from '@angular/router';
import {ProjectService} from '../../services/project-service/project.service';
import {ToastrService} from 'ngx-toastr';
import {Model} from '../../interfaces/model';
import {ModelService} from '../../services/model-service/model.service';
import {Project} from '../../interfaces/project';
import {EntitiesEnum} from '../../enums/entities.enum';
import {combineLatest} from 'rxjs';

@Component({
  selector: 'app-model-actions',
  templateUrl: './model-actions.component.html',
  styleUrls: ['./model-actions.component.css']
})
export class ModelActionsComponent extends EntityActionsComponent implements OnInit {
  modelForm: FormGroup;
  public project: Project;
  public numberFields: number;
  public types;

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute,
              private projectService: ProjectService, private modelService: ModelService,
              protected toastr: ToastrService) {
    super(toastr);
    this.types = modelService.types;
  }

  ngOnInit(): void {
    const mergeObservables = combineLatest<[Params, Project[]]>(this.activatedRoute.queryParams, this.projectService.getProjects());
    mergeObservables.subscribe(([params, projects]) => {
      this.project = projects.find(project => project.name === params.projectName);
      this.name = params.modelName;
      this.edit = params.edit;
      this.modelForm = this.formBuilder.group({
        modelName: new FormControl({value: this.name, disabled: this.edit}, [Validators.required, Validators.minLength(3)]),
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
          fieldType: ['Number', Validators.required]
        }));
        this.numberFields = 1;
      }
    });
  }

  onExtraField(): void {
    this.numberFields += 1;
    this.formArray.push(this.formBuilder.group({
      name: ['', Validators.required],
      fieldType: ['', Validators.required]
    }));
  }

  onMinusField(index: number): void {
    if (index > 0 || index === 0 && this.numberFields > 1) {
      this.formArray.removeAt(index);
      this.numberFields -= 1;
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
