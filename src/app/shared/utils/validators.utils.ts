import {AbstractControl, FormControl, FormGroup, ValidatorFn} from '@angular/forms';
import {DialogUtils} from './dialog.utils';

export class ValidatorsUtils {

  static errorMessage(): { errorMessage: string } {
    return {errorMessage: 'Campo obrigatório'};
  }

  static getControlStatus(control: AbstractControl): string {
    if (control && control.touched) {
      return control.status.toLowerCase();
    }
    return 'valid';
  }

  static formIsInvalid(forms: FormGroup | Array<FormGroup>): boolean {
    let invalid = false;
    if (!(forms instanceof FormGroup) && forms.length) {
      forms.forEach(form => {
        setInputsTouched(form);
        if (form.invalid) {
          invalid = form.invalid;
        }
      });
    } else if (forms instanceof FormGroup) {
      setInputsTouched(forms);
      invalid = forms.invalid;
    }

    if (invalid) {
      DialogUtils.info('Campo Obrigatório', 'Você não pode enviar o formulário. Há campo(s) com erro(s)');
      return true;
    }
    return false;
  }

  static required(control: AbstractControl): { errorMessage: string } {
    const validator = requiredFactory();
    return validator(control);
  }

  static cpf(control: AbstractControl): { errorMessage: string } {
    const validator = validateCPF();
    return validator(control);
  }

  static cnpj(control: AbstractControl): { errorMessage: string } {
    const validator = validateCNPJ();
    return validator(control);
  }

  static getFormStatuses(control: AbstractControl): string {
    if (control && control.touched) {
      return control.status.toLowerCase();
    }
    return 'valid';
  }

  static email(control: AbstractControl): { errorMessage: string } {
    const validator = validateEmailFactory();
    return validator(control);
  }

  static cep(control: AbstractControl): { errorMessage: string } {
    const validator = validateCEPFactory();
    return validator(control);
  }

  static passwordDynamic(control: AbstractControl): { errorMessage: string } {
    const validator = passwordDynamicValidator();
    return validator(control);
  }

}

function setInputsTouched(form: FormGroup): void {
  form.markAllAsTouched();
  form.updateValueAndValidity();
}

function cpfFactory(): any {
  return (control: FormControl) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    if (!cpfRegex.test(control.value)) {
      return {errorMessage: 'CPF Inválido, deve conter o formato \'000.000.000-00\''};
    }
    return null;
  };
}

function cnpjFactory(): any {
  return (control: FormControl) => {
    const cnpjRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
    if (!cnpjRegex.test(control.value)) {
      return {errorMessage: 'CNPJ Inválido, deve conter o formato \'00.000.000/0000-00\''};
    }
    return null;
  };
}

function requiredFactory(): any {
  return (c: FormControl) => {
    if (c.value === null || c.value === '') {
      return ValidatorsUtils.errorMessage();
    }
    return null;
  };
}

function passwordDynamicValidator(): any {
  return (control: FormControl): { errorMessage: string } | null => {
    console.log(control);
    if (!control.value) {
      return ValidatorsUtils.errorMessage();
    }
    if (control.value?.length < 6) {
      return {errorMessage: 'Deve conter no mínimo 6 caracteres'};
    }

    const numbers = /\d+/g;
    if (!numbers.test(control.value)) {
      return {errorMessage: 'Deve conter ao menos um número'};
    }

    const letters = /[a-zA-Z]+/g;
    if (!letters.test(control.value)) {
      return {errorMessage: 'Deve conter ao menos uma letra'};
    }

    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (!specialChars.test(control.value)) {
      return {errorMessage: 'Deve conter caracteres especiais'};
    }

    return null;
  };
}

function validateEmailFactory(): any {
  return (c: FormControl) => {
    if (c.value === null) {
      return ValidatorsUtils.errorMessage();
    }
    const whiteSpace = /\s/g.test(c.value);
    if (whiteSpace) {
      return {errorMessage: 'Há um espaço em branco'};
    }
    const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    const emailValid = EMAIL_REGEXP.test(c.value);
    if (!emailValid) {
      return {errorMessage: 'Email Inválido, deve conter o formato \'email@email.com\''};
    }
    return null;
  };
}


function validateCEPFactory(): any {
  return (c: FormControl) => {
    if (c.value?.length > 1) {
      const cep = c.value.replace(/\D/g, '');
      if (isNaN(Number(cep)) || cep.length < 8) {
        return {errorMessage: 'CEP Inválido'};
      }
    }
    return null;
  };
}

function validateCPF(): any {
  return (control: FormControl) => {
    if (!control.value) {
      return null;
    }
    let cpf = control.value.replace(/\D+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
      return {errorMessage: 'CPF Inválido'};
    }

    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let rem = (sum * 10) % 11;
    if (rem === 10 || rem === 11) {
      rem = 0;
    }
    if (rem !== parseInt(cpf.charAt(9))) {
      return {errorMessage: 'CPF Inválido'};
    }

    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }

    rem = (sum * 10) % 11;
    if (rem === 10 || rem === 11) {
      rem = 0;
    }

    if (rem !== parseInt(cpf.charAt(10))) {
      return {errorMessage: 'CPF Inválido'};
    }
    return null;
  }
}

function validateCNPJ(): any {
  return (control: FormControl) => {
    if (!control.value) {
      return null;
    }
    let cnpj = control.value.replace(/\D+/g, '');

    if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) {
      return {errorMessage: 'CNPJ Inválido'};
    }

    const first = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
    const second = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(cnpj.charAt(i)) * first[i];
    }

    let rem = sum % 11;
    let digit1 = rem < 2 ? 0 : 11 - rem;
    if (digit1 !== parseInt(cnpj.charAt(12))) {
      return {errorMessage: 'CNPJ Inválido'};
    }

    sum = 0;
    for (let i = 0; i < 13; i++) {
      sum += parseInt(cnpj.charAt(i)) * second[i];
    }

    rem = sum % 11;
    let digit2 = rem < 2 ? 0 : 11 - rem;

    if (digit2 !== parseInt(cnpj.charAt(13))) {
      return {errorMessage: 'CNPJ Inválido'};
    }
    return null;
  }
}

