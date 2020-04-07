import logger from "../../util/logger.js";
import string from "../../util/string.js";
import config from "../../config.js";

import list from "../list.js";

import task from "./task.js";
import schedule from "./schedule.js";

const asyncholder = {
	taskQ : new list(),

	size : function() {
		return taskQ.size();
	},

	runTask : function(obj, params, event, after) {
		let async = new task(this, obj, params, event, after);
		this.add(async);
		return async;
	},

	runSchedule : function(obj, params, event, after) {
		let async = new schedule(this, obj, params, event, after);
		this.add(async);
		return async;
	},

	add : function(async) {
		this.taskQ.add(async);
	},

	remove : function(async) {
		this.taskQ.remove0(async);
	},

	update : function() {
		if (this.taskQ.size() > 0) {
			// logger.info(this.taskQ);
			this.taskQ.container.forEach(element => { 
				if (element.checktimeup()) { 
					element.execute();
				} 
			});
			// logger.info(this.taskQ);
		}
	}
};
export default asyncholder;