import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import {Project} from '../project';


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {

  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
  }
  addToLocalStorage(projectDetails: string[]): void {
    const project: Project = {
      name: projectDetails[0],
      api: projectDetails[1],
      description: projectDetails[2]
    };
    console.log(project);
    this.projectService.addProject(project);
  }

}
