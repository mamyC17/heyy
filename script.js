const canvas = document.getElementById('heartCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
let t = 0;

// Sparkles
const sparkles = [];
for (let i = 0; i < 100; i++) {
  sparkles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2 + 1,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    color: `hsl(${Math.random()*360}, 100%, 80%)`
  });
}

// Draw heart using parametric equation
function drawHeart(scale, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  for (let i = 0; i <= 2 * Math.PI; i += 0.01) {
    let x = 16 * Math.pow(Math.sin(i), 3);
    let y = 13 * Math.cos(i) - 5 * Math.cos(2*i) - 2 * Math.cos(3*i) - Math.cos(4*i);
    ctx.lineTo(centerX + x*scale, centerY - y*scale);
  }
  ctx.closePath();
  ctx.fill();
}

// Draw sparkles
function drawSparkles() {
  sparkles.forEach(s => {
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
    ctx.fill();
    
    s.x += s.dx;
    s.y += s.dy;
    
    if (s.x < 0 || s.x > canvas.width) s.dx *= -1;
    if (s.y < 0 || s.y > canvas.height) s.dy *= -1;
  });
}

// Draw text inside heart
function drawText(scale) {
  // TSANTA in center
  ctx.fillStyle = 'blue';
  ctx.font = `${scale*2.5}px Arial Black`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('TSANTA', centerX, centerY);

  // I LOVE U on the left
  ctx.fillStyle = 'pink';
  ctx.font = `${scale*1.2}px Arial Black`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('I LOVE U', centerX - scale*7, centerY - scale*2);
}

// Animate
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  drawSparkles();
  
  // Back colorful layer
  drawHeart(18 + 3 * Math.sin(t*2), `hsl(${(t*50)%360}, 100%, 60%)`);
  
  // Front purple layer
  drawHeart(15 + 3 * Math.sin(t), 'purple');
  
  drawText(15 + 3 * Math.sin(t));
  
  t += 0.05;
  requestAnimationFrame(animate);
}

animate();
