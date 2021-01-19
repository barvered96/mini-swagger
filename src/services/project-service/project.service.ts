import {Injectable} from '@angular/core';
import {Project, PROJECT_KEY} from '../../app/interfaces/project';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {Observable, throwError} from 'rxjs';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ProjectService {
  constructor(private localStorageService: LocalStorageService) { }

  private projectExists(proj: string, currentProjects: Project[]): Project {
    for (const project of currentProjects) {
      if (proj === project.name) {
        return project;
      }
    }

    return null;
  }

  public getProjects(): Observable<Project[]> {
    return this.localStorageService.getStorage(PROJECT_KEY);
  }

  addProject(proj: Project): Observable<Project[]> {
    return this.getProjects().pipe(
      tap(currentProjects => {
      if (!this.projectExists(proj.name, currentProjects)) {
        currentProjects.push(proj);
        this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
      } else {
        return throwError(`Failed to create ${proj.name}`);
      }
    }
  ));
  }

  deleteProject(name: string): Observable<Project[]> {
    return this.getProjects().pipe(
      tap(currentProjects => {
      const proj = this.projectExists(name, currentProjects);
      if (proj) {
        currentProjects.splice(currentProjects.indexOf(proj), 1);
        this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
      }
      else {
        return throwError(`Failed to delete ${proj.name}`);
      }
    }));
  }

  editProject(name: string, editedProject: Project): Observable<Project[]> {
    if (editedProject.name === '') {
      return throwError(`Project Name Cannot be Empty`);
    }

    return this.getProjects().pipe(
      tap(currentProjects => {
      const proj = this.projectExists(name, currentProjects);
      if (proj) {
        editedProject.resources = proj.resources;
        currentProjects[currentProjects.indexOf(proj)] = editedProject;
        this.localStorageService.setStorage(PROJECT_KEY, currentProjects);
      }
      else {
        return throwError(`Failed to edit ${proj.name}`);
      }
    }));
  }
}
