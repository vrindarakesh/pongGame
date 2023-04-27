const canvas = document.getElementById('pongCanvas');
const ctx = canvas.getContext('2d');
const lowSpeed = document.getElementById('lowSpeed');
const mediumSpeed = document.getElementById('mediumSpeed');
const highSpeed = document.getElementById('highSpeed');
const refreshBtn = document.getElementById('refresh');
const resetBtn = document.getElementById('reset');

const paddleWidth = 10;
const paddleHeight = 100;
const playerSpeed = 4;

let playerY = (canvas.height - paddleHeight) / 2;
let computerY = (canvas.height - paddleHeight) / 2;

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 2;

let playerScore = 0;
let computerScore = 0;

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.fillRect(20, playerY, paddleWidth, paddleHeight);
    ctx.fillRect(canvas.width - 20 - paddleWidth, computerY, paddleWidth, paddleHeight);

    ctx.beginPath();
    ctx.arc(ballX, ballY, 8, 0, Math.PI * 2);
    ctx.fill();

    // Draw score
    ctx.font = '30px Arial';
    ctx.fillText(`Player: ${playerScore}`, 50, 50);
    ctx.fillText(`Computer: ${computerScore}`, canvas.width - 250, 50);
}

function update() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < 0 || ballY > canvas.height) {
        ballSpeedY = -ballSpeedY;
    }

    if (ballX < 20 + paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    } else if (ballX > canvas.width - 20 - paddleWidth * 2 && ballY > computerY && ballY < computerY + paddleHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX < 0) {
        computerScore++;
        resetBall();
    } else if (ballX > canvas.width) {
        playerScore++;
        resetBall();
    }

    if (computerY + paddleHeight / 2 < ballY) {
        computerY += playerSpeed;
    } else {
        computerY -= playerSpeed;
    }
}

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() * 4 - 2;
}

canvas.addEventListener('mousemove', (e) => {
    const canvasPosition = canvas.getBoundingClientRect();
    playerY = e.clientY - canvasPosition.top - paddleHeight / 2;
});

lowSpeed.addEventListener('click', () => {
    ballSpeedX = Math.sign(ballSpeedX) * 4;
    ballSpeedY = Math.sign(ballSpeedY) * 2;
});

mediumSpeed.addEventListener('click', () => {
    ballSpeedX = Math.sign(ballSpeedX) * 6;
    ballSpeedY = Math.sign(ballSpeedY) * 3;
});

highSpeed.addEventListener('click', () => {
    ballSpeedX = Math.sign(ballSpeedX) * 8;
    ballSpeedY = Math.sign(ballSpeedY) * 4;
});

refreshBtn.addEventListener('click', () => {
    playerScore = 0;
    computerScore = 0;
    resetBall();
});

function resetBall() {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = -ballSpeedX;
    ballSpeedY = Math.random() * 4 - 2;
}

function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);

    // Update score
    document.querySelector('.player-score').textContent = `Player: ${playerScore}`;
    document.querySelector('.computer-score').textContent = `Computer: ${computerScore}`;
}

gameLoop();