const protocolId = {
	SYSTEM : { code : 0, name : "system" }, 
	ACCOUNT : { code : 1, name : "account" },
	CHAT : { code : 2, name : "chat" },

	equal : function(code, id) {
		return id != null && id.code == code;
	},

	getByCode : function(code) {
		if (code == 0) {
			return this.SYSTEM;
		} else if (code == 1) {
			return this.ACCOUNT;
		} else if (code == 2) {
			return this.CHAT;
		} else {
			return null;
		}
	},

	getByName : function(name) {

	}
};
export default protocolId;