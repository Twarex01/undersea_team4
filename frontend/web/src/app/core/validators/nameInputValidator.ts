import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

export const nameInputValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const userNameValue: string = control.get('userName')?.value;
    return userNameValue?.trim().length === 0 ? {'notValidUserName': true } : null;
};