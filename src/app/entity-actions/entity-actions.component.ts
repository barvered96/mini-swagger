import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  template: '',
  styleUrls: ['./entity-actions.component.css']
})

export abstract class EntityActionsComponent {
  public name: string;
  public edit = false;

  protected constructor(protected toastr: ToastrService) {}

  editEntity(entity: any, editEntity: Observable<any>, entityType: string): void {
    editEntity.subscribe(entities => {
        this.toastr.success(`Successfully edited ${entityType} ${entity.name}`, entityType);
      },
      err => this.toastr.error(err, entityType)
    );
  }

  addEntity(entity: any, addEntity: Observable<any>, entityType: string): void {
    addEntity.subscribe(
      entities => {
        this.toastr.success(`Successfully created ${entityType} ${entity.name}`, entityType);
      },
      err => this.toastr.error(err, entityType)
    );
  }
}
