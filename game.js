let canvas = document.getElementById("myCanvas");
let pen = canvas.getContext("2d");

let score = 0;
document.getElementById("score").textContent = score;

let bg = new Image();
bg.onload = uploadBG;
bg.src = "bg.jpg";

let character = new Image();
character.onload = uploadCharacter;
character.src = "character.png";

let characterX = 650;
let characterY = 400; 
let gems = [];
let crystalsFall; 

for (let i = 0; i < 6; i++) {
    gems[i] = new Object();
    gems[i].x = randomNumber(50, 1150);
    gems[i].y = randomNumber(0, 50);
    gems[i].img = new Image();
    gems[i].img.onload = function() {
        uploadCrystal(gems[i])
    }
    gems[i].img.src = "crystal.png";
}

function startGame() {
    document.getElementById("score-container").style.display = "inline-block";
    crystalsFall = setInterval(function() 
    {
        uploadBG();
        uploadCharacter();
        
        for (let i = 0; i < 6; i++) {
            gems[i].y += randomNumber(5, 10);

            let touchesGround = checkGround(gems[i]);
            let touchesCharacter = checkCharacter(gems[i]);

            if (touchesGround || touchesCharacter) {
                if (touchesCharacter) {
                    score = score + 2;
                }
                else if (touchesGround) {
                    score--; 
                }
                checkGame();
                document.getElementById("score").textContent = score;
                gems[i].y = randomNumber(0, 50);
                gems[i].x = randomNumber(0, 1150);
            }        

            uploadCrystal(gems[i]); 
        } 
    }, 100)
}

function randomNumber(min, max) {
    return min + Math.floor(Math.random() * (max - min));
}

function uploadBG() 
{
    pen.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

function uploadCharacter() {
    pen.drawImage(character, characterX, characterY, 100, 100)
}

function uploadCrystal(gem) {
    pen.drawImage(gem.img, gem.x, gem.y, 24, 19)
}  

function stopFallingCrystal() {
    clearInterval(crystalsFall); 
}

function pauseGame() {
    document.getElementById("start").textContent = "RESUME";

    clearInterval(crystalsFall);
}

function resetGame() {
    document.getElementById("start").textContent = "START"; 
    score = 0;
    stopFallingCrystal();
    characterX = 400; 
    characterY = 600;   
    document.getElementById("score").textContent = score; 
    uploadBG();
    for (let i = 0; i <= 6; i++) {
        gems[i].y += randomNumber(5, 10);
        uploadCrystal(gems[i]); 
    } 
    uploadCharacter();
}

function checkGround(gem) {
    return gem.y > 480; 
}

function checkCharacter(gem) {
    return gem.y > characterY && gem.x + 24 < characterX + 100 && gem.x > characterX; 
}

function checkGame() {
    if (score < 0) {
        document.getElementById("result").textContent = "GAME OVER";
        // document.getElementById("score-container").style.display = "none";
        resetGame();
    }
    else if (score >= 20) {
        document.getElementById("result").textContent = "YOU WIN";
        // clearInterval(crystalsFall);
        resetGame();  
    }
}

window.addEventListener("keydown", function(e) {
    console.log(e.key);
    if (e.key == "ArrowRight") {
        characterX += 10
        uploadCharacter();
    }

    else if (e.key == "ArrowLeft") {
        characterX -= 10;
        uploadCharacter();
    }
})