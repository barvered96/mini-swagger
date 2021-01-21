import {Injectable} from '@angular/core';
import {Project, PROJECT_KEY} from '../../interfaces/project';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  constructor(private localStorageService: LocalStorageService) { }

  private projectExists(projectName: string, currentProjects: Project[]): Project {
    return currentProjects.find(project => project.name === projectName);
  }

  public getProjects(): Observable<Project[]> {
    return this.localStorageService.getStorage(PROJECT_KEY);
  }

  addProject(projectName: Project): Observable<Project[]> {
    return this.getProjects()
      .pipe(
        tap(currentProjects => {
        if (!this.projectExists(projectName.name, currentProjects)) {
          currentProjects.push(projectName);
          this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
          }
        else {
          throw new Error(`Failed to create ${projectName.name}, already exists`);
          }
       })
      );
  }

  deleteProject(name: string): Observable<Project[]> {
    return this.getProjects()
      .pipe(
        tap(currentProjects => {
        const projectName = this.projectExists(name, currentProjects);
        if (projectName) {
          currentProjects.splice(currentProjects.indexOf(projectName), 1);
          this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
          }
        else {
          throw new Error(`Failed to delete ${projectName.name}`);
          }
        })
      );
  }

  editProject(name: string, editedProject: Project): Observable<Project[]> {
    return this.getProjects().pipe(
      tap(currentProjects => {
        const projectName = this.projectExists(name, currentProjects);
        const editedProj = this.projectExists(editedProject.name, currentProjects);
        if (projectName && !editedProj || projectName && editedProj && projectName.name === editedProj.name) {
        editedProject.resources = projectName.resources;
        currentProjects[currentProjects.indexOf(projectName)] = editedProject;
        this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
      }
      else {
        throw new Error(`Failed to edit ${projectName.name}`);
      }
    }));
  }
}
