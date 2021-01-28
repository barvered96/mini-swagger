import { FormGroup } from '@angular/forms';

export function RouteValid(controlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (!control ) {
      return null;
    }

    if (control.errors) {
      return null;
    }

    if (!validRoute(control.value)) {
      control.setErrors({ routeValid: true });
    } else {
      control.setErrors(null);
    }
  };
}

function validRoute(url: string): boolean {
  return url.startsWith('/');
}
