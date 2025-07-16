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

  static normalizeDocument = (username: string) => {
    const text = username.replace(/\D/gi, '');
    if (text.length === 11 || text.length === 14) {
      return text;
    }
    return username;
  };
}
