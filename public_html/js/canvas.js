/* global $ */
/* global createjs */
/* global location */
/* global localStorage */

var drawingColor = "#000000";
var strokeSize = 10;

function tallennaHahmo() {
  var hahmo = document.getElementById("pelihahmo");
  localStorage.setItem('pelihahmonKuva', hahmo.toDataURL("image/png"));
  $("html, body").animate({ scrollTop: ($('#valitsepeli').offset().top - 20) }, 1500);
  }

function tyhjennaHahmo() {
    localStorage.removeItem('pelihahmonKuva');
    stage.clear();
    location.reload();
}

function cBlack() {
    $( "#black" ).addClass( "currentTool" );
    $( "#white" ).removeClass( "currentTool" );
    $( "#red" ).removeClass( "currentTool" );
    $( "#green" ).removeClass( "currentTool" );
    $( "#blue" ).removeClass( "currentTool" );
    $( "#eraser" ).removeClass( "currentTool" );
    $( "#brushDot" ).attr('src','img/dot.png');
    drawingColor = "#000000";
}

function cRed() {
    $( "#red" ).addClass( "currentTool" );
    $( "#white" ).removeClass( "currentTool" );
    $( "#black" ).removeClass( "currentTool" );
    $( "#green" ).removeClass( "currentTool" );
    $( "#blue" ).removeClass( "currentTool" );
    $( "#eraser" ).removeClass( "currentTool" );
    $( "#brushDot" ).attr('src','img/dotR.png');
    drawingColor = "#FF0000";
}

function cGreen() {
    $( "#green" ).addClass( "currentTool" );
    $( "#white" ).removeClass( "currentTool" );
    $( "#red" ).removeClass( "currentTool" );
    $( "#black" ).removeClass( "currentTool" );
    $( "#blue" ).removeClass( "currentTool" );
    $( "#eraser" ).removeClass( "currentTool" );
    $( "#brushDot" ).attr('src','img/dotG.png');
    drawingColor = "#00FF00";
}

function cBlue() {
    $( "#blue" ).addClass( "currentTool" );
    $( "#white" ).removeClass( "currentTool" );
    $( "#red" ).removeClass( "currentTool" );
    $( "#green" ).removeClass( "currentTool" );
    $( "#black" ).removeClass( "currentTool" );
    $( "#eraser" ).removeClass( "currentTool" );
    $( "#brushDot" ).attr('src','img/dotB.png');
    drawingColor = "#0000FF";
}

function strokeBig() {
  strokeSize = Math.round( 1.2 * strokeSize );
  $('#brushDot').css('transform', 'scale(' + strokeSize / 10 + ')');
}

function strokeSmall() {
  strokeSize = Math.round( 0.8 * strokeSize );
  $('#brushDot').css('transform', 'scale(' + strokeSize / 10 + ')');
}

var canvas, stage;
var drawingCanvas;
var oldPt;
var oldMidPt;
var color;
var stroke;
var index;
var backgroundimageStatus;

function init() {
  canvas = document.getElementById("pelihahmo");
  index = 0;
  
  if (localStorage.getItem("pelihahmonKuva")) {
    backgroundimageStatus = true;
  } else {
    backgroundimageStatus = false;
  }

  //check to see if we are running in a browser with touch support
  stage = new createjs.Stage(canvas);
  stage.autoClear = false;
  stage.enableDOMEvents(true);

  createjs.Touch.enable(stage);
  createjs.Ticker.setFPS(24);

  drawingCanvas = new createjs.Shape();

  stage.addEventListener("stagemousedown", handleMouseDown);
  stage.addEventListener("stagemouseup", handleMouseUp);

  stage.addChild(drawingCanvas);
  stage.update();
}

function handleMouseDown(event) {
  color = drawingColor;
  stroke = strokeSize;
  oldPt = new createjs.Point(stage.mouseX, stage.mouseY);
  oldMidPt = oldPt;
  stage.addEventListener("stagemousemove" , handleMouseMove);
  if (backgroundimageStatus === true) {
  document.getElementById('pelihahmo').style.backgroundImage = "none";
  backgroundimageStatus = false;
  }
}

function handleMouseMove(event) {
  var midPt = new createjs.Point(oldPt.x + stage.mouseX>>1, oldPt.y+stage.mouseY>>1);

  drawingCanvas.graphics.clear().setStrokeStyle(stroke, 'round', 'round').beginStroke(color).moveTo(midPt.x, midPt.y).curveTo(oldPt.x, oldPt.y, oldMidPt.x, oldMidPt.y);

  oldPt.x = stage.mouseX;
  oldPt.y = stage.mouseY;

  oldMidPt.x = midPt.x;
  oldMidPt.y = midPt.y;

  stage.update();
}

function handleMouseUp(event) {
  stage.removeEventListener("stagemousemove" , handleMouseMove);
}

init();

$(function () {
  $('[data-toggle="popover"]').popover();
})

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});