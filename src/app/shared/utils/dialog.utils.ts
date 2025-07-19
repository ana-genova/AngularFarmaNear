import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SweetAlertResult } from 'sweetalert2';
import {IDialogUtils, IInputMessage} from '../interface/dialog.interface';

export class DialogUtils {

  static delete(title?: string, text?: any): Promise<SweetAlertResult<Awaited<IDialogUtils>>> {
    return Swal.fire({
      title: title ?? 'Excluir registro',
      text: text ?? 'Deseja realmente excluir esse registro definitivamente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sim, desejo excluir!',
      cancelButtonText: 'Cancelar',
    });
  }

  static confirmation(title: string, text?: any, isHtml: boolean = false): Promise<SweetAlertResult<Awaited<IDialogUtils>>> {
    let html;
    if (isHtml) {
      html = text;
    }
    return Swal.fire({
      title: title,
      html: html,
      text: text,
      icon: 'question',
      confirmButtonColor: '#2e6ea0',
      confirmButtonText: 'Sim, desejo',
      cancelButtonText: 'Agora não',
      showCancelButton: true,
    });
  }

  static inputMessage(input: IInputMessage): Promise<SweetAlertResult<Awaited<IDialogUtils>>> {
    // @ts-ignore
    return Swal.fire({
      title: input.title,
      text: input.text,
      icon: input.icon ?? 'warning',
      input: input.inputType,
      inputOptions: input.inputOptions,
      inputValue: input.value ? input.value : '',
      inputPlaceholder: input.inputPlaceholder,
      inputAttributes: {
        maxlength: 80,
        autocapitalize: 'off',
        autocorrect: 'off',
      },
      showCancelButton: true,
      confirmButtonColor: input.confirmButtonColor ?? '#d33',
      confirmButtonText: input.buttonConfirmText,
      cancelButtonText: 'Cancelar',
    });
  }

  static error(title?: string, text?: any, isHtml = false) {
    if (!text) {
      title = 'Erro';
      text = 'Ocorreu um erro inesperado';
    }
    let html;
    if (isHtml) {
      html = text;
    }

    Swal.fire({ title: title, html: html, text: text, icon: 'error' });
  }

  static info(title?: string, text?: any, isHtml = false) {
    let html;
    if (isHtml) {
      html = text;
    }
    Swal.fire({ title: title, html: html, text: text, icon: 'info' });
  }

  static infoPromise(title?: string, text?: any, isHtml = false): Promise<SweetAlertResult<Awaited<IDialogUtils>>> {
    let html;
    if (isHtml) {
      html = text;
    }
    return Swal.fire({ title: title, html: html, text: text, icon: 'info' });
  }

  static warning(title?: string, text?: any, isHtml = false) {
    let html;
    if (isHtml) {
      html = text;
    }
    Swal.fire({ title: title, html: html, text: text, icon: 'warning' });
  }

  static custom(options: IDialogUtils): Promise<SweetAlertResult<Awaited<IDialogUtils>>> {
    return Swal.fire(options);
  }
}
