import { FormGroup } from '@angular/forms';

export function UrlValid(controlName: string): any {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    if (!control ) {
      return null;
    }

    if (control.errors) {
      return null;
    }

    if (!validURL(control.value)) {
      control.setErrors({ urlValid: true });
    } else {
      control.setErrors(null);
    }
  };
}

function validURL(url: string): boolean {
  try {
    const properUrl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    return properUrl.test(url);
  } catch (e) {
    return false;
  }
}
