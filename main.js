const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const slider = document.getElementById("slider");
const colorPickerTwig = document.getElementById("colorPickerTwig");
const colorPickerbranch = document.getElementById("colorPickerbranch");

canvas.width = window.innerWidth * 0.7;
canvas.height = window.innerHeight * 0.97;
let lineLength = 200;
let sliderangle=degToRad(45);
let branchColor = "white";
let twigColor = "green";
let angle = 0;


function degToRad(deg) {
  return deg * (Math.PI / 180.0);
}

function draw() {
  ctx.strokeStyle = branchColor;
  ctx.translate(canvas.width/2, canvas.height);
  angle = sliderangle;
  branch(lineLength);
}
function branch(len) {
  if(len<20){
    ctx.strokeStyle=twigColor;
  }

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, -len);
  ctx.stroke();

  ctx.translate(0, -len);
  if (len > 4) {
    ctx.save();
    ctx.rotate(angle);

    branch(len * 0.67);

    ctx.restore();
    ctx.save();
    ctx.rotate(-angle);

    branch(len * 0.67);
  
    ctx.restore();
  }
}   
draw();

colorPickerTwig.addEventListener("input", () => {
  twigColor = colorPickerTwig.value;
  initalContext();
  clearCanvas();
  updateSliderValue();
  draw();
  
});

colorPickerbranch.addEventListener("input", () => {
  branchColor = colorPickerbranch.value;
  initalContext();
  clearCanvas();
  updateSliderValue();
  draw();

});

function updateSliderValue() {
  sliderangle = degToRad(parseInt(slider.value));

}

function initalContext(){
  ctx.translate(0,lineLength);
  ctx.translate(-canvas.width/2, -canvas.height);
}

slider.addEventListener("input", () => {
  console.log("hello");
  initalContext();
  // ctx.translate(0,lineLength);
  // ctx.translate(-canvas.width/2, -canvas.height);
  clearCanvas();
  updateSliderValue();
  draw();

});


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}



