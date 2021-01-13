import {Component, OnChanges, OnInit} from '@angular/core';
import {ProjectService} from '../project.service';
import {Project} from '../project';
import {DialogService} from '../dialog.service';
import {Observable} from 'rxjs';


@Component({
  selector: 'app-projectviews',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  public projects: Observable<Project[]>;
  constructor(private projectService: ProjectService, public dialog: DialogService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
  openDialog(name: string, api: string, description: string): void {
    this.dialog.openDialogProject({name, api, description}).subscribe(result => {
      if (result) {
        this.projectService.editProject(name, result);
        this.projects = this.projectService.getProjects();
      }
    });
  }
  deleteProject(name: string): void {
    this.projectService.deleteProject(name);
    this.projects = this.projectService.getProjects();
  }

}
