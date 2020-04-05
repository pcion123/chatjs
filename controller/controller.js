import logger from "../util/logger.js";

const controller = {
	onConnect : function(socket, host) {
		if (socket != null) {
			socket.connect(host);
		}
	},
	onDisconnect : function(socket) {
		if (socket != null) {
			socket.disconnect();
		}
	},
	onLogin : function(account, password) {
		logger.info("onLogin -> " + account + " " + password);
	},
	onLogout : function() {
		logger.info("onLogout");
	},
	onSendMessage : function(message) {
		logger.info("onSend -> " + message);
	},
	onClear : function(maintext) {
		if (maintext != null) {
			maintext.value = "";
		}
	},
	onTest : function(maintext) {
		maintext.value = maintext.value + '\n' + "onTest";
	}
};
export default controller;