// var io = require("socket.io-client");
import $ from 'jquery';
import io from "socket.io-client";


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import css from './index.css';


var socket = io();
$(document).ready(function(){
	console.log('document ready');
	socket.on('test', function(msg){
		console.log("socket.io response received");
	});
	socket.emit('test','data');
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
