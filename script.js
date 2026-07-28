const palpiteInput = document.getElementById("palpite");
const btnChutar = document.getElementById("btnChutar");
const btnReiniciar = document.getElementById("btnReiniciar");
const mensagem = document.getElementById("mensagem");
const restantes = document.getElementById("restantes");

let numeroSecreto = Math.floor(Math.random() * 100) + 1;
let tentativasRestantes = 10;
let jogoEncerrado = false;

function definirMensagem(texto, tipo) {
  mensagem.textContent = texto;
  mensagem.className = `mensagem ${tipo}`;
}

function encerrarJogo() {
  jogoEncerrado = true;
  palpiteInput.disabled = true;
  btnChutar.disabled = true;
  btnReiniciar.classList.remove("hidden");
}

function verificarPalpite() {
  if (jogoEncerrado) return;

  const valor = Number(palpiteInput.value);

  if (!valor || valor < 1 || valor > 100) {
    definirMensagem("Digite um número válido entre 1 e 100.", "erro");
    return;
  }

  tentativasRestantes--;
  restantes.textContent = tentativasRestantes;

  if (valor === numeroSecreto) {
    definirMensagem(`🎉 Você acertou! O número era ${numeroSecreto}.`, "sucesso");
    encerrarJogo();
    return;
  }

  if (tentativasRestantes === 0) {
    definirMensagem(`💥 Suas tentativas acabaram! O número era ${numeroSecreto}.`, "erro");
    encerrarJogo();
    return;
  }

  if (valor < numeroSecreto) {
    definirMensagem("📉 O número secreto é maior.", "info");
  } else {
    definirMensagem("📈 O número secreto é menor.", "info");
  }

  palpiteInput.value = "";
  palpiteInput.focus();
}

function reiniciarJogo() {
  numeroSecreto = Math.floor(Math.random() * 100) + 1;
  tentativasRestantes = 10;
  jogoEncerrado = false;

  restantes.textContent = tentativasRestantes;
  palpiteInput.value = "";
  palpiteInput.disabled = false;
  btnChutar.disabled = false;
  btnReiniciar.classList.add("hidden");

  definirMensagem("Boa sorte!", "info");
  palpiteInput.focus();
}

btnChutar.addEventListener("click", verificarPalpite);

palpiteInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    verificarPalpite();
  }
});

btnReiniciar.addEventListener("click", reiniciarJogo);