import {Injectable} from '@angular/core';
import {Project, PROJECT_KEY} from './project';
import {LocalStorageService} from './local-storage-service.service';
import {PopupService} from './popup.service';
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
        this.popUpService.openSnackBar(`Successfully created ${task.name}`, 'Remove', 'green-snackbar');
        return;
      } else {
        this.popUpService.openSnackBar(`Failed to create ${task.name}`, 'Remove', 'red-snackbar');
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
        this.popUpService.openSnackBar(`Successfully deleted ${name}`, 'Remove', 'green-snackbar');
        return;
      }
      this.popUpService.openSnackBar(`Failed to delete ${name}`, 'Remove', 'red-snackbar');
    });
  }

  editProject(name: string, editedProject: Project): void {
    this.getProjects().subscribe(currentTasks => {
      const task = this.taskExists(name, currentTasks);
      if (task) {
        editedProject.resources = task.resources;
        currentTasks[currentTasks.indexOf(task)] = editedProject;
        this.localStorageService.setStorage(PROJECT_KEY, currentTasks);
        this.popUpService.openSnackBar(`Successfully edited ${name}`, 'Remove', 'green-snackbar');
        return;
      }
      this.popUpService.openSnackBar(`Failed to edit ${name}`, 'Remove', 'red-snackbar');
    });
  }
}
