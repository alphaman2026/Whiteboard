const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let drawing = false;
let color = "#000";
let size = 3;
let erasing = false;

// UI 연결
document.getElementById("colorPicker").onchange = e => color = e.target.value;
document.getElementById("sizePicker").oninput = e => size = e.target.value;

document.getElementById("pen").onclick = () => erasing = false;
document.getElementById("eraser").onclick = () => erasing = true;

document.getElementById("clear").onclick = () => {
  ctx.fillStyle = "white";
  ctx.fillRect(0,0,canvas.width,canvas.height);
};

document.getElementById("save").onclick = () => {
  const link = document.createElement("a");
  link.download = "whiteboard.png";
  link.href = canvas.toDataURL();
  link.click();
};

// 그리기 시작
function start(x, y) {
  drawing = true;
  ctx.beginPath();
  ctx.moveTo(x, y);
}

// 그리기
function draw(x, y) {
  if (!drawing) return;

  ctx.lineWidth = size;
  ctx.lineCap = "round";

  if (erasing) {
    ctx.globalCompositeOperation = "destination-out";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = color;
  }

  ctx.lineTo(x, y);
  ctx.stroke();
}

// 종료
function end() {
  drawing = false;
}

// 마우스
canvas.addEventListener("mousedown", e => start(e.offsetX, e.offsetY));
canvas.addEventListener("mousemove", e => draw(e.offsetX, e.offsetY));
canvas.addEventListener("mouseup", end);

// 모바일 터치
canvas.addEventListener("touchstart", e => {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  start(touch.clientX - rect.left, touch.clientY - rect.top);
});

canvas.addEventListener("touchmove", e => {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  draw(touch.clientX - rect.left, touch.clientY - rect.top);
});

// 초기 배경 흰색 채우기
ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);



canvas.addEventListener("touchend", end);
