import { draw, gameLoop } from './functions.js';
import { PADDLE_WIDTH, PADDLE_HEIGHT, BALL_SIZE, PLAYER_X, AI_X, PADDLE_SPEED, BALL_SPEED } from './constants.js';

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
