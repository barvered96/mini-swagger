import { Injectable } from '@angular/core';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {Project, PROJECT_KEY} from '../../app/interfaces/project';
import {Observable, throwError} from 'rxjs';
import {Resource} from '../../app/interfaces/resource';
import {ProjectService} from '../project-service/project.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ResourceService {

  constructor(private localStorageService: LocalStorageService, private projectService: ProjectService) { }

  private getResource(project: Project, name: string): Resource {
    for (const source of project.resources) {
      if (name === source.name) {
        return source;
      }
    }

    return null;
  }

  addResource(projectIndex: number, resource: Resource): Observable<Project[]> {
    return this.projectService.getProjects().pipe(
      tap(currentResources => {
      const foundResource = this.getResource(currentResources[projectIndex], resource.name);
      if (!foundResource) {
        currentResources[projectIndex].resources.push(resource);
        this.localStorageService.setStorage(PROJECT_KEY, currentResources);
      }
      else {
        return throwError(`Failed to create Resource ${resource.name} in Project ${currentResources[projectIndex].name}`);
        }
      }
    ));
  }

  deleteResource(projectIndex: number, resource: Resource): Observable<Project[]> {
    return this.projectService.getProjects().pipe(
      tap(currentResources => {
      const foundResource = this.getResource(currentResources[projectIndex], resource.name);
      if (foundResource) {
        currentResources[projectIndex].resources.splice(currentResources[projectIndex].resources.indexOf(foundResource), 1);
        this.localStorageService.setStorage(PROJECT_KEY, currentResources);
      }
      else {
        return throwError(`Failed to delete Resource ${resource.name} in Project ${currentResources[projectIndex].name}`);
      }
    }));
  }

  editResource(projectIndex: number, beforeEditName: string, editedResource: Resource): Observable<Project[]> {
    if (editedResource.name === '') {
      return throwError(`resource Name Cannot be Empty`);
    }

    return this.projectService.getProjects().pipe(
      tap(currentResources => {
      const foundResource = this.getResource(currentResources[projectIndex], beforeEditName);
      if (foundResource) {
        const index = currentResources[projectIndex].resources.indexOf(foundResource);
        currentResources[projectIndex].resources.splice(index, 1);
        currentResources[projectIndex].resources.splice(index, 0, editedResource);
        this.localStorageService.setStorage(PROJECT_KEY, currentResources);
      }
      else {
        return throwError(`Failed to edit Resource ${editedResource.name} in Project ${currentResources[projectIndex].name}`);
      }
    }));
  }

}
