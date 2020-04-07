import logger from "./util/logger.js";
import string from "./util/string.js";
import time from "./util/time.js";

import controller from "./controller/controller.js";

import socketio from "./socket/socketio.js";

import asyncholder from "./base/task/asyncholder.js";

(function() {
	init();

	function init() {
		setInterval(update, 200);

		socketio.init();
		controller.init();
	}

	function update() {
		// logger.info(time.toDateString());
		socketio.update();
		asyncholder.update();
	}
}());