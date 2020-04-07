import logger from "../../util/logger.js";
import string from "../../util/string.js";
import time from "../../util/time.js";

function schedule(holder, obj, params, event, after) {
	this.holder = holder;
	this.obj = obj;
	this.params = params;
	this.event = event;
	this.executeTime = time.now() + after;

	this.checktimeup = function() {
		return time.now() > this.executeTime;
	};

	this.execute = function() {
		this.event(obj, params);
		this.executeTime = time.now() + after;
	};

	this.shutdown = function() {
		this.holder.remove(this);
	};
}
export default schedule;