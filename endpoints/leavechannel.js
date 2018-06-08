module.exports = (req, res) => {
	const voiceChannel = req.client.guilds.get('309224687077163008').me.voiceChannel;
	if (!voiceChannel) return res.status(404).send({ error: 'I\'m not in a voicechannel' });
	voiceChannel.leave();
	res.status(200).send({ info: `Left ${voiceChannel.name}` });
};
