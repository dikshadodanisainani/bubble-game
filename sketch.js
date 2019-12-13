// constructor to create ground
function Ground(x , y, w, h,a){
  var options = {
    isStatic:true,
    angle: a,
    friction :1,
  }
  this.body = Bodies.rectangle(x,y,w,h,options);
  this.w = w;
  this.h = h;
  World.add(myWorld, this.body);
  this.show = function(){
    var pos = this.body.position;
    push();
    translate(pos.x,pos.y);
    noStroke();
    rotate(a);
    fill(255,0,0);
    rectMode(CENTER)
    rect(0,0, this.w, this.h);
    pop();
  }
}

function Particle(x , y, w, h){
var options = {
  friction : 1,
  restitution: 2,
}
  this.body = Bodies.rectangle(x,y,w,h,options);
  this.w = w;
  this.h = h;
  World.add(myWorld, this.body);
  this.show = function(){
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    stroke(255,0,0);
    strokeWeight(4);
    fill(255,255,255,50);
    translate(pos.x,pos.y);
    rotate(angle);
    rectMode(CENTER);
    ellipse(0,0, this.w, this.h);
    pop();

 }
}

function gun()
{var options = {
  friction : 0,
  restitution: 0,
}
  this.body = Bodies.rectangle(700,400,10,40,options);
  this.w = 10;
  this.h = 40;
  World.add(myWorld, this.body);
  this.show = function(){
    var pos = this.body.position;
    
   pos.x=mouseX;
    pos.y=mouseY;
    var angle = this.body.angle;
    push();
    stroke(255,0,0);
    strokeWeight(4);
    fill(255,255,255,50);
    translate(pos.x,pos.y);
    rotate(angle);
    rectMode(CENTER);
    rect(0,0, this.w, this.h);
    pop();

 }

}

// module aliases
var Engine = Matter.Engine,
Render = Matter.Render,
World = Matter.World,
Bodies = Matter.Bodies;

var myEngine, myWorld;
var ground,g1;
var particles = [];
var score=0;

function setup() {
createCanvas(1024,500);
myEngine = Engine.create();
myWorld = myEngine.world
Engine.run(myEngine);
 g1=new gun();
ground1 = new Ground(550, 500, 1100, 30, 0);

}

function mouseDragged() {
particles.push(new Particle(mouseX, mouseY, 40, 40))
}

function draw() {
background(0);


for (var i = 0; i < particles.length; i++) {
  particles[i].show();
  
  if(isTouching(particles[i],gun))
{
  console.log(i);
  World.remove(myWorld,particles[i]);
  score=i+1;
}
}

ground1.show();
g1.show();

fill("red");
text("Score :"+score,700,150);
}