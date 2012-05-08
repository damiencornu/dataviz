//Global vars
var fps = 25;
	drawings=[],
	shapesCount=0,
	shapes=[],
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


// DOM Ready
$(function() {
	$.ajax({
		url		: 'interactions.xml',
		dataType	: 'xml'
	}).done(function(xml){
		xml = xml.childNodes[0].getElementsByTagName('figure')
		var length = xml.length;
		for(var i=0; i<length; i++){
			a=xml[i];
			shapes.push(new Shape(a.getAttribute('x'),
										 a.getAttribute('y'),
										 a.getAttribute('shape'),
										 a.getAttribute('sizeInit'),
										 a.getAttribute('sizeFinal'),
										 a.getAttribute('duration'),
										 a.getAttribute('color')
							));
			shapesCount++;
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
	//drawFic();
}

function draw(){
	for (var i=0; i < drawings.length; i++) {
		a=drawings[i];
		size = a.currentTime*a.sizeFinal/a.duration;
		
		context.fillStyle = '#'+a.color;
	    context.beginPath();
		if(a.shape == "rect"){
			x = a.x - size/2;
			y = a.y - size/2;
			context.rect( x, y, size, size );
		} else if(a.shape == "circle"){
			context.arc( a.x, a.y, size, 0, Math.PI * 2, true );
		}
	    context.closePath();
	    context.fill();
		if (drawings[i].incTime() <= 0 ) {
			drawings.splice(i,1);
		};
		console.log(drawings);
	};
}
function drawFic(){
	context.fillStyle = 'rgb(245,255,255)';
    context.fillRect( 0, 0, 480, 480 );
	context.fillStyle = '#9F56B7';
    context.beginPath();
	context.arc( 50, 50, 2, 0, Math.PI * 2, true );
    context.closePath();
    context.fill();
}

