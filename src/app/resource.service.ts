import { Injectable } from '@angular/core';
import {LocalStorageService} from './local-storage-service.service';
import {PopupService} from './popup.service';
import {Project, PROJECT_KEY} from './project';
import {Observable, Subject} from 'rxjs';
import {Resource} from './resource';
import {ProjectService} from './project.service';
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
        this.popUpService.openSnackBar(`Successfully created Resource ${resource.name} in Project ${currentTasks[projectIndex].name}`,
          'Remove', 'green-snackbar');
        return;
      }
      else {
        this.popUpService.openSnackBar(`Failed to create Resource ${resource.name} in Project ${currentTasks[projectIndex].name}`,
          'Remove', 'red-snackbar');
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
        this.popUpService.openSnackBar(`Successfully deleted ${task.name}`, 'Remove', 'green-snackbar');
        return;
      }
      this.popUpService.openSnackBar(`Failed to delete ${currentTasks[projectIndex].name}`, 'Remove', 'red-snackbar');
    });
  }

  editResource(projectIndex: number, beforeEditName: string, editedResource: Resource): void {
    this.projectService.getProjects().subscribe(currentTasks => {
      const task = this.getResource(currentTasks[projectIndex], beforeEditName);
      if (task) {
        const index = currentTasks[projectIndex].resources.indexOf(task);
        currentTasks[projectIndex].resources.splice(index, 1);
        currentTasks[projectIndex].resources.splice(index, 0, editedResource);
        this.localStorageService.setStorage(PROJECT_KEY, currentTasks);
        this.popUpService.openSnackBar(`Successfully edited ${task.name}`, 'Remove', 'green-snackbar');
        return;
      }
      this.popUpService.openSnackBar(`Failed to edit ${currentTasks[projectIndex].name}`, 'Remove', 'red-snackbar');
    });
  }

}
