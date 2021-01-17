import {Injectable} from '@angular/core';
import {Project, PROJECT_KEY} from '../../app/interfaces/project';
import {LocalStorageService} from '../storage-service/local-storage-service.service';
import {PopupService} from '../popup-service/popup.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private localStorageService: LocalStorageService,  private popUpService: PopupService) { }

  private taskExists(task: string, currentTasks: Project[]): Project {
    for (const project of currentTasks) {
      if (task === project.name) {
        return project;
      }
    }
    return null;
  }
  public getProjects(): Observable<Project[]> {
    return this.localStorageService.getStorage(PROJECT_KEY);
  }
  addProject(task: Project): void {
    this.getProjects().subscribe(currentTasks => {
      if (!this.taskExists(task.name, currentTasks)) {
        currentTasks.push(task);
        this.localStorageService.setStorage(PROJECT_KEY, currentTasks);
        this.popUpService.showSuccess(`Successfully created ${task.name}`, 'Project');
        return;
      } else {
        this.popUpService.showFailure(`Failed to create ${task.name}`, 'Project');
      }
    }
  );
  }

  deleteProject(name: string): void {
    this.getProjects().subscribe(currentTasks => {
      const task = this.taskExists(name, currentTasks);
      if (task) {
        currentTasks.splice(currentTasks.indexOf(task), 1);
        this.localStorageService.setStorage(PROJECT_KEY, currentTasks);
        this.popUpService.showSuccess(`Successfully deleted ${name}`, 'Project');
        return;
      }
      this.popUpService.showFailure(`Failed to delete ${name}`, 'Project');
    });
  }

  editProject(name: string, editedProject: Project): void {
    if (editedProject.name === '') {
      this.popUpService.showFailure(`Project name cannot be empty`, 'Project');
      return;
    }
    this.getProjects().subscribe(currentTasks => {
      const task = this.taskExists(name, currentTasks);
      if (task) {
        editedProject.resources = task.resources;
        currentTasks[currentTasks.indexOf(task)] = editedProject;
        this.localStorageService.setStorage(PROJECT_KEY, currentTasks);
        this.popUpService.showSuccess(`Successfully edited ${name}`, 'Project');
        return;
      }
      this.popUpService.showFailure(`Failed to edit ${name}`, 'Project');
    });
  }
}
