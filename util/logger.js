import config from "../config.js";

const logger = {
	trace : function(message) {
		console.trace(message);
	},

	debug : function(message) {
		if (config.debug) {
			console.info(message);
		}
	},

	info : function(message) {
		console.info(message);
	},

	warn : function(message) {
		console.warn(message);
	},
	
	error : function(message) {
		console.error(message);
	}
};
export default logger;