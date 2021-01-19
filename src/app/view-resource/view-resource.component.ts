import { Component, OnInit } from '@angular/core';
import {Resource} from '../interfaces/resource';
import {ResourceService} from '../../services/resource-service/resource.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {EditResourceComponent} from '../edit-resource/edit-resource.component';
import {ProjectService} from '../../services/project-service/project.service';
import {ActivatedRoute, Params} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {of} from 'rxjs';

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
              private resourceService: ResourceService, public modalService: BsModalService, private toastr: ToastrService) { }

  ngOnInit(): void {
    let innerSubscription = of().subscribe();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.projectIndex = params.projectID;
      innerSubscription = this.projectService.getProjects().subscribe(projects => {
        this.resources = projects[this.projectIndex].resources;
        this.projectName = projects[this.projectIndex].name;
      });
    }).unsubscribe();
    innerSubscription.unsubscribe();
  }

  openDialogResource(resource: Resource): void {
    let innerSubscription = of().subscribe();
    const dialogRef = this.modalService.show<EditResourceComponent>(EditResourceComponent, {initialState: resource});
    dialogRef.content.onClose.subscribe(result => {
      if (result) {
        innerSubscription = this.resourceService.editResource(this.projectIndex, resource.name, result).subscribe(projects => {
            this.toastr.success(`Successfully edited resource ${resource.name} in project ${projects[this.projectIndex].name}`, 'Resource');
            this.resources = projects[this.projectIndex].resources;
          },
            err => this.toastr.error(err, 'Resource')
          );
      }
    });
    innerSubscription.unsubscribe();
  }

  deleteResource(resource: Resource): void {
    this.resourceService.deleteResource(this.projectIndex, resource).subscribe(projects => {
      this.toastr.success(`Successfully deleted resource ${resource.name} in project ${projects[this.projectIndex].name}`, 'Resource');
      this.resources = projects[this.projectIndex].resources;
    },
      err => this.toastr.error(err, 'Resource')
    ).unsubscribe();
  }
}
