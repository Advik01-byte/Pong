import { draw, gameLoop, updateAI, updateBall, resetBall } from './functions.js';

const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');

// Game constants
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 14;
const PLAYER_X = 20;
const AI_X = canvas.width - PADDLE_WIDTH - 20;
const PADDLE_SPEED = 7;
const BALL_SPEED = 6;

// State
let playerY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let aiY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let ballX = canvas.width / 2 - BALL_SIZE / 2;
let ballY = canvas.height / 2 - BALL_SIZE / 2;
let ballVelX = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
let ballVelY = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
let playerScore = 0;
let aiScore = 0;

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
