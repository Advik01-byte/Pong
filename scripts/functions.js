import { playerY, aiY, ballX, ballY, ballVelX, ballVelY } from './states.js';
import { BALL_SIZE, PADDLE_WIDTH, PADDLE_HEIGHT, AI_X, PLAYER_X, PADDLE_SPEED } from './constants.js';

const canvas = getElementById('pongCanvas');

// Draw everything
export function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw middle line
  ctx.strokeStyle = '#fff';
  ctx.setLineDash([10, 15]);
  ctx.beginPath();
  ctx.moveTo(canvas.width/2, 0);
  ctx.lineTo(canvas.width/2, canvas.height);
  ctx.stroke();
  ctx.setLineDash([]);

  // Draw paddles
  ctx.fillStyle = '#fff';
  ctx.fillRect(PLAYER_X, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(AI_X, aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

  // Draw ball
  ctx.fillStyle = '#0ff';
  ctx.fillRect(ballX, ballY, BALL_SIZE, BALL_SIZE);

  // Draw scores
  ctx.font = '32px Arial';
  ctx.fillStyle = '#fff';
  ctx.fillText(playerScore, canvas.width/2 - 50, 60);
  ctx.fillText(aiScore, canvas.width/2 + 30, 60);
}

// Simple AI
function updateAI() {
  // Move AI paddle toward ball
  let aiCenter = aiY + PADDLE_HEIGHT / 2;
  if (aiCenter < ballY) {
    aiY += PADDLE_SPEED;
  } else if (aiCenter > ballY + BALL_SIZE) {
    aiY -= PADDLE_SPEED;
  }
  // Clamp AI paddle position
  if (aiY < 0) aiY = 0;
  if (aiY > canvas.height - PADDLE_HEIGHT) aiY = canvas.height - PADDLE_HEIGHT;
}

// Ball movement and collision
function updateBall() {
  ballX += ballVelX;
  ballY += ballVelY;

  // Top and bottom wall collision
  if (ballY <= 0 || ballY + BALL_SIZE >= canvas.height) {
    ballVelY = -ballVelY;
    ballY = ballY <= 0 ? 0 : canvas.height - BALL_SIZE;
  }

  // Left paddle collision
  if (
    ballX <= PLAYER_X + PADDLE_WIDTH &&
    ballY + BALL_SIZE >= playerY &&
    ballY <= playerY + PADDLE_HEIGHT
  ) {
    ballVelX = Math.abs(ballVelX);
    // Add spin based on where the ball hit the paddle
    let hitPos = (ballY + BALL_SIZE/2) - (playerY + PADDLE_HEIGHT/2);
    ballVelY += hitPos * 0.15;
  }

  // Right paddle collision
  if (
    ballX + BALL_SIZE >= AI_X &&
    ballY + BALL_SIZE >= aiY &&
    ballY <= aiY + PADDLE_HEIGHT
  ) {
    ballVelX = -Math.abs(ballVelX);
    let hitPos = (ballY + BALL_SIZE/2) - (aiY + PADDLE_HEIGHT/2);
    ballVelY += hitPos * 0.15;
  }

  // Left wall (AI scores)
  if (ballX <= 0) {
    aiScore++;
    resetBall(-1);
  }
  // Right wall (Player scores)
  if (ballX + BALL_SIZE >= canvas.width) {
    playerScore++;
    resetBall(1);
  }
}

// Reset ball after score
function resetBall(direction) {
  ballX = canvas.width / 2 - BALL_SIZE / 2;
  ballY = canvas.height / 2 - BALL_SIZE / 2;
  ballVelX = BALL_SPEED * direction;
  ballVelY = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
}

// Main game loop
export function gameLoop() {
  updateAI();
  updateBall();
  draw();
  requestAnimationFrame(gameLoop);
}
