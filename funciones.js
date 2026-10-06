//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO
function calcularDisponible(ingresos, egresos) {
  let disponible = ingresos - egresos;

  if (disponible < 0) {
    return 0;
  }

  return disponible;
}

function calcular(){

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