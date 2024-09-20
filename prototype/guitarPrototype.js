document.addEventListener("DOMContentLoaded", function() {
    const button1 = document.getElementById("generate");
    const button2 = document.getElementById("appear");

    button1.addEventListener("click", generateStrummingPattern);
    button2.addEventListener("click", generateChord);

    document.getElementById('guitarTuning').addEventListener('click', function(event) {
        var img = event.target;
        var x = (event.offsetX / img.clientWidth) * 100;
        var y = (event.offsetY / img.clientHeight) * 100;
        handleGuitarTuningClick(x, y);
    });
});


const arrowDown = new Image();
arrowDown.src = '../images/arrow_down.png';

const arrowUp = new Image();
arrowUp.src = '../images/arrow_up.png';

const noArrow = new Image();
noArrow.src = '../images/no_arrow.png';

function generateStrummingPattern() {
    // MAKING STRUMMING PATTERN 
    const canvas = document.getElementById('strummingCanvas');
    const ctx = canvas.getContext('2d');
    const numberOfStrums = document.getElementById('strummingNumber').value;

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Set canvas dimensions
    const canvasWidth = 300; // Adjust this value as needed
    const canvasHeight = 120; // Adjust this value as needed
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Define strumming pattern
    const strummingPattern = [];
    for (let i = 0; i < numberOfStrums; i++) {
        if (i % 2 === 0) {
            // Even index: Up strum or No strum
            strummingPattern.push(Math.random() > 0.3 ? 'U' : 'x');
        } else {
            // Odd index: Down strum or No strum
            strummingPattern.push(Math.random() > 0.3 ? 'D' : 'x');
        }
    }

    // Draw strumming pattern
    const step = canvas.width / numberOfStrums;
    const imgWidth = 50; // Set the desired width for the images
    const imgHeight = 80; // Set the desired height for the images

    for (let i = 0; i < numberOfStrums; i++) {
        let img;
        if (strummingPattern[i] === 'U') {
            img = arrowUp;
        } else if (strummingPattern[i] === 'D') {
            img = arrowDown;
        } else {
            img = noArrow;
        }
        ctx.drawImage(img, step * i + step / 2 - imgWidth / 2, canvas.height / 2 - imgHeight / 2, imgWidth, imgHeight);
    }
}





function generateChord() {
    // THIS IS FOR THE CHORD GENERATOR
    let canvas = document.getElementById("chordCanvas");
    let ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before drawing

    // Draw horizontal lines (strings)
    const stringPositions = [10, 30, 50, 70, 90, 110];
    stringPositions.forEach(y => {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(300, y);
        ctx.stroke();
    });

    // Draw vertical lines (frets)
    const fretPositions = [100, 200];
    fretPositions.forEach(x => {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 140);
        ctx.stroke();
    });

    // Generate a random number to see which chord to play
    const randomNumber = Math.floor(Math.random() * 14) + 1;
    //const randomNumber = 14;
    document.getElementById("appear").value = getChordName(randomNumber);
    drawChord(ctx, randomNumber);
}

function getChordName(number) {
    const chordNames = ["A chord", "B chord", "C chord", "D chord", "E chord", "F chord", "G chord", "Am chord", "Bm chord", "Cm chord", "Dm chord", "Em chord", "Fm chord", "Gm chord"];
    return chordNames[number - 1];
}

