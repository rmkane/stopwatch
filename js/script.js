// Add clock div
var displayId = "display";
var display= document.createElement("div" );
display.setAttribute("id", displayId);
document.body.appendChild(display);
display.innerHTML = "00:00.000";

var running = 0;
var flag_stop = 0;
var stop_time = 0;
var current_time;

function start_stop() {
	var btn = document.getElementById('start_stop_btn');
	var start_date = new Date();
	var start_time = start_date.getTime();
	if(running == 0) {
		btn.value = 'Stop';
		running = 1;
		counter(start_time);
	}
	else {
		btn.value = 'Start';
		running = 0;
		flag_stop = 1;
	}
}

function counter(start_time) {
		current_time = new Date();
		var time_diff = current_time.getTime() - start_time;

		if(flag_stop == 1) {
			time_diff += stop_time;
		}
		if (running == 1) {
			display.innerHTML = format_time(time_diff);
			refresh = setTimeout('counter(' + start_time + ');',1);

		} else {
			window.clearTimeout(refresh);
			stop_time = time_diff;
		}
}

function format_time(time) {
	var m = Math.floor(time / 60000);
	var s = Math.floor(time / 1000) % 60;
	var ms = time % 1000;
	return	(m < 10 ? '0' + m : m) + ':' +
							(s < 10 ? '0' + s : s) + '.' +
							(ms < 10 ? '00' + ms : (ms < 100 ? '0' + ms : ms));
}

function reset_time() {
	flag_stop = 0;
	stop_time = 0;
	window.clearTimeout(refresh);
	if(running == 1) {
		var reset_date = new Date();
		var reset_time = reset_date.getTime();
		counter(reset_time);
	} else {
		display.innerHTML = "00:00.000";
	}
}

function split_time() {
	// Split time - view-source:http://www.timpelen.com/extra/sidebars/stopwatch/stopwatch.htm
	if (running == 1) {

	}
}