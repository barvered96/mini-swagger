import {Injectable} from '@angular/core';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {ProjectService} from '../project-service/project.service';
import {Model} from '../../interfaces/model';
import {Project, PROJECT_KEY} from '../../interfaces/project';
import {Observable, Subject} from 'rxjs';
import {filter, map, mergeMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ModelService {

  constructor(private localStorageService: LocalStorageService, private projectService: ProjectService) {
  }

  addModel(project: Project, model: Model): Observable<Project[]> {
    return this.projectService.getProjects()
      .pipe(
        tap(currentProjects => {
            const foundModel = project.models.find(currModel => currModel.name === model.name);
            if (!foundModel) {
              const projectIndex = currentProjects.findIndex(currProject => currProject.name === project.name);
              project.models.push(model);
              currentProjects[projectIndex] = project;
              this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
            } else {
              throw new Error(`Failed to create Model ${model.name} in Project ${project.name}, already exists`);
            }
          }
        ));
  }

  deleteModel(project: Project, model: Model): Observable<Project[]> {
    return this.projectService.getProjects()
      .pipe(
        tap(currentProjects => {
          const foundModel = project.models.find(currModel => currModel.name === model.name);
          if (foundModel) {
            if (project.resources.find(resource => resource.body === model.name)) {
              throw new Error(`Model ${model.name} already exists in some resource`);
            }
            const projectIndex = currentProjects.findIndex(currProject => currProject.name === project.name);
            project.models.splice(project.models.indexOf(foundModel), 1);
            currentProjects[projectIndex] = project;
            this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
          } else {
            throw new Error(`Failed to delete Model ${model.name} in Project ${project.name}`);
          }
        }));
  }

  editModel(project: Project, editModel: Model): Observable<Project[]> {
    return this.projectService.getProjects()
      .pipe(
        tap(currentProjects => {
          const foundEdited = project.models.find(currModel => currModel.name === editModel.name);
          if (foundEdited) {
            const projectIndex = currentProjects.findIndex(currProject => currProject.name === project.name);
            const index = project.models.indexOf(foundEdited);
            project.models.splice(index, 1);
            project.models.splice(index, 0, editModel);
            currentProjects[projectIndex] = project;
            this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
          } else {
            throw new Error(`Failed to edit Model ${editModel.name} in Project ${project.name}`);
          }
        }));
  }
}
