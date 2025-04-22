
(function () {
  const canvas = document.createElement('canvas');
  canvas.id = 'snakeCanvas';
  canvas.width = 800;
  canvas.height = 200;
  Object.assign(canvas.style, {
    display: 'block',
    margin: '0 auto',
    backgroundColor: 'transparent'
  });

  const container = document.getElementById('kri4tiv-snake') || document.body;
  container.appendChild(canvas);

  const ctx = canvas.getContext('2d');

  let letters = "KRI4TIV".split('').map((char, i) => ({
    char,
    x: 150 + i * 90,
    y: 100,
    dx: 0,
    dy: 0,
    eaten: false
  }));

  let snake = {
    x: -40,
    y: 100,
    size: 10,
    speed: 2,
    eatingIndex: 0,
    state: "eating"
  };

  let showingHireMe = false;
  let mouseX = 0;

  document.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
  });

  function drawText(text, xOffset = 150) {
    ctx.fillStyle = "#E2E2E2";
    ctx.shadowColor = "#9146FF";
    ctx.shadowBlur = 10;
    ctx.font = "bold 48px Arial";
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      let targetX = xOffset + i * 90;
      let dx = (mouseX - targetX) / 150;
      dx = Math.max(Math.min(dx, 1), -1) * 5;

      ctx.save();
      ctx.translate(dx, 0);
      ctx.fillText(char, targetX, 110);
      ctx.restore();
    }
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!showingHireMe) {
      drawText("KRI4TIV");
      for (let i = 0; i < snake.eatingIndex; i++) {
        const l = letters[i];
        ctx.clearRect(l.x - 20, l.y - 50, 60, 70);
      }
    } else {
      drawText("HIRE ME", 200);
    }

    ctx.beginPath();
    ctx.arc(snake.x, snake.y, snake.size, 0, Math.PI * 2);
    ctx.fillStyle = "#E2E2E2";
    ctx.shadowColor = "#9146FF";
    ctx.shadowBlur = 12;
    ctx.fill();

    if (snake.state === "eating") {
      if (snake.eatingIndex < letters.length) {
        const target = letters[snake.eatingIndex];
        if (snake.x >= target.x) {
          target.eaten = true;
          snake.size += 4;
          snake.speed *= 0.9;
          snake.eatingIndex++;
        }
      } else {
        snake.state = "exit";
      }
    }

    if (snake.state === "exit") {
      snake.x += 2.5;
      if (snake.x > canvas.width + 60 && !showingHireMe) {
        showingHireMe = true;
        setTimeout(() => reset(), 3000);
      }
    } else {
      snake.x += snake.speed;
    }

    requestAnimationFrame(draw);
  }

  function reset() {
    snake = { x: -40, y: 100, size: 10, speed: 2, eatingIndex: 0, state: "eating" };
    showingHireMe = false;
    letters.forEach(l => l.eaten = false);
  }

  draw();
})();
