import { Component, OnInit } from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap/modal';
import {Subject} from 'rxjs';

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {
  public onClose: Subject<boolean>;
  public name: string;
  public type: string;

  constructor(private ref: BsModalRef) { }

  ngOnInit(): void {
    this.onClose = new Subject<boolean>();
  }

  onCancel(): void {
    this.onClose.next(false);
    this.ref.hide();
  }

  onConfirm(): void {
    this.onClose.next(true);
    this.ref.hide();
  }

}
