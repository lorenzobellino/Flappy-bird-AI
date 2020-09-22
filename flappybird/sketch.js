
var bird;
var pipes;
var score;
var maxScore=0;
var pipeBottom;
var pipeTop;
var bgImg;
var isOver = false;
var touched = false;
var prevTouched = touched;

//Load the image
function preload(){
  pipeTop = loadImage('graphics/pipet.png');
  pipeBottom = loadImage('graphics/pipeb.png')
  birdImg = loadImage('graphics/bird.png');
  bgImg = loadImage('graphics/bg.png');
}

function setup() {
  createCanvas(600,800);
  reset()
}

function reset() {
  frameCount = 0;
  isOver = false;
  score = 0;
  pipes = [];
  bird = new Bird();
  pipes.push(new Pipe());
  loop();
}

function draw() {
  image(bgImg,0,0);
  //for each pipe update its position and draw it
  for (var i = pipes.length - 1; i >= 0; i--) {
    pipes[i].update();
    pipes[i].show();
    //check if bird has passed a pipe
    if (pipes[i].pass(bird)) {
      score++;
    }
    //check if bird hit the pipe
    if (pipes[i].hits(bird)) {
      gameover();
    }
    //if the pipe is out of frame delete it from the array
    if (pipes[i].offscreen()) {
      pipes.splice(i, 1);
    }
  }
  bird.update();
  bird.show();
  //push a new pipe every 150 frame
  if (frameCount % 150 == 0) {
    pipes.push(new Pipe());
  }
  showScores();
}

function showScores() {
  textSize(32);
  text('score: ' + score, 1, 32);
  text('record: ' + maxScore, 1, 64);
}

function gameover() {
  textSize(64);
  textAlign(CENTER, CENTER);
  text('GAMEOVER', width / 2, height / 2);
  textAlign(LEFT, BASELINE);
  maxScore = max(score, maxScore);
  isOver = true;
  noLoop();
}

function keyPressed() {
  switch(key){
    case ' ':
    bird.up();
    if(isOver) reset();
    break;
  }
}

function touchStarted() {
  if (isOver) reset();
}
