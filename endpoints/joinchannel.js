module.exports = (req, res) => {
	const voiceChannel = req.client.guilds.get('309224687077163008').members.get('189696688657530880').voiceChannel;
	if (!voiceChannel) return res.status(404).send({ error: 'You\'re not in a voicechannel' });
	voiceChannel.join();
	res.status(200).send({ info: `Joined ${voiceChannel.name}` });
};
