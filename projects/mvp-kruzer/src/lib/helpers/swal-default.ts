import Swal, { SweetAlertOptions } from 'sweetalert2';

const defaults: SweetAlertOptions<any, any> = {
  buttonsStyling: false,
  customClass: {
    cancelButton: 'btn btn-danger mx-2',
    confirmButton: 'btn btn-secondary mx-2',
  },
  reverseButtons: true,
  showCancelButton: true,
};

export const warningAlert = Swal.mixin({
  ...defaults,
  title: 'Voce tem certeza?',
  text: 'Deseja mesmo excluir este item?',
  cancelButtonText: 'Cancelar',
  icon: 'warning',
  confirmButtonColor: '#4643ce',
});

export const confirmRemove = Swal.mixin({
  buttonsStyling: false,
  customClass: {
    cancelButton: 'btn btn-secondary mx-2',
    confirmButton: 'btn btn-danger mx-2',
  },
  title: 'Voce tem certeza?',
  text: 'Deseja mesmo excluir este item?',
  cancelButtonText: 'voltar',
  confirmButtonText: 'Confirmar',
  icon: 'warning',
  confirmButtonColor: '#4643ce',
  showCancelButton: true,
});

export const swalInput = Swal.mixin({
  reverseButtons: true,
  buttonsStyling: false,
  customClass: {
    cancelButton: 'btn btn-danger mx-2',
    confirmButton: 'btn btn-secondary mx-2',
  },
  cancelButtonText: 'voltar',
  input: 'text',
  confirmButtonText: 'Confirmar',
  icon: 'warning',
  confirmButtonColor: '#4643ce',
  showCancelButton: true,
});