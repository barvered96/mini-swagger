import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Resource} from '../../interfaces/resource';
import {Model} from '../../interfaces/model';
import {ModelService} from '../../services/model-service/model.service';
import {ProjectService} from '../../services/project-service/project.service';
import { MethodColorsEnum } from '../../enums/options-colors.enum';

@Component({
  selector: 'app-model-json-creator',
  templateUrl: './model-json-creator.component.html',
  styleUrls: ['./model-json-creator.component.css']
})
export class ModelJsonCreatorComponent implements OnChanges {
  @Input() public expandedResource: Resource;
  @Input() public expandedModel: string;
  @Input() public projectName: string;
  public option: number;
  public model: Model;
  public isDeleted: boolean;
  public jsonSchema = '';

  constructor(private projectService: ProjectService, private modelService: ModelService) { }

  ngOnChanges(): void {
    this.projectService.getProjects().subscribe(projects => {
      const filteredProject = projects.find(project => project.name === this.projectName);
      this.model = filteredProject.models.find(model => model.name === this.expandedModel);
      this.option = MethodColorsEnum[this.expandedResource.method];
      if (this.model) {
        this.isDeleted = false;
      }
      else {
        this.isDeleted = true;
      }
    });
  }
}
