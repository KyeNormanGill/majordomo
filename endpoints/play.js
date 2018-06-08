module.exports = (req, res) => {
	if (!req.client.queue.length) return;

	const guild = req.client.guilds.get('309224687077163008');

	if (guild.voiceConnection.dispatcher && guild.voiceConnection.dispatcher.paused) {
		guild.voiceConnection.dispatcher.resume();
	} else if (!guild.voiceConnection.dispatcher) {
		req.client.play();
	}

	res.status(200).send({ info: 'Playing song!' });
};
