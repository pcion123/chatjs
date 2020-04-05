import logger from "../util/logger.js";

const socketio = {
	socket : null,
	host : "ws://localhost:8080/",
	connected : false,

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