// Global variables
var running = 0;
var flag_stop = 0;
var stop_time = 0;
var current_time;
var refresh = 0;
var split_count = 0;

// Set up the stopwatch
function init() {
	
	// Stopwatch object
	var stopwatch = document.createElement("form" );
	stopwatch.setAttribute("id", "stopwatch");

	// Display
	var display= document.createElement("input" );
	display.setAttribute("id", "display");
	display.setAttribute("type", "text");
	display.setAttribute("onFocus", "blur()");
	display.value = "00:00.000";

	// Start/Stop button
	var start_stop_btn = createEle("input", "start_stop_btn", "button", "Start", "start_stop()");

	// Reset time button
	var reset_time_btn = createEle("input", "reset_time_btn", "button", "Reset", "reset_time()");

	// Split time button
	var split_time_btn = createEle("input", "split_time_btn", "button", "Split", "split_time()");

	// Split time results
	var split_time_ara = document.createElement("textarea");
	split_time_ara.setAttribute("id", "split_time_ara");
	split_time_ara.setAttribute("value", "hello");
	split_time_ara.setAttribute("onFocus", "blur()");

	// Add the components to the stopwatch and add to the body
	stopwatch.appendChild(display);
	stopwatch.appendChild(start_stop_btn);
	stopwatch.appendChild(reset_time_btn);
	stopwatch.appendChild(split_time_btn);
	stopwatch.appendChild(split_time_ara);
	document.body.appendChild(stopwatch);
}

// Creates an new element with specified parameters
function createEle(tag, id, type, value, onClick) {
	var btn = document.createElement(tag);
	btn.setAttribute("id", id);
	btn.setAttribute("type", type);
	btn.setAttribute("value", value);
	btn.setAttribute("onClick", onClick);
	return btn;
}

// Start or Stop the stopwatch
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

// Increments the  stopwatch
function counter(start_time) {
		current_time = new Date();
		var time_diff = current_time.getTime() - start_time;

		if(flag_stop == 1) {
			time_diff += stop_time;
		}
		if (running == 1) {
			display.value = format_time(time_diff);
			refresh = setTimeout('counter(' + start_time + ');',1);

		} else {
			window.clearTimeout(refresh);
			stop_time = time_diff;
		}
}

// Format the display time
function format_time(time) {
	var m = Math.floor(time / 60000);
	var s = Math.floor(time / 1000) % 60;
	var ms = time % 1000;
	return	(m < 10 ? '0' + m : m) + ':' +
							(s < 10 ? '0' + s : s) + '.' +
							(ms < 10 ? '00' + ms : (ms < 100 ? '0' + ms : ms));
}

// Reset the time on the display
function reset_time() {
	flag_stop = 0;
	stop_time = 0;
	window.clearTimeout(refresh);
	if(running == 1) {
		var reset_date = new Date();
		var reset_time = reset_date.getTime();
		counter(reset_time);
	} else {
		display.value = "00:00.000";
		split_time_ara.value = "";
		split_count = 0;
	}
}

// Capture a time and add to running list
function split_time() {
	if (running == 1) {
		split_time_ara.value += (++split_count) + ". " + display.value + "\n";
	}
}