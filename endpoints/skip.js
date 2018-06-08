module.exports = (req, res) => {
	const guild = req.client.guilds.get('309224687077163008');
	const voiceChannel = guild.me.voiceChannel;
	if (!voiceChannel) return;

	if (guild.voiceConnection.dispatcher) {
		guild.voiceConnection.dispatcher.end();
	} else {
		return res.status(404).send({ error: 'No songs are playing.' });
	}

	res.status(200).send({ info: 'Skipped song!' });
};
