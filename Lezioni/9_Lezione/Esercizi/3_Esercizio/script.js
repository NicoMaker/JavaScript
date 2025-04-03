const canvas = document.getElementById("gameCanvas"),
  ctx = canvas.getContext("2d");

let balls = []; // Array per tenere traccia delle palline
let maxBalls, ballRadius, ballSpeedMin, ballSpeedMax; // Variabili per configurazione

// Funzione per caricare il file di configurazione JSON
async function loadConfig() {
  try {
    const response = await fetch("config.json"),
      config = await response.json();
    // Imposta i valori letti dal file JSON
    maxBalls = config.maxBalls;
    ballRadius = config.ballRadius;
    ballSpeedMin = config.ballSpeedMin;
    ballSpeedMax = config.ballSpeedMax;
    update(); // Avvia il gioco dopo aver caricato la configurazione
  } catch (error) {
    console.error("Errore nel caricamento del file di configurazione:", error);
  }
}

// Funzione per creare una pallina
function createBall(x, y) {
  if (balls.length < maxBalls) {
    // Se il numero di palline è inferiore al massimo
    const ball = {
      x: x,
      y: y,
      radius: ballRadius,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: ballSpeedMin + Math.random() * (ballSpeedMax - ballSpeedMin),
      angleX: 0, // Nessun movimento orizzontale
      angleY: -1, // Movimento verso l'alto (angolo negativo lungo Y)
    };
    balls.push(ball); // Aggiungi la pallina all'array
  }
}

// Funzione per disegnare tutte le palline
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas

  balls.forEach((ball, index) => {
    // Muove la pallina verso l'alto
    ball.x += ball.angleX * ball.speed;
    ball.y += ball.angleY * ball.speed;

    // Se la pallina esce dal canvas, la rimuove
    if (ball.y + ball.radius <= 0) 
      balls.splice(index, 1); // Rimuove la pallina dall'array

    // Disegna la pallina
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  });
}

// Funzione di aggiornamento per animare il movimento delle palline
function update() {
  draw(); // Disegna le palline
  requestAnimationFrame(update); // Chiede al browser di fare un altro aggiornamento
}

// Aggiungi un evento per generare palline al click sul canvas
canvas.addEventListener("click", (e) => {
  const x = e.offsetX; // Posizione del clic sull'asse X
  const y = e.offsetY; // Posizione del clic sull'asse Y
  createBall(x, y); // Crea una pallina nel punto del clic
});

// Carica la configurazione e avvia il gioco
loadConfig(); // Carica la configurazione prima di avviare il gioco
