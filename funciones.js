//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function calcularDisponible(ingresos, egresos) {
  let disponible = ingresos - egresos;

  if (disponible < 0) {
    return 0;
  }

  return disponible;
}

function calcular(){

  //validaciones: si alguna falla, se detiene la ejecución
  if (!validarFormulario()) {
    return;
  }

  //disponible
  let ingresos = recuperarFloat("txtIngresos");
  let egresos = recuperarFloat("txtEgresos");

  let disponible = calcularDisponible(ingresos, egresos);

  mostrarTextoSpan("spnDisponible", disponible);


  //capacidad de pago
  let capacidadDePago = calcularCapacidadPago(disponible);

  mostrarTextoSpan("spnCapacidadPago", capacidadDePago)

  //intereses simple
  let monto = recuperarFloat("txtMonto");
  let tasa = recuperarFloat("txtTasaInteres");
  let plazo = recuperarFloat("txtPlazo");

  let interes = calcularInteresSimple(monto, tasa, plazo);

  mostrarTextoSpan("spnInteresPagar", interes)

  //total a pagar
  let totalPagar = calcularTotalPagar(monto, interes);

  mostrarTextoSpan("spnTotalPrestamo", totalPagar)

  //calcular cuota mensual
  let cuotaMensual = calcularCuotaMensual(totalPagar, plazo);

  mostrarTextoSpan("spnCuotaMensual", cuotaMensual)

  let aprobado = aprobarCredito(capacidadDePago, cuotaMensual);

  if (aprobado == true) {

    mostrarTextoSpan("spnEstadoCredito", "CREDITO APROBADO")
   
  } else {

    mostrarTextoSpan("spnEstadoCredito", "CREDITO RECHAZADO")

  }
}


//funciones matematicas
function calcularCapacidadPago(montoDisponible){

  return montoDisponible / 2;
}

function calcularInteresSimple(monto, tasa, plazo) {
  return plazo * monto * (tasa / 100);
}

function calcularTotalPagar(monto, interes) {
  return monto + interes + 100;
}

function calcularCuotaMensual(total, plazo) {
  let meses = plazo * 12;
  return total / meses;
}

function aprobarCredito(capacidadPago, cuotaMensual) {
  return capacidadPago > cuotaMensual;
}


//funciones de utilidades

function recuperarTexto(idComponente) {

  let componente = document.getElementById(idComponente);
  let valor = componente.value;

  return valor
}

function recuperarFloat(idComponente) {

  let valorTexto = recuperarTexto(idComponente);
  let valorFloat = parseFloat(valorTexto);

  return valorFloat;
}

function mostrarTextoSpan(idSpan, texto) {
  const span = document.getElementById(idSpan);
  if (span) {
    span.textContent = texto;
  } else {
    console.error(`No se encontró un elemento con id "${idSpan}"`);
  }
}

//fin de funciones de utilidades


//funciones de validacion (se ejecutan con onblur)

function mostrarErrores(idInput, idError, errores) {
  let input = document.getElementById(idInput);
  let mensaje = document.getElementById(idError);

  if (errores.length > 0) {
    mensaje.textContent = errores.join(" · ");
    input.classList.add("input-invalido");
    return false;
  }

  mensaje.textContent = "";
  input.classList.remove("input-invalido");
  return true;
}

// Reglas: no vacío, solo números y máximo de dígitos.
// Retorna true si el campo es válido, false si no.
function validarCampoNumerico(idInput, idError, maxDigitos) {
  let valor = recuperarTexto(idInput).trim();
  let errores = [];

  if (valor === "") {
    errores.push("Campo obligatorio");
  } else {
    if (!/^\d+$/.test(valor)) {
      errores.push("Solo se permiten números");
    }
    if (valor.length > maxDigitos) {
      errores.push("Máximo " + maxDigitos + (maxDigitos === 1 ? " carácter" : " caracteres"));
    }
  }

  return mostrarErrores(idInput, idError, errores);
}

function validarIngresos() {
  return validarCampoNumerico("txtIngresos", "errIngresos", 6);
}

function validarEgresos() {
  return validarCampoNumerico("txtEgresos", "errEgresos", 6);
}

function validarMonto() {
  return validarCampoNumerico("txtMonto", "errMonto", 6);
}

function validarPlazo() {
  return validarCampoNumerico("txtPlazo", "errPlazo", 1);
}

function validarTasaInteres() {
  return validarCampoNumerico("txtTasaInteres", "errTasaInteres", 2);
}

// Valida todos los campos. Guarda cada resultado antes de comparar
// para que se muestren todos los errores a la vez.
function validarFormulario() {
  let ingresosOk = validarIngresos();
  let egresosOk = validarEgresos();
  let montoOk = validarMonto();
  let plazoOk = validarPlazo();
  let tasaOk = validarTasaInteres();

  return ingresosOk && egresosOk && montoOk && plazoOk && tasaOk;
}

//fin de funciones de validacion