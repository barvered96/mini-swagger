import { Injectable } from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PopupService {

  constructor(private toastr: ToastrService) { }
  public showSuccess(message: string, title: string): void {
    this.toastr.success(title, message);
  }
  public showFailure(message: string, title: string): void {
    this.toastr.error(title, message);
  }
}
