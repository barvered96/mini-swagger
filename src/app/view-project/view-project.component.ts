import {Component, OnDestroy, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Project} from '../interfaces/project';
import {BsModalService} from 'ngx-bootstrap/modal';
import {EditProjectComponent} from '../edit-project/edit-project.component';
import {ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  public projects: Project[];

  constructor(private projectService: ProjectService, public modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    }).unsubscribe();
  }

  openDialogProject(name: string, fullApiUrl: string, description: string): void {
    const project: Project = {
      name,
      fullApiUrl,
      description
    };

    const dialogRef = this.modalService.show<EditProjectComponent>(EditProjectComponent, {initialState: project});
    let editProject = of().subscribe();
    dialogRef.content.onClose.subscribe(result => {
      if (result) {
        editProject = this.projectService.editProject(name, result).subscribe(projects => {
          this.toastr.success(`Successfully edited project ${project.name}`, 'Project');
          this.projects = projects;
        },
          err => this.toastr.error(err, 'Project')
        );
      }
    });
    editProject.unsubscribe();
  }

  deleteProject(name: string): void {
    const deleteProject = this.projectService.deleteProject(name).subscribe(projects => {
      this.toastr.success(`Successfully deleted project ${name}`, 'Project');
      this.projects = projects;
    },
      err => this.toastr.error(err, 'Project')
    );
    deleteProject.unsubscribe();
  }


}
