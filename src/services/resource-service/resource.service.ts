import {Injectable} from '@angular/core';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {Project, PROJECT_KEY} from '../../interfaces/project';
import {Observable} from 'rxjs';
import {Resource} from '../../interfaces/resource';
import {ProjectService} from '../project-service/project.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor(private localStorageService: LocalStorageService, private projectService: ProjectService) {}

  addResource(project: Project, resource: Resource): Observable<Project[]> {
    return this.projectService.getProjects()
      .pipe(
        tap(currentProjects => {
            const foundResource = project.resources.find(source => source.name === resource.name);
            if (!foundResource) {
              const projectIndex = currentProjects.findIndex(currProject => currProject.name === project.name);
              project.resources.push(resource);
              currentProjects[projectIndex] = project;
              this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
            } else {
              throw new Error(`Failed to create Resource ${resource.name} in
               Project ${project.name}, already exists`);
            }
          }
        ));
  }

  deleteResource(project: Project, resource: Resource): Observable<Project[]> {
    return this.projectService.getProjects()
      .pipe(
        tap(currentProjects => {
          const foundResource = project.resources.find(source => source.name === resource.name);
          if (foundResource) {
            const projectIndex = currentProjects.findIndex(currProject => currProject.name === project.name);
            project.resources.splice(project.resources.indexOf(foundResource), 1);
            currentProjects[projectIndex] = project;
            this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
          } else {
            throw new Error(`Failed to delete Resource ${resource.name} in Project ${project.name}`);
          }
        }));
  }

  editResource(project: Project, editedResource: Resource): Observable<Project[]> {
    return this.projectService.getProjects()
      .pipe(
        tap(currentProjects => {
          const foundEdited = project.resources.find(source => source.name === editedResource.name);
          if (foundEdited) {
            const index = project.resources.indexOf(foundEdited);
            const projectIndex = currentProjects.findIndex(currProject => currProject.name === project.name);
            project.resources.splice(index, 1);
            project.resources.splice(index, 0, editedResource);
            currentProjects[projectIndex] = project;
            this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
          } else {
            throw new Error(`Failed to edit Resource ${editedResource.name} in Project ${project.name}`);
          }
        }));
  }
}
