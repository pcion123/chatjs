import logger from "../util/logger.js";
import string from "../util/string.js";

function queue() {
	this.container = new Array(10);
	this.scale = 10;
	this.index = -1;

	this.size = function() {
		return this.index + 1;
	};

	this.head = function() {
		if (0 <= this.index) {
			return this.container[0];
		}
	};

	this.tail = function() {
		if (0 <= this.index) {
			return this.container[this.index];
		}
	};

	this.push = function(obj) {
		while ((this.index + 1) >= this.scale) {
			this.grow();
		}
		this.index = this.index + 1;
		this.container[this.index] = obj;
	};

	this.pop = function() {
		if (0 > this.index) {
			logger.warn("array is out of range");
			return;
		}
		let obj = this.container.splice(0, 1);
		this.scale = this.scale - 1;
		this.index = this.index - 1;
		return obj;
	};

	this.removeAll = function() {
		this.index = -1;
	};

	this.grow = function() {
		this.grow0(this.scale * 2 + 1);
	};

	this.grow0 = function(newSize) {
		if (this.scale >= newSize) {
			logger.warn("array new size has error = " + newSize);
			return;
		}
		this.container.length = newSize;
		this.scale = newSize;
		logger.debug("array new size = " + newSize);
	};
}
export default queue;