import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

// Password and passwordConfirmation must match
export const passwordConfirmationValidator: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirmation = control.get('passwordConfirmation');
    return password?.value !== passwordConfirmation?.value ? { 'notMatchingPasswords': true } : null;
};