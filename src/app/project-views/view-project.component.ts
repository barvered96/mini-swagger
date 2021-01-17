import {Component, OnChanges, OnInit} from '@angular/core';
import {ProjectService} from '../services/project-service/project.service';
import {Project} from '../interfaces/project';
import {DialogService} from '../services/dialog-service/dialog.service';
import {Observable} from 'rxjs';
import {ResourceService} from '../services/resource-service/resource.service';
import {Resource} from '../interfaces/resource';


@Component({
  selector: 'app-projectviews',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  public projects: Observable<Project[]>;
  public editResource: string;
  constructor(private projectService: ProjectService, private resourceService: ResourceService, public dialog: DialogService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
  openDialogProject(name: string, api: string, description: string): void {
    this.dialog.openDialogProject({name, api, description}).subscribe(result => {
      if (result) {
        this.projectService.editProject(name, result);
        this.projects = this.projectService.getProjects();
      }
    });
  }
  openDialogResource(projectIndex: number): void {
    if (!this.editResource){
      return;
    }
    const resource: Resource = {
      name: this.editResource[0],
      api: this.editResource[1],
      description: this.editResource[2],
      action: this.editResource[3]
    };
    this.dialog.openDialogResource(resource).subscribe(result => {
      if (result) {
        if (result.delete_flag){
          this.resourceService.deleteResource(projectIndex, resource);
          this.projects = this.projectService.getProjects();
        }
        else {
          this.resourceService.editResource(projectIndex, this.editResource[0], result);
          this.projects = this.projectService.getProjects();
        }
      }
    });
  }
  deleteProject(name: string): void {
    this.projectService.deleteProject(name);
    this.projects = this.projectService.getProjects();
  }
  deleteResource(projectIndex: number, name: string, api: string, description: string, action: string): void {
    const resource: Resource = {
      name,
      api,
      description,
     action
    };
    this.resourceService.deleteResource(projectIndex, resource);
    this.projects = this.projectService.getProjects();
  }

}
