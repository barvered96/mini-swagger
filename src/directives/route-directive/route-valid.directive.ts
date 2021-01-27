import {Directive, Input} from '@angular/core';
import {FormGroup, NG_VALIDATORS, ValidationErrors} from '@angular/forms';
import {RouteValid} from '../../utils/route-validator';

@Directive({
  selector: '[routeValid]',
  providers: [{ provide: NG_VALIDATORS, useExisting: RouteValidDirective, multi: true}]
})
export class RouteValidDirective {
  @Input('routeValid') routeValid = '';

  validate(formGroup: FormGroup): ValidationErrors {
    return RouteValid(this.routeValid)(formGroup);
  }

}
