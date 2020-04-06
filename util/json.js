import logger from "../util/logger.js";
import string from "../util/string.js";

const json = {
	strToObj : function(str) {
		return JSON.parse(str);
	},
	objToStr : function(obj) {
		return JSON.stringify(obj);
	}
};
export default json;