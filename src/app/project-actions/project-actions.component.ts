import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Project} from '../../interfaces/project';
import {Resource} from '../../interfaces/resource';
import {EntityActionsComponent} from '../entity-actions/entity-actions.component';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-project',
  templateUrl: './project-actions.component.html',
  styleUrls: ['./project-actions.component.css', '../entity-actions/entity-actions.component.css']
})
export class ProjectActionsComponent extends EntityActionsComponent implements OnInit {
  public fullApiUrl: string;
  public resources: Resource[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private projectService: ProjectService, protected toastr: ToastrService) { super(toastr); }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe( (params: Params) => {
      this.name = params.name;
      this.edit = params.edit;
      this.fullApiUrl = params.fullApiUrl;
      this.description = params.description;
    });
  }

  addProject(): void {
    const project: Project = {
      name: this.name,
      fullApiUrl: this.fullApiUrl,
      description: this.description,
      resources: this.resources
    };
    super.addEntity(project, this.projectService.addProject(project), 'Project');
  }

  public onEdit(): void {
    const project: Project = {
      name: this.name,
      fullApiUrl: this.fullApiUrl,
      description: this.description,
      resources: this.resources
    };
    super.editEntity(project, this.projectService.editProject(this.name, project), 'Project');
  }

  validURL(): boolean {
    try {
      const properUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
      return properUrl.test(this.fullApiUrl);
    }
    catch (e) { return false; }
  }

  formValidity(): boolean {
    try {
      if (this.name.length >= 3 && this.validURL()) {
        return true;
      }
      return false;
    }
    catch (e) { return false; }
  }
}
