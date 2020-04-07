import config from "../config.js";

const time = {
	now : function() {
		return Date.now();
	},

	between : function(begin, end, now) {
		return begin <= now && now >= end;
	},

	toDateString : function() {
		return this.toDateString0(Date.now());
	},

	toDateString0 : function(timestamp) {
		let d = new Date(timestamp);
		return d.toUTCString();
	}
};
export default time;