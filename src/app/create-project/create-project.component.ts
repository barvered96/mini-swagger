import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Project} from '../interfaces/project';
import {ToastrService} from 'ngx-toastr';
import { setTimeout} from 'timers';

@Component({
  selector: 'app-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor(private projectService: ProjectService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addProject(projectDetails: string[]): void {
    const project: Project = {
      name: projectDetails[0],
      fullApiUrl: projectDetails[1],
      description: projectDetails[2],
      resources: []
    };

    const projectAdd = this.projectService.addProject(project).subscribe(
      projects => {
        this.toastr.success(`Successfully created project ${project.name}`, 'Project');
      },
          err => this.toastr.error(err, 'Project')
    );
    projectAdd.unsubscribe();
  }
}
