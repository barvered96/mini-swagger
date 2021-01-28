import {Component, Input, OnChanges} from '@angular/core';
import {Model} from '../../interfaces/model';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project-service/project.service';
import {ToastrService} from 'ngx-toastr';
import {ModelService} from '../../services/model-service/model.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Resource} from '../../interfaces/resource';
import {Project} from '../../interfaces/project';
import {EntitiesEnum} from '../../enums/entities.enum';
import {ConfirmDeleteComponent} from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-view-models',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent implements OnChanges {
  public models: Model[];
  public project: Project;
  @Input() public resources: Resource[];
  @Input() public projectName: string;

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService,
              private modelService: ModelService,  private toastr: ToastrService, private modalService: BsModalService) {}

  ngOnChanges(): void {
    this.projectService.getProjects().subscribe(currentProjects => {
      this.project = currentProjects.find(project => project.name === this.projectName);
      this.models = this.project.models;
    });
  }

  deleteModel(model: Model): void {
    const confirmDelete = this.modalService.show(ConfirmDeleteComponent, {initialState: {name: model.name, type: EntitiesEnum.Model}});
    confirmDelete.content.onClose.subscribe(result => {
      if (result) {
        this.modelService.deleteModel(this.project, model).subscribe(projects => {
            this.toastr.success(`Successfully deleted model ${model.name} in project ${this.project.name}`, EntitiesEnum.Model);
            this.models = this.project.models;
          },
          err => this.toastr.error(err, EntitiesEnum.Model)
        );
      }
    });
  }
}

