import { ValidatorFn, FormGroup, ValidationErrors, FormControl } from "@angular/forms";

export const noWhitespaceValidator: any = (control: FormControl): ValidationErrors | null => {
    const userNameValue: string = control?.value;
    return userNameValue?.trim().length === 0 ? {'whitespace': true } : null;
};