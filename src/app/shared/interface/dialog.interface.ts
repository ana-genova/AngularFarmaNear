export interface IDialogUtils {
  title?: string;
  html?: string;
  text?: string;
  confirmButtonColor?: string;
  confirmButtonText?: string;
  dismiss?: string;
  isConfirmed?: boolean;
  isDenied?: boolean;
  isDismissed?: boolean;
  value?: string;
}

export interface IInputMessage {
  title: string;
  text: string;
  inputType: InputMessageType;
  inputPlaceholder: string;
  buttonConfirmText: string;
  fieldInputName: string;
  value?: string;
  inputOptions?: Array<any>;
  icon?: string;
  confirmButtonColor?: string;
  callback?: any;
}

export enum InputMessageType {
  SELECT_BOX = 'select',
  FIELD_TEXT = 'text'
}
