var socket = io();
$(document).ready(function(){
	console.log('document ready');
	socket.on('test', function(msg){
		console.log("socket.io response received");
	});
	socket.emit('test','data');
});