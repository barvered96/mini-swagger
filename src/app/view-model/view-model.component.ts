import { Component, OnInit } from '@angular/core';
import {Model} from '../../interfaces/model';
import {ActivatedRoute} from '@angular/router';
import {ProjectService} from '../../services/project-service/project.service';
import {ToastrService} from 'ngx-toastr';
import {Subject, zip} from 'rxjs';
import {ModelService} from '../../services/model-service/model.service';
import {BsModalRef} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-models',
  templateUrl: './view-model.component.html',
  styleUrls: ['./view-model.component.css']
})
export class ViewModelComponent implements OnInit {
  public model: Model;
  public projectIndex: number;
  public projectName; string;
  public close: Subject<any>;

  constructor(private ref: BsModalRef, private activatedRoute: ActivatedRoute, private projectService: ProjectService,
              private modelService: ModelService) { }

  ngOnInit(): void {

  }

  onClose() : void {
      this.onClose.next(null);
      this.ref.hide();
  }

}

