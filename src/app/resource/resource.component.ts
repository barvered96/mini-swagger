import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../project.service';
import {Observable} from 'rxjs';
import {Project} from '../project';
import {Resource} from '../resource';
import {ResourceService} from '../resource.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css']
})
export class ResourceComponent implements OnInit {
  public projects: Observable<Project[]>;
  constructor(private projectService: ProjectService, private resourceService: ResourceService) { }

  ngOnInit(): void {
    this.projects = this.projectService.getProjects();
  }
  addResource(resourceDetails: string[]): void {
    console.log(resourceDetails);
    const resource: Resource = {
      name: resourceDetails[1],
      api: resourceDetails[2],
      description: resourceDetails[3],
      action: resourceDetails[4]
    };
    this.resourceService.addResource(parseInt(resourceDetails[0], 10), resource);
  }
}
