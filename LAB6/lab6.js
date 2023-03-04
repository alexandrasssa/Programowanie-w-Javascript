const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let balls = [];
let numBalls = 10;
let minDistance = 0.2 * canvas.width;
let requestId;

function init() {
	balls = [];
	numBalls = document.getElementById('balls-input').value;
	minDistance = document.getElementById('min-distance-input').value * canvas.width / 100;
	for (let i = 0; i < numBalls; i++) {
		balls.push({
			x: Math.random() * canvas.width,
			y: Math.random() * canvas.height,
			radius: 10,
			color: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
			speed: {
				x: (Math.random() - 0.5) * 10,
				y: (Math.random() - 0.5) * 10
			}
		});
	}
}

function drawLine(ball1, ball2) {
	ctx.beginPath();
	ctx.moveTo(ball1.x, ball1.y);
	ctx.lineTo(ball2.x, ball2.y);
	ctx.strokeStyle = 'black';
	ctx.stroke();
}

function drawBall(ball) {
	ctx.beginPath();
	ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = ball.color;
	ctx.fill();
}

function update() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < balls.length; i++) {
		const ball1 = balls[i];

		for (let j = i + 1; j < balls.length; j++) {
			const ball2 = balls[j];

			const distX = ball2.x - ball1.x;
			const distY = ball2.y - ball1.y;
			const distance = Math.sqrt(distX ** 2 + distY ** 2);

			if (distance < minDistance) {
				drawLine(ball1, ball2);
			}
		}

		drawBall(ball1);

		ball1.x += ball1.speed.x;
		ball1.y += ball1.speed.y;

		if (ball1.x + ball1.radius > canvas.width || ball1.x - ball1.radius < 0) {
			ball1.speed.x = -ball1.speed.x;
		}

		if (ball1.y + ball1.radius > canvas.height || ball1.y - ball1.radius < 0) {
			ball1.speed.y = -ball1.speed.y;
		}
	}
	requestId = requestAnimationFrame(update);
}

function startAnimation() {
	init();
	if (!requestId) {
		requestId = requestAnimationFrame(update);
	}
}

function stopAnimation() {
	if (requestId) {
		cancelAnimationFrame(requestId);
		requestId = undefined;
	}
}

document.getElementById('start-button').addEventListener('click', startAnimation);
document.getElementById('stop-button').addEventListener('click', stopAnimation);
document.getElementById('reset-button').addEventListener('click', init);
init();