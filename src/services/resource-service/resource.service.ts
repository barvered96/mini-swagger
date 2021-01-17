import { Injectable } from '@angular/core';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {PopupService} from '../popup-service/popup.service';
import {Project, PROJECT_KEY} from '../../app/interfaces/project';
import {Observable, Subject} from 'rxjs';
import {Resource} from '../../app/interfaces/resource';
import {ProjectService} from '../project-service/project.service';
import {Local} from 'protractor/built/driverProviders';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  constructor(private localStorageService: LocalStorageService, private projectService: ProjectService,
              private popUpService: PopupService) { }
  private getResource(project: Project, name: string): Resource {
    for (const source of project.resources) {
      if (name === source.name) {
        return source;
      }
    }
    return null;
  }

  addResource(projectIndex: number, resource: Resource): void {
    this.projectService.getProjects().subscribe(currentTasks => {
      const task = this.getResource(currentTasks[projectIndex], resource.name);
      if (!task) {
        currentTasks[projectIndex].resources.push(resource);
        this.localStorageService.setStorage(PROJECT_KEY, currentTasks);
        this.popUpService.showSuccess(`Successfully created Resource ${resource.name} in Project ${currentTasks[projectIndex].name}`,
          'Resource');
        return;
      }
      else {
        this.popUpService.showFailure(`Failed to create Resource ${resource.name} in Project ${currentTasks[projectIndex].name}`,
          'Resource');
        }
      }
    );
  }

  deleteResource(projectIndex: number, resource: Resource): void {
    this.projectService.getProjects().subscribe(currentTasks => {
      const task = this.getResource(currentTasks[projectIndex], resource.name);
      if (task) {
        currentTasks[projectIndex].resources.splice(currentTasks[projectIndex].resources.indexOf(task), 1);
        this.localStorageService.setStorage(PROJECT_KEY, currentTasks);
        this.popUpService.showSuccess(`Successfully deleted ${resource.name} in Project ${currentTasks[projectIndex].name}`, 'Resource');
        return;
      }
      this.popUpService.showFailure(`Failed to delete ${resource.name} in Project ${currentTasks[projectIndex].name}`, 'Resource');
    });
  }

  editResource(projectIndex: number, beforeEditName: string, editedResource: Resource): void {
    if (editedResource.name === '') {
      this.popUpService.showFailure(`Resource name cannot be empty`, 'Resource');
      return;
    }
    this.projectService.getProjects().subscribe(currentTasks => {
      const task = this.getResource(currentTasks[projectIndex], beforeEditName);
      if (task) {
        const index = currentTasks[projectIndex].resources.indexOf(task);
        currentTasks[projectIndex].resources.splice(index, 1);
        currentTasks[projectIndex].resources.splice(index, 0, editedResource);
        this.localStorageService.setStorage(PROJECT_KEY, currentTasks);
        this.popUpService.showSuccess(`Successfully edited ${editedResource.name} in Project ${currentTasks[projectIndex].name}`, 'Resource');
        return;
      }
      this.popUpService.showFailure(`Failed to edit ${editedResource.name} in Project ${currentTasks[projectIndex].name}`, 'Resource');
    });
  }

}
