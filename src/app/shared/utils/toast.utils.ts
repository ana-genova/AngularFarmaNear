/* eslint-disable object-shorthand */
import Swal from 'sweetalert2/dist/sweetalert2.js';

export class ToastUtils {

  static readonly toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    showCloseButton: true,
    timer: 2000,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

  static success(title: string): void {
    ToastUtils.toast.fire({icon: 'success', title: title});
  }

  static error(title?: string): void {
    if (!title) {
      title = 'Ocorreu um erro inesperado';
    }
    ToastUtils.toast.fire({icon: 'error', title: title});
  }

  static warning(title: string): void {
    ToastUtils.toast.fire({icon: 'warning', title: title});
  }

  static info(title: string): void {
    ToastUtils.toast.fire({icon: 'info', title: title});
  }
}
