import { Component, OnInit } from '@angular/core';
import {Resource} from '../../interfaces/resource';
import {ResourceService} from '../../services/resource-service/resource.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ProjectService} from '../../services/project-service/project.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {zip} from 'rxjs';

@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.component.html',
  styleUrls: ['./view-resource.component.css']
})
export class ViewResourceComponent implements OnInit {
  public resources: Resource[];
  public projectIndex: number;
  public projectName; string;

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService,
              private resourceService: ResourceService,  private toastr: ToastrService) { }

  ngOnInit(): void {
    const mergedObserves = zip(this.activatedRoute.queryParams, this.projectService.getProjects());
    const subscription = mergedObserves.subscribe(paramsAndProject => {
      this.projectName = paramsAndProject[0].projectName;
      for (const [i, project] of paramsAndProject[1].entries()) {
        if (project.name === this.projectName) {
          this.resources = project.resources;
          this.projectIndex = i;
        }
      }
    });
    subscription.unsubscribe();
  }

  deleteResource(resource: Resource): void {
    const deleteSub = this.resourceService.deleteResource(this.projectIndex, resource).subscribe(projects => {
      this.toastr.success(`Successfully deleted resource ${resource.name} in project ${projects[this.projectIndex].name}`, 'Resource');
      this.resources = projects[this.projectIndex].resources;
    },
      err => this.toastr.error(err, 'Resource')
    );
    deleteSub.unsubscribe();
  }
}
