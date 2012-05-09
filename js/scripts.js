//Global vars
var fps = 25,
	drawings=[],
	shapes=[],
	interactions=[],
	canvas="",
	context="";

// Object declaration
function Shape(x, y, shape, sizeInit, sizeFinal, duration, color) {
	this.x = parseInt(x);
	this.y = parseInt(y);
	this.shape = shape;
	this.sizeInit = parseInt(sizeInit);
	this.sizeFinal = parseInt(sizeFinal);
	this.duration = parseInt(duration);
	this.color = color;
	this.currentTime = 0;
	this.drawqueue = function(){
		this.currentTime = 0;
		drawings.push(this);
	}
	this.incTime = function(){
		this.currentTime = this.currentTime + 1000/fps;
		return this.duration - this.currentTime;
	}
}

function Interaction (playMode) {
	this.playMode = playMode;
	this.shapeLength = 0;
	this.shapeStillToPlay = 0;
	this.shapes = [];
	this.addShape = function(shape){
		this.shapes.push(shape);
	}
	this.play = function(){
		console.log("play : ");
		switch(this.playMode){
			case 'simultaneous':
				for (var i=0; i < this.shapes.length; i++) {
					this.shapes[i].drawqueue();
				};
			break;
			case 'chain':
				this.playOne(0);
			break;
			default:
				console.log('Le playMode n\'est pas correct');
			break;
		}
	}
	this.playOne = function(id){
	}
}

// DOM Ready
$(function() {
	$.ajax({
		url		: 'interactions.xml',
		dataType	: 'xml'
	}).done(function(xml){
		xml = xml.getElementsByTagName('interaction');
		var length = xml.length;
		for(var i=0; i<length; i++){
			a=xml[i].getElementsByTagName('figure');
			var interaction = new Interaction(xml[i].getAttribute('playMode'));
			for(var j=0; j<a.length; j++){
				b = a[j];
				interaction.addShape(new Shape(b.getAttribute('x'),
									  b.getAttribute('y'),
									  b.getAttribute('shape'),
									  b.getAttribute('sizeInit'),
									  b.getAttribute('sizeFinal'),
									  b.getAttribute('duration'),
									  b.getAttribute('color')
							));
			}
			interactions.push(interaction);
		}
	});
	canvas = document.getElementById('dataviz');
	context = canvas.getContext('2d');
	animate();
});


// functions
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000/fps);
          };
})();

function animate() {
	requestAnimFrame( animate );
	draw();
}

function draw(){
	for (var i=0; i < drawings.length; i++) {
		a=drawings[i];
		context.fillStyle = '#'+a.color;
	    context.beginPath();
		if(a.shape == "rect"){
			size = a.currentTime*a.sizeFinal/a.duration;
			x = a.x - size/2;
			y = a.y - size/2;
			context.rect( x, y, size, size );
		} else if(a.shape == "circle"){
			console.log("(a.currentTime / a.duration) : ");
			console.log((a.currentTime / a.duration));
			console.log("Math.PI * (a.currentTime / a.duration) : ");
			console.log(Math.PI * (a.currentTime / a.duration));
			context.moveTo(a.x,a.y); // met le point d'ancrage du dessin au milieu du cercle
			context.arc(a.x,a.y,a.sizeFinal,0,Math.PI * 2 * (a.currentTime / a.duration),false);   // Mouth (clockwise)  
			// size = a.sizeFinal;
			// context.arc( a.x, a.y, size, Math.PI/2, Math.PI, false );
		}
	    context.closePath();
	    context.fill();
		if (drawings[i].incTime() < 0 ) {
			drawings.splice(i,1);
		};
	};
}