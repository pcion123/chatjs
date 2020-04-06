import logger from "./logger.js";

const string = {
	format : function() {
	    var s = arguments[0];
	    if (s == null) {
	    	return "";
	    } else {
	    	for (var i = 0; i < arguments.length - 1; i++) {
	    		var reg = this.getStringFormatPlaceHolderRegEx(i);
	    		s = s.replace(reg, (arguments[i + 1] == null ? "" : arguments[i + 1]));
	    	}
	    	return this.cleanStringFormatResult(s);
	    }
	},

	getStringFormatPlaceHolderRegEx : function(placeHolderIndex) {
		return new RegExp('({)?\\{' + placeHolderIndex + '\\}(?!})', 'gm')
	},

	cleanStringFormatResult : function(str) {
		if (str == null) {
			return "";
		} else {
			return str.replace(this.getStringFormatPlaceHolderRegEx("\\d+"), "");
		}
	}
};
export default string;