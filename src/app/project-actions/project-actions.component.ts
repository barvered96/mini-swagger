import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Project} from '../../interfaces/project';
import {Resource} from '../../interfaces/resource';
import {EntityActionsComponent} from '../entity-actions/entity-actions.component';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Model} from '../../interfaces/model';
import {zip} from 'rxjs';
import {EntitiesEnum} from '../../enums/entities.enum';

@Component({
  selector: 'app-project',
  templateUrl: './project-actions.component.html',
  styleUrls: ['./project-actions.component.css', '../entity-actions/entity-actions.component.css']
})
export class ProjectActionsComponent extends EntityActionsComponent implements OnInit {
  public fullApiUrl: string;
  public resources: Resource[] = [];
  public models: Model[] = [];
  public editURL = false;
  public description: string;
  public editDescription = false;

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectService, protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    const mergeObservables = zip(this.activatedRoute.queryParams, this.projectService.getProjects());
    mergeObservables.subscribe((params: Params) => {
      this.name = params[0].name;
      this.edit = params[0].edit;
      for (const project of params[1]) {
        if (project.name === this.name) {
          this.fullApiUrl = project.fullApiUrl;
          this.description = project.description;
        }
      }
    });
  }

  addProject(): void {
    const project: Project = {
      name: this.name,
      fullApiUrl: this.fullApiUrl,
      description: this.description,
      resources: this.resources,
      models: this.models
    };
    super.addEntity(project, this.projectService.addProject(project), EntitiesEnum.Project);
    this.edit = true;
  }

  public onEdit(): void {
    this.editDescription = false;
    this.editURL = false;
    const project: Project = {
      name: this.name,
      fullApiUrl: this.fullApiUrl,
      description: this.description,
      resources: this.resources,
    };
    super.editEntity(project, this.projectService.editProject(this.name, project), EntitiesEnum.Project);
  }
}
