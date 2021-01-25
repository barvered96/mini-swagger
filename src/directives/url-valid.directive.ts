import {Directive, Input} from '@angular/core';
import { NG_VALIDATORS, Validator, ValidationErrors, FormGroup } from '@angular/forms';
import {UrlValid} from '../utils/urlValidator';

@Directive({
  selector: '[urlValid]',
  providers: [{ provide: NG_VALIDATORS, useExisting: UrlValidDirective, multi: true }]
})
export class UrlValidDirective implements Validator {
  @Input('urlValid') urlValid = '';

  validate(formGroup: FormGroup): ValidationErrors {
    return UrlValid(this.urlValid)(formGroup);
  }

}
