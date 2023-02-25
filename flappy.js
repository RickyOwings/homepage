/*
    Goals: make a wire frame flappy bird game
        - logic for the game

        - visuals for the game
            - make the logic to handle polygonal drawing


    - game objects
        - can be a decal with no collisions
        - can be an object with physics based logic
        - ideally we want the objects the be updated before drawn

    - camera object
        - use a camera object so that the game can retain same zoom
        no matter the resolution
        - base the size on the distance of the width and height of the area
        - need to convert game visual units to actual canvas locations
            - create a custom lineTo and moveTo function that converts the
            units for you to simply the code
*/



// ----------------------------------------------------------------------------

// main function is called when the document is loaded


function main() {
    addCanvas();
    // override the padding style for the content
    document.getElementById("content").style.padding = 0;
    document.getElementById("content").style.margin = 0;
    titleScreen();

}

function titleScreen(){
    ctx.strokeStyle = "#ddd";
    ctx.font = '60px Roboto Condensed'
    ctx.strokeText("Flappy Cube", canvas.width/2 - 120, canvas.height/2 + 30);
    setTimeout(()=>{
        initGameLoop();
        console.log("gameLoop initialized")
        initGameElements();
    }, 4000);
}

var doDeathScreen = false;
function deathScreen(){
    ctx.strokeStyle = "#ddd";
    ctx.font = '60px Roboto Condensed'
    ctx.beginPath();
    ctx.strokeText("You Died", canvas.width/2 - 120, canvas.height/2 + 30);
    ctx.strokeText(`Score: ${Math.floor(score/1000)}`, canvas.width/2 - 120, canvas.height/2 + 90);
    ctx.closePath();
    ctx.stroke();
}

// --------------------------------CANVAS ELEMENT-------------------------------------

const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");
const addCanvas = () => {
    document.getElementById("content").appendChild(canvas)
    fitCanvas();
};

const fitCanvas = () => {
    const tree = document.getElementById("tree");
    const vertSpacers = document.getElementsByClassName("verticalSpacer");
    const buffer = document.getElementById("buffer");
    let elements = [tree, ...vertSpacers, buffer];
    let totalWidth = 0;
    for (let i in elements) totalWidth += elements[i].clientWidth;
    const pageContainer = document.getElementById("pageContainer");

    canvas.width = pageContainer.clientWidth - totalWidth;
    canvas.height = pageContainer.clientHeight;
}

window.addEventListener('resize', fitCanvas);

// --------------------------------CANVAS ELEMENT-------------------------------------
//////////////////////////////////////////////////////////////////////////////////////
// ------------------------------CUSTOM CTX METHODS-----------------------------------

const g = {
    canvasDiagonal(){
        return Math.sqrt(canvas.width ** 2 + canvas.height **2);
    },
    // basically the amout of units contained on the diagonal
    zoom: 100,
    unitSize(){
        return this.canvasDiagonal()/this.zoom;
    },
    widthGameUnits(){
        return canvas.width * this.zoom / this.canvasDiagonal();
    },
    heightGameUnits(){
        return canvas.height * this.zoom / this.canvasDiagonal();
    },
    bottom(){
        return -this.heightGameUnits()/2
    },
    top(){
        return this.heightGameUnits()/2
    },
    left(){
        return -this.widthGameUnits()/2
    },
    right(){
        return this.widthGameUnits()/2
    },
    gameToCanvas (x,y){
        let uSize = this.unitSize();
        let [ux, uy] = [
            x * uSize,
            y * uSize
        ]
        let [canvasX, canvasY] = [
            Math.floor(ux + canvas.width/2) + 0.5,
            Math.floor((canvas.height/2) - uy) + 0.5,
        ];
        return [canvasX, canvasY]
    },
    lineTo(x,y){
        ctx.lineTo(...this.gameToCanvas(x,y));
    },
    moveTo(x,y){
        ctx.moveTo(...this.gameToCanvas(x,y));
    },
}

// ------------------------------CUSTOM CTX METHODS-----------------------------------
//////////////////////////////////////////////////////////////////////////////////////
// ------------------------------GAME OBJECT CLASS------------------------------------

class GameObject {
    constructor() {
        GameObject.instances.push(this);
    }
    isGarbage = false;
    update(progress){}
    draw(){}
}
GameObject.instances = [];
GameObject.updateAll = (progress) => {
    for (let i in GameObject.instances){
        GameObject.instances[i].update(progress);
    }
}

GameObject.garbageCollector = () => {
    for (let i in GameObject.instances){
        if (GameObject.instances[i].isGarbage) GameObject.instances.splice(i,1);
    }
}

GameObject.allGarbage = () => {
    for (let i in GameObject.instances){
        GameObject.instances[i].isGarbage = true;
    }
}


GameObject.drawAll = () => {
    for (let i in GameObject.instances){
        GameObject.instances[i].draw();
    }
}

// ------------------------------GAME OBJECT CLASS------------------------------------
//////////////////////////////////////////////////////////////////////////////////////
// ---------------------------------PIPE CLASS----------------------------------------

