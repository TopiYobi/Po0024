const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15 };
let dx = 1;
let dy = 0;
let score = 0;
let intervalId;

canvas.width = 400;
canvas.height = 400;

function startGame() {
    intervalId = setInterval(gameLoop, 100);
    document.getElementById("leftBtn").addEventListener("click", moveLeft);
    document.getElementById("rightBtn").addEventListener("click", moveRight);
    document.getElementById("upBtn").addEventListener("click", moveUp);
    document.getElementById("downBtn").addEventListener("click", moveDown);
}

function gameLoop() {
    update();
    draw();
}

function update() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score++;
        generateFood();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width / 20 ||
        head.y < 0 || head.y >= canvas.height / 20 ||
        collision(head, snake.slice(1))) {
        gameOver();
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    ctx.fillStyle = "green";
    snake.forEach(segment => {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    });

    ctx.fillStyle = "white";
    ctx.font = "20px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function generateFood() {
    food.x = Math.floor(Math.random() * (canvas.width / 20));
    food.y = Math.floor(Math.random() * (canvas.height / 20));
}

function collision(head, array) {
    return array.some(segment => {
        return head.x === segment.x && head.y === segment.y;
    });
}

function moveLeft() {
    dx = -1;
    dy = 0;
}

function moveRight() {
    dx = 1;
    dy = 0;
}

function moveUp() {
    dx = 0;
    dy = -1;
}

function moveDown() {
    dx = 0;
    dy = 1;
}

function gameOver() {
    clearInterval(intervalId);
    alert(`Game Over! Your score: ${score}`);
    snake = [{ x: 10, y: 10 }];
    food = { x: 15, y: 15 };
    dx = 1;
    dy = 0;
    score = 0;
    startGame();
}

startGame();
