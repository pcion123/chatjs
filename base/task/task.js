import logger from "../../util/logger.js";
import string from "../../util/string.js";
import time from "../../util/time.js";

function task(holder, obj, params, event, after) {
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
		this.holder.remove(this);
	};

	this.shutdown = function() {
		this.holder.remove(this);
	};
}
export default task;