// Impostazioni iniziali di Three.js
const scene = new THREE.Scene(),
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  ),
  renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById("tetrisCanvas"),
  });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Variabili per il gioco Tetris
const blockSize = 1,
  fieldWidth = 10, // larghezza del campo di gioco
  fieldHeight = 20, // altezza del campo di gioco
  fieldDepth = 10; // profondità del campo di gioco
let currentShape = null;
const placedBlocks = []; // Array per tenere traccia dei blocchi piazzati

// Creazione di un cubo
const createBlock = (x, y, z) => {
  const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize),
    material = new THREE.MeshBasicMaterial({
      color: Math.random() * 0xffffff,
    });
  const cube = new THREE.Mesh(geometry, material);
  cube.position.set(x, y, z);
  scene.add(cube);
  return cube;
};

// Gestione della rotazione dei blocchi
const rotateShape = (shape) => {
  shape.forEach((block) => {
    block.rotation.x += Math.PI / 18;
    block.rotation.y += Math.PI / 18;
    block.rotation.z += Math.PI / 18;
  });
};

// Funzione per generare una forma Tetris (una tetramino)
const generateShape = () => {
  const shapeType = Math.floor(Math.random() * 7); // Genera un tipo di forma casuale (7 possibili)
  const shape = [],
    xOffset = Math.floor(fieldWidth / 2),
    yOffset = fieldHeight;

  // Tipo I
  if (shapeType === 0) {
    shape.push(createBlock(xOffset - 2, yOffset, 0));
    shape.push(createBlock(xOffset - 1, yOffset, 0));
    shape.push(createBlock(xOffset, yOffset, 0));
    shape.push(createBlock(xOffset + 1, yOffset, 0));
  }
  // Tipo O
  else if (shapeType === 1) {
    shape.push(createBlock(xOffset, yOffset, 0));
    shape.push(createBlock(xOffset + 1, yOffset, 0));
    shape.push(createBlock(xOffset, yOffset - 1, 0));
    shape.push(createBlock(xOffset + 1, yOffset - 1, 0));
  }
  // Tipo T
  else if (shapeType === 2) {
    shape.push(createBlock(xOffset, yOffset, 0));
    shape.push(createBlock(xOffset - 1, yOffset, 0));
    shape.push(createBlock(xOffset + 1, yOffset, 0));
    shape.push(createBlock(xOffset, yOffset - 1, 0));
  }
  // Altri tipi possono essere aggiunti come sopra

  currentShape = shape;
};

// Funzione per fermare la forma quando tocca il fondo o altri blocchi
const stopShape = () => {
  currentShape.forEach((block) => {
    placedBlocks.push(block.position.clone());
  });
  currentShape = null;
};

// Funzione per verificare la collisione con il fondo
const checkCollision = () => {
  if (!currentShape) return false;
  for (let block of currentShape) {
    if (block.position.y <= 0) {
      return true;
    }
    for (let placed of placedBlocks) {
      if (
        block.position.x === placed.x &&
        block.position.y === placed.y &&
        block.position.z === placed.z
      ) {
        return true;
      }
    }
  }
  return false;
};

// Funzione per muovere la forma verso il basso
const moveDown = () => {
  if (currentShape) {
    currentShape.forEach((block) => {
      block.position.y -= blockSize;
    });
    if (checkCollision()) {
      currentShape.forEach((block) => {
        block.position.y += blockSize; // Spostiamo indietro in caso di collisione
      });
      stopShape(); // Ferma la forma
      generateShape(); // Genera una nuova forma
    }
  }
};

// Gestione delle dimensioni dello schermo (responsive)
window.addEventListener("resize", () => {
  const width = window.innerWidth,
    height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});

// Posiziona la telecamera
camera.position.z = 15;

// Funzione di animazione principale
function animate() {
  requestAnimationFrame(animate);

  // Muovi la forma verso il basso
  moveDown();

  // Ruota la forma attuale
  if (currentShape) rotateShape(currentShape);

  renderer.render(scene, camera);
}

// Genera una nuova forma e avvia il gioco
generateShape();
animate();
