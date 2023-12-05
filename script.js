document.addEventListener("DOMContentLoaded", function () {
  // Seleccionar elementos del DOM
  const pesoInput = document.getElementById("peso");
  const calcularBtn = document.getElementById("calcular");
  const resultadoElement = document.getElementById("resultado");

  // Función para calcular la hidratación basal según el método de Holliday-Segar
  function calcularHidratacionHollidaySegar(peso) {
    let volumenDiario = 0;

    if (peso <= 10) {
      volumenDiario = peso * 100;
    } else if (peso <= 20) {
      volumenDiario = 10 * 100 + (peso - 10) * 50;
    } else {
      volumenDiario = 10 * 100 + 10 * 50 + (peso - 20) * 20;
    }

    // Calcular cc/hr
    const mantenimiento = Math.round(volumenDiario / 24);

    // Calcular m+m/2
    const mmMedioMantenimiento = Math.round(mantenimiento + mantenimiento / 2);

    return { peso, volumenDiario, mantenimiento, mmMedioMantenimiento };
  }

  // Calcular la hidratación basal cuando el peso es mayor a 30 kg
  function calcularHidratacionSuperficieCorporal(peso) {
    const superficieCorporal = (peso * 4 + 7) / (peso + 90);
    const volumenDiario1 = Math.round(superficieCorporal * 1500);
    const volumenDiario2 = Math.round(superficieCorporal * 2000);

    const mantenimiento1 = Math.round(volumenDiario1 / 24);
    const mantenimiento2 = Math.round(volumenDiario2 / 24);

    const mmMedioMantenimiento1 = Math.round(
      mantenimiento1 + mantenimiento1 / 2
    );
    const mmMedioMantenimiento2 = Math.round(
      mantenimiento2 + mantenimiento2 / 2
    );

    return {
      peso,
      volumenDiario1,
      mantenimiento1,
      mmMedioMantenimiento1,
      volumenDiario2,
      mantenimiento2,
      mmMedioMantenimiento2,
    };
  }

  // Actualizar el resultado en el DOM
  function mostrarResultado(hidratacion) {
    resultadoElement.innerHTML = "";
    if (hidratacion.peso <= 30) {
      resultadoElement.innerHTML = `${hidratacion.volumenDiario}cc/día (${hidratacion.mantenimiento}cc/hr), m+m/2: ${hidratacion.mmMedioMantenimiento}cc/hr`;
    } else {
      resultadoElement.innerHTML += `Volumen Diario 1: ${hidratacion.volumenDiario1}cc (${hidratacion.mantenimiento1}cc/hr, m+m/2: ${hidratacion.mmMedioMantenimiento1}cc/hr)`;
      resultadoElement.innerHTML += "<br>";
      resultadoElement.innerHTML += `Volumen Diario 2: ${hidratacion.volumenDiario2}cc (${hidratacion.mantenimiento2}cc/hr, m+m/2: ${hidratacion.mmMedioMantenimiento2}cc/hr)`;
    }
  }

  // Click del botón de calcular
  calcularBtn.addEventListener("click", function () {
    const peso = parseFloat(pesoInput.value);

    // Validar que el peso sea un número válido
    if (!isNaN(peso) && peso > 0) {
      let hidratacion;

      //Verificar metodo para calcular
      if (peso <= 30) {
        hidratacion = calcularHidratacionHollidaySegar(peso);
      } else {
        hidratacion = calcularHidratacionSuperficieCorporal(peso);
      }

      mostrarResultado(hidratacion);
    } else {
      alert("Por favor, ingrese un peso válido.");
    }
  });
});
