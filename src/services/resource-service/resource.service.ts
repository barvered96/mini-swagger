import { Injectable } from '@angular/core';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {Project, PROJECT_KEY} from '../../interfaces/project';
import {Observable } from 'rxjs';
import {Resource} from '../../interfaces/resource';
import {ProjectService} from '../project-service/project.service';
import {tap} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private localStorageService: LocalStorageService, private projectService: ProjectService) { }

  private getResource(project: Project, name: string): Resource {
    return project.resources.find(resource => resource.name === name);
  }

  addResource(projectIndex: number, resource: Resource): Observable<Project[]> {
    return this.projectService.getProjects()
      .pipe(
        tap(currentProjects => {
          const foundResource = this.getResource(currentProjects[projectIndex], resource.name);
          if (!foundResource) {
            currentProjects[projectIndex].resources.push(resource);
            this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
          }
          else {
            throw new Error(`Failed to create Resource ${resource.name} in Project ${currentProjects[projectIndex].name}`);
            }
          }
        ));
  }

  deleteResource(projectIndex: number, resource: Resource): Observable<Project[]> {
    return this.projectService.getProjects()
      .pipe(
        tap(currentResources => {
          const foundResource = this.getResource(currentResources[projectIndex], resource.name);
          if (foundResource) {
            currentResources[projectIndex].resources.splice(currentResources[projectIndex].resources.indexOf(foundResource), 1);
            this.localStorageService.setStorage(PROJECT_KEY, currentResources);
          }
          else {
            throw new Error(`Failed to delete Resource ${resource.name} in Project ${currentResources[projectIndex].name}`);
          }
        }));
  }

  editResource(projectIndex: number, beforeEditName: string, editedResource: Resource): Observable<Project[]> {
    if (editedResource.name === '') {
      return this.projectService.getProjects().pipe(tap(projects => {throw new Error(`Resource Name Cannot be Empty`); }));
    }
    return this.projectService.getProjects()
      .pipe(
       tap(currentResources => {
          const foundResource = this.getResource(currentResources[projectIndex], beforeEditName);
          const foundEdited = this.getResource(currentResources[projectIndex], editedResource.name);
          if (foundResource && !foundEdited || foundResource && foundEdited && foundResource.name === foundEdited.name) {
          const index = currentResources[projectIndex].resources.indexOf(foundResource);
          currentResources[projectIndex].resources.splice(index, 1);
          currentResources[projectIndex].resources.splice(index, 0, editedResource);
          this.localStorageService.setStorage(PROJECT_KEY, currentResources);
        }
        else {
          throw new Error(`Failed to edit Resource ${editedResource.name} in Project ${currentResources[projectIndex].name}`);
        }
      }));
  }
}
