const canvas = document.getElementById("gameCanvas"),
  ctx = canvas.getContext("2d");
let balls = [];
const maxBalls = 10; // Limite massimo di palline
let gameRunning = false; // Stato del gioco (avviato o fermo)

function createBall() {
  if (balls.length < maxBalls && gameRunning) {
    // Crea una nuova pallina solo se non si è raggiunto il limite
    const ball = {
      x: Math.random() * canvas.width,
      y: canvas.height,
      radius: 20,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: 2 + Math.random() * 2,
      angleX: 0, // Nessun movimento orizzontale
      angleY: -1, // Movimento verso l'alto (angolo negativo lungo Y)
    };
    balls.push(ball);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball, index) => {
    ball.x += ball.angleX * ball.speed; // Nessun movimento orizzontale
    ball.y += ball.angleY * ball.speed; // Muove la pallina verso l'alto

    if (ball.y <= 0) {
      balls.splice(index, 1); // Rimuove la pallina che ha raggiunto la cima
      createBall(); // Crea una nuova pallina sotto
      ball.y = canvas.height; // La pallina riparte dal basso
    }

    // Disegna la pallina
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
    requestAnimationFrame(update); // Continuazione del movimento delle palline
  }
}

function toggleGame() {
  if (gameRunning) gameRunning = false; // Ferma il gioco
  else {
    gameRunning = true; // Avvia il gioco
    createBall(); // Crea una pallina iniziale
    update(); // Avvia l'animazione delle palline
  }
}

function resetGame() {
  balls = [];
  gameRunning = false; // Ferma il gioco
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Pulisce il canvas
}

// Avvia il gioco inizialmente (senza palline)
toggleGame();
