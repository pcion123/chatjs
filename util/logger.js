const logger = {
	trace : function(message) {
		console.trace(message);
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