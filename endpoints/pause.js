module.exports = (req, res) => {
	if (!req.client.queue.length) return;

	const guild = req.client.guilds.get('309224687077163008');

	if (guild.voiceConnection.dispatcher && !guild.voiceConnection.dispatcher.paused) {
		guild.voiceConnection.dispatcher.pause();
	} else {
		res.status(404).send({ error: 'I\'m not playing music!' });
	}

	res.status(200).send({ info: 'Paused music' });
};
