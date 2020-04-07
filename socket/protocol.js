import logger from "../util/logger.js";
import string from "../util/string.js";
import time from "../util/time.js";

import controller from "../controller/controller.js";

import socketio from "./socketio.js";

const protocol = {
	rcv_000_000 : function(message) {
		let ping = time.now() - socketio.pingTime;

		logger.info("ping = " + ping);
	},

	rcv_001_001 : function(message) {
		controller.onMessage(message);
	}
};
export default protocol;