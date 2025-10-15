// State
let playerY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let aiY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let ballX = canvas.width / 2 - BALL_SIZE / 2;
let ballY = canvas.height / 2 - BALL_SIZE / 2;
let ballVelX = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
let ballVelY = BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);

const resetButton = document.getElementById('resetButton');

let playerScore = localStorage.getItem('playerScore') || 0;
let aiScore = localStorage.getItem('aiScore') || 0;

resetButton.addEventListener('click', () => {
    localStorage.removeItem('playerScore');
    localStorage.removeItem('aiScore');
    
    location.reload();
});