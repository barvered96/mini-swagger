import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

@Component({
  template: '',
  styleUrls: ['./entity-actions.component.css']
})

export abstract class EntityActionsComponent implements OnInit{
  public name: string;
  public edit = false;

  protected constructor(protected toastr: ToastrService) {}

  abstract ngOnInit(): void;

  editEntity(entity: any, editEntity: Observable<any>, entityType: string): void {
    const edit = editEntity.subscribe(entities => {
        this.toastr.success(`Successfully edited ${entityType} ${entity.name}`, entityType);
      },
      err => this.toastr.error(err, entityType)
    );
    edit.unsubscribe();
  }

  addEntity(entity: any, addEntity: Observable<any>, entityType: string): void {
    const add = addEntity.subscribe(
      entities => {
        this.toastr.success(`Successfully created ${entityType} ${entity.name}`, entityType);
      },
      err => this.toastr.error(err, entityType)
    );
    add.unsubscribe();
  }
}
