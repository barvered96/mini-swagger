import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Resource} from '../../interfaces/resource';
import {ResourceService} from '../../services/resource-service/resource.service';
import {ActivatedRoute, Params} from '@angular/router';
import {EntityActionsComponent} from '../entity-actions/entity-actions.component';
import {ToastrService} from 'ngx-toastr';
import {Model} from '../../interfaces/model';
import {zip} from 'rxjs';

@Component({
  selector: 'app-resource',
  templateUrl: './resource-actions.component.html',
  styleUrls: ['./resource-actions.component.css']
})
export class ResourceActionsComponent extends EntityActionsComponent implements OnInit {
  public projectIndex: number;
  public projectName: string;
  public options: string[] = ['DELETE', 'POST', 'GET', 'PUT'];
  public route: string;
  public body: string;
  public description: string;
  public parentProjectModels: Model[];
  public method: string;

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService,
              private resourceService: ResourceService, protected toastr: ToastrService) { super(toastr); }

  ngOnInit(): void {
    const mergeObservables = zip(this.activatedRoute.queryParams, this.projectService.getProjects());
    mergeObservables.subscribe((params: Params) => {
      this.projectName = params[0].projectName;
      this.name = params[0].name;
      this.edit = params[0].edit;
      this.route = params[0].route;
      this.body = params[0].body;
      this.description = params[0].description;
      this.method = params[0].method;
      for (const [index, project] of params[1].entries()) {
        if (project.name === this.projectName) {
          this.projectIndex = index;
          this.parentProjectModels = params[1][index].models;
        }
      }
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
    super.addEntity(resource, this.resourceService.addResource(this.projectIndex, resource), 'Resource');
  }

  public onEdit(): void {
    const resource: Resource = {
      name: this.name,
      route: this.route,
      description: this.description,
      method: this.method,
      body: this.body
    };
    super.editEntity(resource, this.resourceService.editResource(this.projectIndex, resource), 'Resource');
  }


  pathValidity(): boolean {
    try {
      return this.route.startsWith('/');
    }
    catch (e) { return false; }
  }

  formValidity(): boolean {
    try {
      if (this.name.length >= 3 && this.pathValidity() && this.body) {
        return true;
      }
      return false;
    }
    catch (e) { return false; }
  }
}
