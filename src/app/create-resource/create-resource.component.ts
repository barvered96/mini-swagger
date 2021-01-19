import { Component, OnInit } from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Resource} from '../interfaces/resource';
import {ResourceService} from '../../services/resource-service/resource.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-resource',
  templateUrl: './create-resource.component.html',
  styleUrls: ['./create-resource.component.css']
})
export class CreateResourceComponent implements OnInit {
  public projectIndex: number;
  public projectName: string;
  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService,
              private resourceService: ResourceService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.projectIndex = params.projectID;
      this.projectService.getProjects().subscribe(projects => {
        this.projectName = projects[this.projectIndex].name;
      });
    });
  }

  addResource(resourceDetails: string[]): void {
    const resource: Resource = {
      name: resourceDetails[0],
      apiSuffix: resourceDetails[1],
      description: resourceDetails[2],
      method: resourceDetails[3]
    };

    const resourceAdd = this.resourceService.addResource(this.projectIndex, resource).subscribe(
      projects => {
        this.toastr.success(`Successfully created resource ${resource.name} in project ${projects[this.projectIndex].name}`, 'Resource');
      },
      err => this.toastr.error(err, 'Resource')
    );
    resourceAdd.unsubscribe();
  }
}
