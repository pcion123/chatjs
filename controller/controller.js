import logger from "../util/logger.js";
import string from "../util/string.js";
import socketio from "../socket/socketio.js";

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
		logger.info(string.format("onLogin -> {0} {1}", account, password));
	},
	onLogout : function() {
		logger.info("onLogout");
	},
	onSendMessage : function(socket, message) {
		if (socket != null) {
			socket.send(1, 1, message);
		}
		// logger.info(string.format("onSend -> {0}", message));
	},
	onClear : function(maintext) {
		if (maintext != null) {
			maintext.value = "";
		}
	},
	onTest : function(maintext) {
		// maintext.value = maintext.value + '\n' + "onTest";
		var header = socketio.genHeader(1,1);
		logger.info(header);
	}
};
export default controller;