const campoPeso    = document.getElementById("peso");
const campoAltura  = document.getElementById("altura");
const btnCalcular  = document.getElementById("btn-calcular");
const btnLimpar    = document.getElementById("btn-limpar");
const divResultado = document.getElementById("resultado");
const linhasTabela = document.querySelectorAll("tbody tr");

function calcularIMC(peso, altura) {
    return peso / (altura * altura);
}

function classificarIMC(imc) {
    if (imc < 18.5) {
        return { texto: "Abaixo do peso", classe: "abaixo", linha: 0 };
    } else if (imc < 25) {
        return { texto: "Peso normal", classe: "normal", linha: 1 };
    } else if (imc < 30) {
        return { texto: "Sobrepeso", classe: "sobrepeso", linha: 2 };
    } else {
        return { texto: "Obesidade", classe: "obesidade", linha: 3 };
    }
}

function mostrarResultado(html, classe) {
    divResultado.innerHTML = html;
    divResultado.className = "resultado " + classe;
}

function processarFormulario() {
    const peso   = parseFloat(campoPeso.value.replace(",", "."));
    const altura = parseFloat(campoAltura.value.replace(",", "."));

    campoPeso.classList.remove("erro");
    campoAltura.classList.remove("erro");
    linhasTabela.forEach(linha => linha.classList.remove("destaque"));

    if (isNaN(peso) || peso <= 0 || peso > 500) {
        campoPeso.classList.add("erro");
        mostrarResultado("Digite um peso válido (entre 1 e 500 kg).", "mensagem-erro");
        return;
    }

    if (isNaN(altura) || altura <= 0 || altura > 3) {
        campoAltura.classList.add("erro");
        mostrarResultado("Digite uma altura válida em metros (ex: 1.75).", "mensagem-erro");
        return;
    }

    const imc = calcularIMC(peso, altura);
    const classificacao = classificarIMC(imc);

    mostrarResultado(
        "<strong>" + imc.toFixed(1) + "</strong>" + classificacao.texto,
        classificacao.classe
    );

    linhasTabela[classificacao.linha].classList.add("destaque");
}

function limparFormulario() {
    campoPeso.value = "";
    campoAltura.value = "";
    campoPeso.classList.remove("erro");
    campoAltura.classList.remove("erro");
    divResultado.className = "resultado oculto";
    linhasTabela.forEach(linha => linha.classList.remove("destaque"));
    campoPeso.focus();
}

btnCalcular.addEventListener("click", processarFormulario);
btnLimpar.addEventListener("click", limparFormulario);

document.getElementById("formulario-imc").addEventListener("submit", function (evento) {
    evento.preventDefault();
    processarFormulario();
});
