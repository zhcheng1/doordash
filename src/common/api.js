import axios from 'axios';

const Base = "http:\/\/localhost:8080";

export const api = {
	getRooms: function() {
		return axios.get(
			Base + '/api/rooms',
		);
	},

	getRoomInfo: function(roomId) {
		return axios.get(
			Base + '/api/rooms/' + roomId,
		);
	},

	getMessages: function(roomId) {
		return axios.get(
			Base + '/api/rooms/' + roomId + '/messages',
		);
	},

	sendMessage: function(roomId, data) {
		return axios.post(
			Base + '/api/rooms/' + roomId + '/messages',
			data
		);
	}
}