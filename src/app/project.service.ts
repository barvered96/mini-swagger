import {Injectable} from '@angular/core';
import {Project} from './project';
import {LocalStorageService} from './local-storage-service.service';
import {PopupService} from './popup.service';
import {Observable, Subject} from 'rxjs';

const PROJECT_KEY = 'projects';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  constructor(private localStorageService: LocalStorageService,  private popUpService: PopupService) { }

  private taskExists(task: Project, currentTasks: Project[]): boolean {
    for (const project of currentTasks) {
      if (task.name === project.name) {
        return true;
      }
    }
    return false;
  }
  getProjects(): Observable<Project[]> {
    return this.localStorageService.getStorage(PROJECT_KEY);
  }
  addProject(task: Project): void {
    this.getProjects().subscribe(currentTasks => {
      if (!this.taskExists(task, currentTasks)) {
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
      for (const project of currentTasks) {
        if (name === project.name) {
          currentTasks.splice(currentTasks.indexOf(project), 1);
          this.localStorageService.setStorage(PROJECT_KEY, currentTasks);
          this.popUpService.openSnackBar(`Successfully deleted ${name}`, 'Remove', 'green-snackbar');
          return;
        }
      }
      this.popUpService.openSnackBar(`Failed to delete ${name}`, 'Remove', 'red-snackbar');
    });
  }

  editProject(name: string, editedProject: Project): void {
    const subject = new Subject<Project[]>();
    this.getProjects().subscribe(currentTasks => {
      for (const project of currentTasks)
      {
        if (name === project.name) {
          currentTasks[currentTasks.indexOf(project)] = editedProject;
          this.localStorageService.setStorage(PROJECT_KEY, currentTasks);
          this.popUpService.openSnackBar(`Successfully edited ${name}`, 'Remove', 'green-snackbar');
          return;
        }
     }
      this.popUpService.openSnackBar(`Failed to edit ${name}`, 'Remove', 'red-snackbar');
    });
  }
}
