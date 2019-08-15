const SCALE = 4;

var thread;
var mX, mY, pmX, pmY;
var backstitches = [];

var ctrlPressed = false;

function setup() {
  removeElement('p5_loading'); // See pageSetup.js

  cnv = createCanvas(200 * SCALE, 100 * SCALE);
  cnv.parent('canvasHere');

  setupBackground(); // See pageSetup.js

  stroke('red'); // Lines drawn are red by default.
  rectMode(CENTER);
  frameRate(4);
}

// Button presses send coloration string, determines stroke color.
function chooseColor(coloration) {
  thread = color(coloration);
  stroke(thread);
  console.log(thread);
}

function draw() {
  drawLine();
  checkKeys();
}

function drawLine() {
  if (mouseIsPressed) { // If the mouse is NOW pressed:
    mX = mouseX; // Make the X based on the current X.
    mY = mouseY; // Make the Y based on the current Y.

    // If the mouseX/Y position is not centered over a hole, correct it.
    if (mX % (4 * SCALE) != 0) {
      mX = correct(mX);
    }
    if (mY % (4 * SCALE) != 0) {
      mY = correct(mY);
    }

    if (pmX == null) { // If mouse was NOT pressed in previous frame,
      pmX = mX; // Do NOT draw a line yet. Just establish a new set of... 
      pmY = mY; // ...previous values.
    } else { // If mouse WAS held down in previous frame, 
      strokeWeight(ceil(SCALE / 2));
      line(pmX, pmY, mX, mY); // DO draw the line based on corrected points.

      var newStitch = {
          x1: pmX,
          y1: pmY,
          x2: mX,
          y2: mY,
          coloration: thread
        } // Create object
      backstitches.push(newStitch); // Stick object into array for later access.
      //console.log(backstitches); // *** PRINT ***

      pmX = mX; // Update the "previousMouseX" for next frame's drawing.
      pmY = mY; // Update the "previousMouseY" for next frame's drawing.
    }

  } else { // If mouse is not being clicked...make null.
    pmX = null;
  }
}

function correct(mouseCoordinate) {
  var remainder = mouseCoordinate % (4 * SCALE);
  var updatedCoordinate;

  if (remainder > 4 * SCALE / 2) {
    updatedCoordinate = ceil(mouseCoordinate / (4 * SCALE)) * (4 * SCALE);
  } else {
    updatedCoordinate = floor(mouseCoordinate / (4 * SCALE)) * (4 * SCALE);
  }

  return (updatedCoordinate);
}

function checkKeys() {
  document.addEventListener("keydown", function(event) {
    if (event.which === 90 && ctrlPressed == true) {
      console.log("Z was pressed while ctrlPressed was true!");
      undo();
    } else if (event.which === 17) { //
      ctrlPressed = true;
    }
  });

  document.addEventListener("keyup", function(event) {
    if (event.which === 17 && ctrlPressed == true) {
      ctrlPressed = false;
    }
  });
}

function undo() {
  if (backstitches.length != 0) {
    backstitches.pop();
    console.log("Undo");
    //console.log(backstitches);
    
    setupBackground();
    reDraw();
  }
  ctrlPressed = false;
}

function reDraw() {
  for (i = 0; i < backstitches.length; i++) {
    var stitch = backstitches[i];
    stroke(stitch.coloration);
    //strokeWeight(ceil(SCALE / 2)); // Adding this line caused the program to crash.
    line(stitch.x1, stitch.y1, stitch.x2, stitch.y2);
  }
}