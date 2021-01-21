import {Injectable} from '@angular/core';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {ProjectService} from '../project-service/project.service';
import {Model} from '../../interfaces/model';
import {Project, PROJECT_KEY} from '../../interfaces/project';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private localStorageService: LocalStorageService, private projectService: ProjectService) {
  }

  private getModel(project: Project, name: string): Model {
    return project.models.find(model => model.name === name);
  }

  addModel(projectIndex: number, model: Model): Observable<Project[]> {
    return this.projectService.getProjects()
      .pipe(
        tap(currentProjects => {
            const foundModel = this.getModel(currentProjects[projectIndex], model.name);
            if (!foundModel) {
              currentProjects[projectIndex].models.push(model);
              this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
            } else {
              throw new Error(`Failed to create Model ${model.name} in Project ${currentProjects[projectIndex].name}`);
            }
          }
        ));
  }

  deleteModel(projectIndex: number, model: Model): Observable<Project[]> {
    return this.projectService.getProjects()
      .pipe(
        tap(currentResources => {
          const foundModel = this.getModel(currentResources[projectIndex], model.name);
          if (foundModel) {
            currentResources[projectIndex].models.splice(currentResources[projectIndex].models.indexOf(foundModel), 1);
            this.localStorageService.setStorage(PROJECT_KEY, currentResources);
          } else {
            throw new Error(`Failed to delete Model ${model.name} in Project ${currentResources[projectIndex].name}`);
          }
        }));
  }

  editModel(projectIndex: number, beforeEditName: string, editModel: Model): Observable<Project[]> {
    if (editModel.name === '') {
      return this.projectService.getProjects().pipe(tap(projects => {
        throw new Error(`Model Name Cannot be Empty`);
      }));
    }
    return this.projectService.getProjects()
      .pipe(
        tap(currentResources => {
          const foundModel = this.getModel(currentResources[projectIndex], beforeEditName);
          const foundEdited = this.getModel(currentResources[projectIndex], editModel.name);
          if (foundModel && !foundEdited || foundModel && foundEdited && foundModel.name === foundEdited.name) {
            const index = currentResources[projectIndex].models.indexOf(foundModel);
            currentResources[projectIndex].models.splice(index, 1);
            currentResources[projectIndex].models.splice(index, 0, editModel);
            this.localStorageService.setStorage(PROJECT_KEY, currentResources);
          } else {
            throw new Error(`Failed to edit Model ${editModel.name} in Project ${currentResources[projectIndex].name}`);
          }
        }));
  }


}
