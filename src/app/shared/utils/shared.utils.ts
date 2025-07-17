import {DatePipe} from '@angular/common';

export class SharedUtils {
  static encodeURI(value: any): string {
    return encodeURIComponent(value);
  }

  static isJson(str: string): boolean {
    let value = !!str;
    if (value) {
      try {
        JSON.parse(str);
      } catch (e) {
        value = false;
      }
    }
    return value;
  }

  static isValueEmpty(value: any): boolean {
    return value === null || value === undefined || value === '';
  }

  static isValidString(str: string): boolean {
    return str !== null && str !== undefined && str !== '' && /\S/.test(str);
  }

  static toLocaleDate(date: Date, format: string = 'dd/MM/yyyy', encodeURI: boolean = false, locate: 'pt-BR' | 'en' = 'pt-BR', timezone = 'UTC'): string {
    if (date) {
      const newDate = new DatePipe(locate).transform(date, format, timezone);
      return (encodeURI ? SharedUtils.encodeURI(newDate) : newDate) ?? '';
    }
    return '';
  }

  static normalizeDocument = (document: string) => {
    return document.replace(/\D/gi, '');
  };

  static formatCNPJ = (document: string) => {
    return document.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5');
  };

  static formatCPF = (document: string) => {
    return document.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4');
  };

}