class Pipe extends GameObject {
    // The pipe class will include the upper and bottom pipe
    constructor(){
        super();
        this.x = Pipe.STARTING_POINT;
        this.y = Pipe.MAX_DISTANCE * (Math.random()-0.5);
    }
    isPipe = true;
    update(progress){
        this.x-=progress*Pipe.speed/1000;
        if (this.x < -50) this.isGarbage = true;
    }
    draw(){
        ctx.strokeStyle = "#ddd";
        this.drawUpper();
        this.drawLower();
    }
    left = ()=> this.x - Pipe.WIDTH/2;
    right = ()=> this.x + Pipe.WIDTH/2;
    /*
    The top and bottom are flipped. This is because the top is
    refering to the top of the bottom pipe. The bottom is refering
    to the bottom of the top pipe
    */
    top = ()=> this.y - Pipe.MARGIN/2;
    bottom = ()=> this.y + Pipe.MARGIN/2;

    drawUpper(){
        let left = this.left();
        let right = this.right();
        let bottom = this.bottom();
        ctx.beginPath();
        g.moveTo(left, 100);
        g.lineTo(left, bottom);
        g.lineTo(right, bottom);
        g.lineTo(right, 100);
        ctx.closePath();
        ctx.stroke();
    }
    drawLower(){
        let left = this.left();
        let right = this.right();
        let top = this.top();
        ctx.beginPath();
        g.moveTo(left, -100);
        g.lineTo(left, top);
        g.lineTo(right, top);
        g.lineTo(right, -100);
        ctx.closePath();
        ctx.stroke();
    }
}
Pipe.MARGIN = 10;
Pipe.STARTING_POINT = 50;
Pipe.MAX_DISTANCE = 30;
Pipe.WIDTH = 5;
Pipe.TIMER = 4000;
Pipe.speed = 15;
Pipe.maker;

// ---------------------------------PIPE CLASS----------------------------------------
//////////////////////////////////////////////////////////////////////////////////////
// --------------------------------PLAYER CLASS---------------------------------------
class Player extends GameObject {
    x = 0;
    y = 0;
    yv = 0;
    update(progress){
        if (Player.pressed){
            this.yv = Player.jumpVelocity;
            Player.pressed = false;
        }
        this.yv -= Player.gravity * progress/1000;
        this.y += this.yv * progress/1000;
        this.checkInScreen();
        this.checkPipeCollision();
    };
    left = ()=> this.x - Player.size/2;
    right = ()=> this.x + Player.size/2;
    top = ()=> this.y + Player.size/2;
    bottom = ()=> this.y - Player.size/2;

    draw(){
        let left = this.left();
        let right = this.right();
        let top = this.top();
        let bottom = this.bottom();
        ctx.strokeStyle = "#ddd";
        ctx.beginPath();
        g.moveTo(left, top);
        g.lineTo(right, top);
        g.lineTo(right, bottom);
        g.lineTo(left, bottom);
        ctx.closePath();
        ctx.stroke();
    };
    checkInScreen(){
        if (this.bottom() < g.bottom() || this.top() > g.top())
        restart();
    }
    checkPipeCollision(){
        // iterate through all of the pipes and check if they are colliding
        for(let i in GameObject.instances){
            let pipe = GameObject.instances[i];
            if (!pipe.isPipe) continue; // skip if the object is not a pipe
            if (this.right() < pipe.left() || this.left() > pipe.right()){continue} // skip if the object's x is not in range
            // now it is a given that the x is intersecting, so check if player is within margins of y
            if (this.top() < pipe.bottom() && this.bottom() > pipe.top()){continue}
            // since the player is colliding, we should restart the game
            restart();
        }
    }
}
Player.size = 2;
Player.gravity = 16;
Player.jumpVelocity = 16;
Player.pressed = false;

canvas.addEventListener('click' || 'touchstart', ()=>{
    Player.pressed = true;
},false)

function restart(){
    GameObject.allGarbage();
    score = totalDistance;
    doDeathScreen = true;
    clearInterval(Pipe.maker);
    setTimeout(initGameElements, 4000);
}

// --------------------------------PLAYER CLASS---------------------------------------
//////////////////////////////////////////////////////////////////////////////////////
// -------------------------------MAIN GAME LOOP--------------------------------------

function update(progress) {
    GameObject.updateAll(progress);
    GameObject.garbageCollector();
    Pipe.speed += progress / 100000
    totalDistance += progress;
}

function draw() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
    if (doDeathScreen) deathScreen();
    GameObject.drawAll();
}


var lastRender = 0;
var firstTime = true;
var totalDistance = 0;
var score = 0;
function loop(timestamp) {
    let progress = timestamp - lastRender;
    lastRender = timestamp;
    if (!firstTime) {
        update(progress);
        draw();
    }
    else {
        firstTime = false;
    }
    window.requestAnimationFrame(loop);
}
const initGameLoop = ()=>{ window.requestAnimationFrame(loop) };

// -------------------------------MAIN GAME LOOP--------------------------------------

function initGameElements(){
    totalDistance = 0;
    doDeathScreen = false;
    let player = new Player();
    Pipe.speed = 5;
    Pipe.maker = setInterval(()=>{new Pipe()}, Pipe.TIMER)
}

window.onload = setTimeout(main, 100);