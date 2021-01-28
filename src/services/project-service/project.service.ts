import {Injectable} from '@angular/core';
import {Project, PROJECT_KEY} from '../../interfaces/project';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private localStorageService: LocalStorageService) {}

  public getProjects(): Observable<Project[]> {
    return this.localStorageService.getStorage(PROJECT_KEY);
  }

  addProject(project: Project): Observable<Project[]> {
    return this.getProjects()
      .pipe(
        tap(currentProjects => {
          if (!currentProjects.find(currProject => currProject.name === project.name)) {
            currentProjects.push(project);
            this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
          } else {
            throw new Error(`Failed to create ${project.name}, already exists`);
          }
        })
      );
  }

  deleteProject(name: string): Observable<Project[]> {
    return this.getProjects()
      .pipe(
        tap(currentProjects => {
          const projectName = currentProjects.find(currProject => currProject.name === name);
          if (projectName) {
            currentProjects.splice(currentProjects.indexOf(projectName), 1);
            this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
          } else {
            throw new Error(`Failed to delete ${projectName.name}`);
          }
        })
      );
  }

  editProject(name: string, editedProject: Project): Observable<Project[]> {
    return this.getProjects().pipe(
      tap(currentProjects => {
        const project = currentProjects.find(currProject => currProject.name === name);
        const editedProj = currentProjects.find(currProject => currProject.name === editedProject.name);
        if (project && !editedProj || project && editedProj && project.name === editedProj.name) {
          editedProject.resources = project.resources;
          editedProject.models = project.models;
          currentProjects[currentProjects.indexOf(project)] = editedProject;
          this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
        } else {
          throw new Error(`Failed to edit ${project.name}`);
        }
      }));
  }
}
