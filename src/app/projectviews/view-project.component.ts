import {Component, OnChanges, OnInit} from '@angular/core';
import {ProjectService} from '../project.service';
import {Project} from '../project';
import {DialogService} from '../dialog.service';
import {Observable} from 'rxjs';
import {ResourceService} from '../resource.service';
import {Resource} from '../resource';


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
    if (this.editResource === ''){
      return;
    }
    const resourceArray = this.editResource.split(',');
    const previousName = resourceArray[0];
    const resource: Resource = {
      name: resourceArray[0],
      api: resourceArray[1],
      description: resourceArray[2],
      action: resourceArray[3]
    };
    this.dialog.openDialogResource(resource).subscribe(result => {
      if (result) {
        if (result.delete_flag){
          this.resourceService.deleteResource(projectIndex, resource);
          this.projects = this.projectService.getProjects();
        }
        else {
          this.resourceService.editResource(projectIndex, previousName, result);
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
