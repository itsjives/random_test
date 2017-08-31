
var clientColor = 'rbg(0,0,0)';
buildPalette();

$(document).ready(function() {
console.log('here')
$('.green').css('background-color', '#39CA74');
$('.blue').css('background-color', '#3B99D8');
$('.purple').css('background-color', '#9A5CB4');
$('.yellow').css('background-color', '#F0C231');
$('.black').css('background-color', 'black');
$('.white').css('background-color', 'white');
$('.red').css('background-color', '#E54E42');

	var currentColor;

	$('.color').click(function(){
		currentColor = $(this).css('background-color')
		$('.current').css('background-color', currentColor)

	});



	$('#reset').click(function(data){
		var canvas = $('#myCanvas')[0];
	 	canvas.width = canvas.width;

	})

});

function buildPalette(){
	var colors = ['#39CA74',
	'#3B99D8',
	'#9A5CB4',
	'#F0C231',
	'black',
	'white',
	'#E54E42']
	for (var i = 0; i < colors.length; i++){
		var aColor = document.createElement('div');
		aColor.className = 'color';
		aColor.style.backgroundColor = colors[i]
		palette.appendChild(aColor);
	}

}

function selectColor(e){
	if(e.target.className == 'color'){
		clientColor = e.target.style.backgroundColor;
	}
}

window.addEventListener('mousedown', selectColor);

document.addEventListener("DOMContentLoaded", function() {
	var mouse = {
		click: false,
		move: false,
		pos: {x:0, y:0},
		pos_prev: false
	}

	var canvas = document.getElementById("myCanvas");
	canvas.width = window.innerWidth/2.5;
	canvas.height = window.innerHeight;
	var context = canvas.getContext("2d");


	canvas.onmousedown = function(e) {
		getMouse(e);

		mouse.click = true;
	};

	canvas.onmouseup = function(e) {
		getMouse(e);
		mouse.click = false;
	};


	canvas.onmousemove = function(e) {
		getMouse(e);
		mouse.move = true;
	};

	function getMouse(e) {
	    mouse.pos.x = e.clientX;
	    mouse.pos.y = e.clientY;
	}



function drawLine(data){

		var line = data.line;
		context.beginPath();
		context.lineWidth = 2;
		context.strokeStyle = line[2];
		context.moveTo(line[0].x - 150, line[0].y );
		context.lineTo(line[1].x - 150, line[1].y );
		context.stroke();
	};

	function draw() {
		if (mouse.click && mouse.move && mouse.pos_prev) {
			drawLine({ line: [mouse.pos, mouse.pos_prev, clientColor] });
			mouse.move = false;
		}
		mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
		setTimeout(draw, 5);
	}
	draw();

});
