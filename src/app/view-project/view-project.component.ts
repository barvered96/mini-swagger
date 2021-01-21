import {Component, OnInit} from '@angular/core';
import {ProjectService} from '../../services/project-service/project.service';
import {Project} from '../../interfaces/project';
import {ToastrService} from 'ngx-toastr';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Model} from '../../interfaces/model';
import {ViewModelComponent} from '../view-model/view-model.component';
import {ModelService} from '../../services/model-service/model.service';
import {Subscription} from 'rxjs';


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
    const getSub = this.projectService.getProjects().subscribe(projects => {
      this.projects = projects;
    });
    getSub.unsubscribe();
  }

  addModel(name: string): void {
    const dialogRef = this.modalService.show(ViewModelComponent, {
      initialState: {
        modelName: '',
        numFields: 1,
        newModel: true,
        modelFields: [{name: '', fieldType: ''}]
      }
    });
    const projectToAdd = this.projects.find(project => project.name === name);
    const index = this.projects.indexOf(projectToAdd);
    let innerSubscription = new Subscription();
    dialogRef.content.onClose.subscribe(model => {
      if (!model[0]) {
        return;
      }
      innerSubscription = this.modelService.addModel(index, model[0]).subscribe(projects => {
          this.toastr.success(`Successfully created Model ${name}`, 'Model');
          this.projects = projects;
        },
        err => this.toastr.error(err, 'Model')
      );
    });
    innerSubscription.unsubscribe();
  }

  editModel(name: string, model: Model): void {
    if (!model) {
      return;
    }
    const dialogRef = this.modalService.show(ViewModelComponent, {
      initialState: {
        modelName: model.name,
        modelFields: model.fields,
        newModel: false,
        numFields: model.fields.length
      }
    });
    const projectToAdd = this.projects.find(project => project.name === name);
    const index = this.projects.indexOf(projectToAdd);
    let innerSubscription = new Subscription();
    dialogRef.content.onClose.subscribe(newModel => {
      if (!newModel[0]) {
        return;
      }
      if (newModel[1]) {
        innerSubscription = this.modelService.deleteModel(index, newModel[0]).subscribe(projects => {
            this.toastr.success(`Successfully deleted Model ${model.name}`, 'Model');
            this.projects = projects;
          },
          err => this.toastr.error(err, 'Model')
        );
      }
      else{
        innerSubscription = this.modelService.editModel(index, newModel[0]).subscribe(projects => {
          this.toastr.success(`Successfully edited Model ${model.name}`, 'Model');
          this.projects = projects;
        },
        err => this.toastr.error(err, 'Model')
      );
    }});
    innerSubscription.unsubscribe();
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
