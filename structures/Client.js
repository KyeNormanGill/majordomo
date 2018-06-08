const { Client } = require('discord.js');
const ytdl = require('ytdl-core');

module.exports = class client extends Client {
	constructor(options) {
		super(options);

		this.port = options.port;
		this.queue = [];
	}

	play() {
		// Will need to be not hardcoded omegalul
		const guild = this.guilds.get('309224687077163008');
		if (!this.queue.length) return;

		const stream = ytdl(this.queue[0].URL, { audioonly: true });
		const dispatcher = guild.voiceConnection.play(stream, { passes: 1, volume: 0.25 });

		stream.once('error', err => {
			console.log(err);
		});

		dispatcher.once('end', () => {
			this.queue.shift();
			if (this.queue.length !== 0) {
				setTimeout(() => this.play(), 1000);
			} else {
				guild.me.voiceChannel.leave();
				this.queue = [];
			}
		});
	}
};
