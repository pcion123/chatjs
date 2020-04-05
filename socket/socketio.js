import logger from "../util/logger.js";

const socketio = {
	socket : null,
	host : "ws://localhost:8080/",
	connected : false,
	serialId : 0,

	connect : function(host) {
		if (!window.WebSocket) {
			window.WebSocket = window.MozWebSocket;
		}
		if (window.WebSocket) {
			logger.info(this.socket);
			logger.info(this.host);
			this.socket = new WebSocket(host);
			this.socket.onmessage = this.onReceive;
			this.socket.onopen = this.onConnect;
			this.socket.onclose = this.onDisconnect;
		} else {
			alert("browser is not support websocket.");
		}
	},

	disconnect : function() {
		if (this.socket != null) {
			this.socket.close();
			this.socket = null;
		}
	},

	update : function() {
		logger.info("socket is update");
	},

	send : function(mainNo, subNo, message) {

	},

	// genSerialId : function() {
	// 	return this.genSerialId0(this.serialId);
	// },

	// genSerialId0 : function(id) {
	// 	this.serialId = id + 1;
	// 	return this.serialId;
	// },

	// genHeader : function(mainNo, subNo) {
	// 	var id = this.genSerialId();
	// 	return genHeader0(mainNo, subNo, id);
	// },

	// genHeader0 : function(mainNo, subNo, serialId) {
	// 	var header = new Object();
	// 	// header.isCompress = false;
	// 	// header.len = 20;
	// 	header.mainNo = mainNo;
	// 	header.subNo = subNo;
	// 	header.serialId = serialId;
	// 	header.sessionId = user.sessionId;
	// 	header.token = user.token;
	// 	header.uid = user.uid;
	// 	return header;
	// },

	onReceive : function(event) {
		logger.info("socket is reccive data -> " + event.data);
	},

	onConnect : function(event) {
		this.connected = true;
		logger.info("socket is connected");
	},

	onDisconnect : function(event) {
		this.connected = false;
		logger.info("socket is disconnected");
	}
};
export default socketio;