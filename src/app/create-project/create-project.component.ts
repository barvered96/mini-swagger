import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Project} from '../interfaces/project';


@Component({
  selector: 'app-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }
  addProject(projectDetails: string[]): void {
    const project: Project = {
      name: projectDetails[0],
      api: projectDetails[1],
      description: projectDetails[2],
      resources: []
    };
    this.projectService.addProject(project);
  }

}
