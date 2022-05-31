const Swal = require("sweetalert2");

export const chooseMsg = (error) => {
  switch(error) {
    case 401:
      return(
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          text: 'Contraseña incorrecta',
        })
      )
    case 404:
      return(
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          text: 'Usuario incorrecto',
        })
      )
    case undefined:
      return (
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          text: 'ocurrió un error inesperado',
        })
      )
    default:
      return(
        Swal.fire({
          icon: 'error',
          title: 'Ocurrió un error',
          text: 'Todos los campos son obligatorios',
        })
      )
  }

}