export enum Type {
  success = 'success',
  info = 'info',
  warning = 'warning',
  error = 'danger',
}

export enum Icon {
  success = 'ui-1_check',
  info = 'media-2_speaker-01',
  warning = 'ui-2_alert-',
  error = 'ui-1_simple-remove',
}

export type TypeInterface = 'success' | 'error' | 'warning' | 'info' | 'question';

export type TypeToastInterface = 'toast-success' | 'toast-error' | 'toast-warning' | 'toast-info';

export  enum TypeToast{
  success ='toast-success',
  info ='toast-info',
  warning ='toast-warning',
  error ='toast-error',
}