var socket = io.connect();

var clientColor = 'rbg(0,0,0)';
buildPalette();

$(document).ready(function() {

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


	var current_user;

	var new_user = function() {
		var name = $('#nickname').val();
		socket.emit("page_load", {user: name});

	}

	new_user();

	$('#reset').click(function(data){
		var canvas = $('#myCanvas')[0];
	 	canvas.width = canvas.width;
		socket.emit("clear", {clear: data.clear})
	})

	socket.on("existing_user", function(data){
		$("#error").html(data.error)
		new_user();
	})

	socket.on("load_messages", function(data){
		$("#error").html("") //resetting the error message
		current_user = data.current_user;
		var messages = data.messages;
		var messages_thread = "";

		for (var i = 0; i < messages.length; i++){
			messages_thread += "<p>" + messages[i].name + ": " + messages[i].message + "</p>";
		}

		$(".message_board").append(messages_thread);
	})

	$("#new_message").submit(function(){
		socket.emit("new_message", {message: $("#message").val(), user: current_user});
		$("#message").val("");
		return false;
	})

	socket.on("post_new_message", function(data) {
		$(".message_board").append("<p>" + data.user + ": " + data.new_message + "</p>");
	})
})

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



	socket.on("draw_line", function(data) {

		var line = data.line;
		context.beginPath();
		context.lineWidth = 2;
		context.strokeStyle = line[2];
		context.moveTo(line[0].x - 150, line[0].y );
		context.lineTo(line[1].x - 150, line[1].y );
		context.stroke();
	});

	function draw() {
		if (mouse.click && mouse.move && mouse.pos_prev) {
			socket.emit("draw_line", { line: [mouse.pos, mouse.pos_prev, clientColor] });
			mouse.move = false;
		}
		mouse.pos_prev = {x: mouse.pos.x, y: mouse.pos.y};
		setTimeout(draw, 5);
	}
	draw();

});
