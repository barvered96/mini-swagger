import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Project} from '../../interfaces/project';
import {ToastrService} from 'ngx-toastr';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Model} from '../../interfaces/model';
import {ViewModelComponent} from '../view-model/view-model.component';
import {ModelService} from '../../services/model-service/model.service';
import {Subscription} from 'rxjs';
import {EntitiesEnum} from '../../enums/entities.enum';
import {ConfirmDeleteComponent} from '../confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  public projects: Project[];
  public model: Model;

  constructor(private modelService: ModelService, private modalService: BsModalService,
              private projectService: ProjectService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
  }

  deleteProject(name: string): void {
    const confirmDelete = this.modalService.show(ConfirmDeleteComponent, {initialState: {name, type: EntitiesEnum.Project}});
    confirmDelete.content.onClose.subscribe(result => {
      if (result) {
        this.projectService.deleteProject(name).subscribe(projects => {
            this.toastr.success(`Successfully deleted project ${name}`, EntitiesEnum.Project);
            this.projects = projects;
          },
          err => this.toastr.error(err, EntitiesEnum.Project)
        );
      }
    });
  }
}
