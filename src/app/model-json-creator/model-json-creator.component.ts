import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Resource} from '../../interfaces/resource';
import {Model} from '../../interfaces/model';
import {ModelService} from '../../services/model-service/model.service';

@Component({
  selector: 'app-model-json-creator',
  templateUrl: './model-json-creator.component.html',
  styleUrls: ['./model-json-creator.component.css']
})
export class ModelJsonCreatorComponent implements OnChanges {
  @Input() public expandedResource: Resource;
  @Input() public expandedModel: string;
  public model: Model;
  public optionsColors = {DELETE: 'bg-danger', POST: 'bg-success', PUT: 'bg-info', GET: 'bg-warning'};
  public jsonSchema = '';

  constructor(private modelService: ModelService) { }

  ngOnChanges(): void {
    this.modelService.getModelByName(this.expandedModel).subscribe(model => {
      this.model = model;
    });
  }
}
