const canvas = getElementById('pongCanvas');

// State
export let playerY = canvas.height / 2 - PADDLE_HEIGHT / 2;
export let aiY = canvas.height / 2 - PADDLE_HEIGHT / 2;
export let ballX = canvas.width / 2 - BALL_SIZE / 2;
export let ballY = canvas.height / 2 - BALL_SIZE / 2;
export let ballVelX = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
export let ballVelY = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
export let playerScore = 0;
export let aiScore = 0;
