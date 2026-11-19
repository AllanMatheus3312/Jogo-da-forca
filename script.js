let temaRodada = prompt("Digite o tema da rodada (ex: Frutas, Filmes, Animais):");
let palavraSecreta = prompt("Digite a palavra secreta (não mostre para os outros):").toLowerCase();

document.getElementById("tema").textContent = "Tema: " + temaRodada;

let letrasCorretas = [];
let letrasErradas = [];
let erros = 0;
const maxErros = 6; // agora inclui cabeça

const canvas = document.getElementById("forcaCanvas");
const ctx = canvas.getContext("2d");

// Estrutura da forca
function desenharEstrutura() {
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#fff";
  ctx.beginPath();
  ctx.moveTo(50, 330);
  ctx.lineTo(50, 50);
  ctx.lineTo(200, 50);
  ctx.lineTo(200, 80);
  ctx.stroke();
  // corda
  ctx.beginPath();
  ctx.moveTo(200, 80);
  ctx.lineTo(200, 100);
  ctx.stroke();
}
desenharEstrutura();

// Boneco completo (inclui cabeça)
function desenharBoneco(parte) {
  ctx.strokeStyle = "#fff";
  switch(parte) {
    case 1: ctx.beginPath(); ctx.arc(200, 120, 20, 0, Math.PI * 2); ctx.stroke(); break; // cabeça
    case 2: ctx.beginPath(); ctx.moveTo(200, 140); ctx.lineTo(200, 200); ctx.stroke(); break; // tronco
    case 3: ctx.beginPath(); ctx.moveTo(200, 160); ctx.lineTo(170, 180); ctx.stroke(); break; // braço E
    case 4: ctx.beginPath(); ctx.moveTo(200, 160); ctx.lineTo(230, 180); ctx.stroke(); break; // braço D
    case 5: ctx.beginPath(); ctx.moveTo(200, 200); ctx.lineTo(180, 240); ctx.stroke(); break; // perna E
    case 6: ctx.beginPath(); ctx.moveTo(200, 200); ctx.lineTo(220, 240); ctx.stroke(); break; // perna D
  }
}

function mostrarPalavra() {
  let exibicao = "";
  for (let letra of palavraSecreta) {
    if (letra === " ") {
      exibicao += "   "; // espaço já revelado
    } else {
      exibicao += letrasCorretas.includes(letra) ? letra + " " : "_ ";
    }
  }
  document.getElementById("palavra").textContent = exibicao;
}

function criarTeclado() {
  const teclado = document.getElementById("teclado");
  const letras = "abcdefghijklmnopqrstuvwxyz";
  for (let l of letras) {
    let btn = document.createElement("button");
    btn.textContent = l;
    btn.onclick = () => jogar(l, btn);
    teclado.appendChild(btn);
  }
}

function jogar(letra, botao) {
  botao.disabled = true;
  if (palavraSecreta.includes(letra)) {
    letrasCorretas.push(letra);
  } else {
    letrasErradas.push(letra);
    erros++;
    desenharBoneco(erros);
    document.getElementById("letrasErradas").textContent = letrasErradas.join(", ");
  }
  mostrarPalavra();
  verificarFim();
}

function verificarFim() {
  // vitória
  if (!document.getElementById("palavra").textContent.includes("_")) {
    mostrarFeedback("🎉 Você venceu!");
    desativarTeclado();
  }
  // derrota
  else if (erros >= maxErros) {
    mostrarFeedback(" Você perdeu! A palavra era: " + palavraSecreta);
    desativarTeclado();
  }
}

function mostrarFeedback(texto) {
  const feedback = document.getElementById("feedback");
  feedback.textContent = texto;
  feedback.style.display = "block";
}

function desativarTeclado() {
  document.querySelectorAll("#teclado button").forEach(btn => btn.disabled = true);
}

// Inicializar
mostrarPalavra();
criarTeclado();
