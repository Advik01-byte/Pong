import { draw, gameLoop } from './functions.js';
import { PADDLE_HEIGHT } from './constants.js';
import { playerY } from './states.js';

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Mouse control
canvas.addEventListener('mousemove', (e) => {
  const rect = canvas.getBoundingClientRect();
  let mouseY = e.clientY - rect.top;
  playerY = mouseY - PADDLE_HEIGHT / 2;
  // Clamp paddle position
  if (playerY < 0) playerY = 0;
  if (playerY > canvas.height - PADDLE_HEIGHT) playerY = canvas.height - PADDLE_HEIGHT;
});

draw();
gameLoop();
