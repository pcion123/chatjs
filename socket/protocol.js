import logger from "../util/logger.js";
import string from "../util/string.js";

const protocol = {
	processes : [[]],

	bind : function(mainNo, subNo, event) {
		this.processes[mainNo][subNo] = event;
	}
};
export default protocol;