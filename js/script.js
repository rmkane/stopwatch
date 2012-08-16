function init() {}
var displayId = "display";
var display= document.createElement("div" );
display.setAttribute("id", displayId);
//display.setAttribute("style","color:green;font-size:2em;");
document.body.appendChild(display);
display.innerHTML = "00:00.000";

var init = false;
var running = false;

function fupdate() {
	var diff = 0;
	if (init != false) diff = (new Date()).getTime() - init.getTime();
	var m = Math.floor(diff / 60000);
	var s = Math.floor(diff / 1000) % 60;
	var ms = diff % 1000;
	document.getElementById("display").innerHTML =
		(m < 10 ? '0' + m : m) + ':' +
		(s < 10 ? '0' + s : s) + '.' +
		(ms < 10 ? '00' + ms : (ms < 100 ? '0' + ms : ms));
}

function fstart() {
	if (running) return;
	if (init === false) freset();
	running = true;
	fclick();
}

function fstop() {
	running  = false;
}

function freset() {
	init = new Date();
	fupdate();
}

function fclick() {
	fupdate();
	if (running) setTimeout('fclick()', 1);
}