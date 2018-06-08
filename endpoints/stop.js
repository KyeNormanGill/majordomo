module.exports = (req, res) => {
	const guild = req.client.guilds.get('309224687077163008');
	const voiceChannel = guild.me.voiceChannel;
	if (!voiceChannel) return;

	if (guild.voiceConnection.dispatcher) {
		req.client.queue = [];
		guild.voiceConnection.dispatcher.end('end');
	} else {
		res.status(404).send({ error: 'No song playing' });
	}

	res.status(200).send({ info: 'Stopped song!' });
};
