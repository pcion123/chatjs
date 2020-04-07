import logger from "../util/logger.js";
import string from "../util/string.js";

function list() {
	this.container = new Array(10);
	this.scale = 10;
	this.index = -1;

	this.size = function() {
		return this.index + 1;
	};

	this.add = function(obj) {
		while ((this.index + 1) >= this.scale) {
			this.grow();
		}
		this.index = this.index + 1;
		this.container[this.index] = obj;
	};

	this.remove = function(index) {
		if (index < 0) {
			logger.warn("array size is zero");
			return;
		}
		if (index > this.index) {
			logger.warn("array is out of range");
			return;
		}
		let obj = this.container.splice(index, 1);
		this.scale = this.scale - 1;
		this.index = this.index - 1;
		return obj;
	};

	this.remove0 = function(obj) {
		for (let i = 0; i < this.container.length; i++) {
			let element = this.container[i];
			if (element === obj) {
				return this.remove(i);
			}
		}
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
export default list;