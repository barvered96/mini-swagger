import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Project} from '../../interfaces/project';
import {ToastrService} from 'ngx-toastr';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Model} from '../../interfaces/model';
import {ViewModelComponent} from '../view-model/view-model.component';


@Component({
  selector: 'app-view-project',
  templateUrl: './view-project.component.html',
  styleUrls: ['./view-project.component.css']
})
export class ViewProjectComponent implements OnInit {
  public projects: Project[];

  constructor(private modalService: BsModalService, private projectService: ProjectService, private toastr: ToastrService) { }

  ngOnInit(): void {
    const getSub = this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
    getSub.unsubscribe();
  }

  addModel(): void {
    const dialogRef = this.modalService.show(ViewModelComponent, {initialState: {}});

    dialogRef.content.onClose
  }

  editModel(model: Model): void {

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
