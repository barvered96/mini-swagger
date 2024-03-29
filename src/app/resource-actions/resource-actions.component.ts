import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Resource} from '../../interfaces/resource';
import {ResourceService} from '../../services/resource-service/resource.service';
import {ActivatedRoute, Params} from '@angular/router';
import {EntityActionsComponent} from '../entity-actions/entity-actions.component';
import {ToastrService} from 'ngx-toastr';

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
  public method: string;

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService,
              private resourceService: ResourceService, protected toastr: ToastrService) { super(toastr); }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.projectName = params.projectName;
      this.name = params.name;
      this.edit = params.edit;
      this.route = params.route;
      this.description = params.description;
      this.method = params.method;
      this.projectService.getProjects().subscribe(projects => {
        for (const [index, project] of projects.entries()) {
          if (project.name === this.projectName) {
            this.projectIndex = index;
          }
        }
      });
    });
  }

  addResource(): void {
    const resource: Resource = {
      name: this.name,
      route: this.route,
      description: this.description,
      method: this.method
    };
    super.addEntity(resource, this.resourceService.addResource(this.projectIndex, resource), 'Resource');
  }

  public onEdit(): void {
    const resource: Resource = {
      name: this.name,
      route: this.route,
      description: this.description,
      method: this.method
    };
    super.editEntity(resource, this.resourceService.editResource(this.projectIndex, this.name, resource), 'Resource');
  }


  pathValidity(): boolean {
    try {
      return this.route.startsWith('/');
    }
    catch (e) { return false; }
  }

  formValidity(): boolean {
    try {
      if (this.name.length >= 3 && this.pathValidity()) {
        return true;
      }
      return false;
    }
    catch (e) { return false; }
  }
}
