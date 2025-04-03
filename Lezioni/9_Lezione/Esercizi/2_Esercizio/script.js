const canvas = document.getElementById("gameCanvas"),
  ctx = canvas.getContext("2d");
let balls = [],
  maxBalls = 10; // Limite massimo di palline
let ballRadius = 20,
  ballSpeedMin = 2,
  ballSpeedMax = 4;
let gameRunning = false; // Stato del gioco (avviato o fermo)
const toggleButton = document.getElementById("toggleButton");

async function loadConfig() {
  try {
    const response = await fetch("config.json");
    const config = await response.json();
    // Imposta i valori letti dal file JSON
    maxBalls = config.maxBalls;
    ballRadius = config.ballRadius;
    ballSpeedMin = config.ballSpeedMin;
    ballSpeedMax = config.ballSpeedMax;
  } catch (error) {
    console.error("Errore nel caricamento del file di configurazione:", error);
  }
}

function createBall() {
  if (balls.length < maxBalls && gameRunning) {
    const ball = {
      x: Math.random() * canvas.width,
      y: canvas.height,
      radius: ballRadius,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: ballSpeedMin + Math.random() * (ballSpeedMax - ballSpeedMin),
      angleX: 0, // Nessun movimento orizzontale
      angleY: -1, // Movimento verso l'alto (angolo negativo lungo Y)
    };
    balls.push(ball);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball, index) => {
    ball.x += ball.angleX * ball.speed;
    ball.y += ball.angleY * ball.speed;

    if (ball.y <= canvas.height * 0.25)
      if (balls.length < maxBalls) createBall();

    if (ball.y <= 0) {
      balls.splice(index, 1);
      ball.y = canvas.height;
    }

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
  });
}

function update() {
  if (gameRunning) {
    draw();
    requestAnimationFrame(update);
  }
}

function toggleGame() {
  if (gameRunning) {
    gameRunning = false;
    toggleButton.textContent = "Start";
  } else {
    gameRunning = true;
    toggleButton.textContent = "Stop";
    createBall();
    update();
  }
}

function restartGame() {
  balls = [];
  gameRunning = false;
  toggleButton.textContent = "Start";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  update();
}

// Carica la configurazione all'inizio
loadConfig().then(() => {
  toggleGame();
});
