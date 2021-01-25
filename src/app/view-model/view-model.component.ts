import {Component, Input, OnInit} from '@angular/core';
import {Model} from '../../interfaces/model';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project-service/project.service';
import {ToastrService} from 'ngx-toastr';
import {Subject, zip} from 'rxjs';
import {ModelService} from '../../services/model-service/model.service';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {ModelField} from '../../interfaces/modelField';
import {Resource} from '../../interfaces/resource';
import {ResourceService} from '../../services/resource-service/resource.service';

@Component({
  selector: 'app-view-models',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent implements OnInit {
  public models: Model[];
  public projectIndex: number;
  @Input() public projectName: string;
  public types = ['number', 'string',' boolean', 'Array<number>', 'Array<string>', 'Array<boolean>'];

  constructor(private activatedRoute: ActivatedRoute, private projectService: ProjectService,
              private modelService: ModelService,  private toastr: ToastrService) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe(currentProjects => {
      for (const [i, project] of currentProjects.entries()) {
        if (project.name === this.projectName) {
          this.models = project.models;
          this.projectIndex = i;
        }
      }
    });
  }

  deleteModel(model: Model): void {
    const deleteSub = this.modelService.deleteModel(this.projectIndex, model).subscribe(projects => {
        this.toastr.success(`Successfully deleted model ${model.name} in project ${projects[this.projectIndex].name}`, 'Resource');
        this.models = projects[this.projectIndex].models;
      },
      err => this.toastr.error(err, 'Model')
    );
    deleteSub.unsubscribe();
  }
}

