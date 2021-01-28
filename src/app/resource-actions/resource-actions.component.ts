import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Resource} from '../../interfaces/resource';
import {ResourceService} from '../../services/resource-service/resource.service';
import {ActivatedRoute, Params} from '@angular/router';
import {EntityActionsComponent} from '../entity-actions/entity-actions.component';
import {ToastrService} from 'ngx-toastr';
import {zip} from 'rxjs';
import {Project} from '../../interfaces/project';
import {EntitiesEnum} from '../../enums/entities.enum';
import {MethodsEnum} from '../../enums/methods.enum';

@Component({
  selector: 'app-resource',
  templateUrl: './resource-actions.component.html',
  styleUrls: ['./resource-actions.component.css']
})
export class ResourceActionsComponent extends EntityActionsComponent implements OnInit {
  public route: string;
  public body: string;
  public options = Object.keys(MethodsEnum).filter(key => isNaN(parseInt(key, 10)));
  public description: string;
  public project: Project;
  public method: string;

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService,
              private resourceService: ResourceService, protected toastr: ToastrService) {
    super(toastr);
  }

  ngOnInit(): void {
    const mergeObservables = zip(this.activatedRoute.queryParams, this.projectService.getProjects());
    mergeObservables.subscribe((params: Params) => {
      this.project = params[1].find(project => project.name === params[0].projectName);
      this.name = params[0].name;
      this.edit = params[0].edit;
      this.route = params[0].route;
      this.body = params[0].body;
      this.description = params[0].description;
      this.method = params[0].method;
    });
  }

  addResource(): void {
    const resource: Resource = {
      name: this.name,
      route: this.route,
      description: this.description,
      method: this.method,
      body: this.body
    };
    super.addEntity(resource, this.resourceService.addResource(this.project, resource), EntitiesEnum.Resource);
  }

  public onEdit(): void {
    if (this.method === 'GET')  {
      this.body = '';
    }
    const resource: Resource = {
      name: this.name,
      route: this.route,
      description: this.description,
      method: this.method,
      body: this.body
    };
    super.editEntity(resource, this.resourceService.editResource(this.project, resource), EntitiesEnum.Resource);
  }
}
