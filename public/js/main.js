/* eslint no-undef: "off" */

const app = new Vue({
	el: '#wrapper',
	data: {
		info: {},
		url: '',
		songs: {}
	},
	methods: {
		joinChannel() {
			this.get('joinchannel');
		},
		leaveChannel() {
			this.get('leavechannel');
		},
		play() {
			this.get('play');
		},
		pause() {
			this.get('pause');
		},
		async skip() {
			await this.get('skip');
			await this.getSongs();
		},
		async stop() {
			await this.get('stop');
			await this.getSongs();
		},
		async queueSong() {
			await this.get(`queuesong?song=${this.url}`);
			this.url = '';
			await this.getSongs();
		},
		async getSongs() {
			const data = await this.get('getsongs');
			this.songs = data.songs;
		},
		get(endpoint) {
			return new Promise(async resolve => {
				const { data } = await axios.get(`http://localhost:5739/${endpoint}`);
				console.log(data.error || data.info);
				resolve(data);
			});
		}
	}
});

window.onload = async() => {
	const { data: res } = await axios.get('http://localhost:5739/info');
	app.info = res;
	app.getSongs();
};
