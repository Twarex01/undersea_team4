import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

export const countryNameValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const countryNameValue: string = control.get('countryName')?.value;
    return countryNameValue?.trim().length === 0 ? {'notValidCountryName': true } : null;
};