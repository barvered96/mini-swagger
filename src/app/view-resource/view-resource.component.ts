import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {Resource} from '../../interfaces/resource';
import {ResourceService} from '../../services/resource-service/resource.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ProjectService} from '../../services/project-service/project.service';
import {ActivatedRoute} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Project} from '../../interfaces/project';
import {EntitiesEnum} from '../../enums/entities.enum';
import {ConfirmDeleteComponent} from '../confirm-delete/confirm-delete.component';

@Component({
  selector: 'app-view-resource',
  templateUrl: './view-resource.component.html',
  styleUrls: ['./view-resource.component.css']
})
export class ViewResourceComponent implements OnInit {
  public resources: Resource[];
  @Input() public projectName: string;
  @Output() deletedResource = new EventEmitter<Project>();
  public project: Project;
  public expandedResource: Resource = null;

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService,
              private resourceService: ResourceService,  private toastr: ToastrService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(currentProjects => {
      this.project = currentProjects.find(project =>  project.name === this.projectName);
      this.resources = this.project.resources;
    });
  }

  deleteResource(resource: Resource): void {
    const confirmDelete = this.modalService.show(ConfirmDeleteComponent,
      {initialState: {name: resource.name, type: EntitiesEnum.Resource}});
    confirmDelete.content.onClose.subscribe(result => {
      if (result) {
        this.resourceService.deleteResource(this.project, resource).subscribe(projects => {
            this.toastr.success(`Successfully deleted resource ${resource.name} in project ${this.projectName}`, EntitiesEnum.Resource);
            this.resources = this.project.resources;
            this.deletedResource.emit(this.project);
          },
          err => this.toastr.error(err, EntitiesEnum.Resource)
        );
      }
    });
  }

  expandResourceBody(resource: Resource): void {
    this.expandedResource = resource;
  }
}
