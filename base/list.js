import logger from "../util/logger.js";
import string from "../util/string.js";

function list() {
	this.container = new Array();

	this.add = function(value) {
		return this.container + value;
	};
	this.remove = function(index) {

	};
	this.grow = function() {

	};
	this.grow0 = function(count) {

	};
}
export default list;