function drawChord(ctx, number) {
    // MAKING THE CHORD SHOW UP
    const chordPositions = {
        1: [[150, 30], [150, 50], [150, 70]],
        2: [[50, 10], [50, 90], [250, 30], [250, 50], [250, 70]],
        3: [[50, 30], [150, 70], [250, 90]],
        4: [[150, 10], [150, 50], [250, 30]],
        5: [[50, 50], [150, 70], [150, 90]],
        6: [[50, 10], [50, 30], [150, 50], [250, 70]],
        7: [[150, 90], [250, 10], [250, 110]],
        8: [[50, 30], [150, 50], [150, 70]],
        9: [[50, 10], [50, 90], [150, 30], [250, 50], [250, 70]],
        10: [[50, 10], [50, 90], [150, 30], [250, 50], [250, 70]],
        11: [[50, 10], [150, 50], [250, 30]],
        12: [[150, 70], [150, 90]],
        13: [[50, 10], [50, 30], [150, 90], [150, 70], [50, 50], [50, 110]],
        14: [[50, 10], [50, 30], [150, 90], [150, 70], [50, 50], [50, 110]],
    };

    ctx.fillStyle = "green";
    chordPositions[number].forEach(pos => {
        ctx.beginPath();
        ctx.arc(pos[0], pos[1], 10, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    });
}

let wait = false;
var E1 = new Audio('../sounds/LowE.mp3');
var A = new Audio('../sounds/A.mp3');
var D = new Audio('../sounds/D.mp3');
var G = new Audio('../sounds/G.mp3');
var B = new Audio('../sounds/B.mp3');
var E2 = new Audio('../sounds/HighE.mp3');



function handleGuitarTuningClick(x, y) {
    // MAKING THE LIGHTING UP AND SOUND FOR THE TUNING
    console.log('Guitar Tuning clicked at:', x + '%', y + '%');

    // Define areas
    let left = false; let right = false;
    if(x >= 0 && x < 40)
        left = true;
    else if(x > 60 && x <= 100)  
        right = true;

    let top = false; let middle = false; let bottom = false;
    if(y > 25 && y < 38)
        top = true;
    else if(y > 38 && y < 56)  
        middle = true;
    else if(y > 56 && y < 70)  
        bottom = true;

    // 20 40 60 80

    if (left && bottom && !wait) {
        // E
    
        let canvas = document.getElementById("overlayCanvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(65, 176, 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#24e259';
        ctx.fill();
        ctx.stroke();
    
        wait = true;
        E1.play();
        // Clear the canvas after 2 seconds (2000 milliseconds)
        setTimeout(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            wait = false;
        }, 2450);
    }
     else if (left && middle && !wait) {
        // A
        
        let canvas = document.getElementById("overlayCanvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(70, 106, 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#24e259';
        ctx.fill();
        ctx.stroke();
    
        wait = true;
        A.play();
        // Clear the canvas after 2 seconds (2000 milliseconds)
        setTimeout(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            wait = false;
        }, 2450);
    }else if (left && top && !wait) {
        // D
        
        let canvas = document.getElementById("overlayCanvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(65, 36, 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#24e259';
        ctx.fill();
        ctx.stroke();
    
        wait = true;
        D.play();
        // Clear the canvas after 2 seconds (2000 milliseconds)
        setTimeout(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            wait = false;
        }, 2450);
    }else if (right && top && !wait) {
        // G
        
        let canvas = document.getElementById("overlayCanvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(165, 36, 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#24e259';
        ctx.fill();
        ctx.stroke();
    
        wait = true;
        G.play();
        // Clear the canvas after 2 seconds (2000 milliseconds)
        setTimeout(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            wait = false;
        }, 2450);
    } else if (right && middle && !wait) {
        // B
        
        let canvas = document.getElementById("overlayCanvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(160, 106, 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#24e259';
        ctx.fill();
        ctx.stroke();
    
        wait = true;
        B.play();
        // Clear the canvas after 2 seconds (2000 milliseconds)
        setTimeout(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            wait = false;
        }, 2450);
    } else if (right && bottom && !wait) {
        // E
        
        let canvas = document.getElementById("overlayCanvas");
        let ctx = canvas.getContext("2d");
        ctx.beginPath();
        ctx.arc(165, 177, 12, 0, 2 * Math.PI);
        ctx.fillStyle = '#24e259';
        ctx.fill();
        ctx.stroke();
        
        wait = true;
        E2.play();
        // Clear the canvas after 2 seconds (2000 milliseconds)
        setTimeout(function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            wait = false;
        }, 2450);
    }
}
