const { yt } = require('../config.json');
const YouTube = require('simple-youtube-api');
const youtube = new YouTube(yt);

module.exports = async(req, res) => {
	const voiceChannel = req.client.guilds.get('309224687077163008').me.voiceChannel;
	if (!voiceChannel) return res.status(404).send('I\'m not in a voicechannel');
	console.log(req.query);
	if (!req.query.song) return res.status(404).send('No song specified');

	const baseData = await youtube.searchVideos(req.query.song, 1);
	if (!baseData.length) return res.status(404).send({ error: 'Song not found!' });

	const vidData = await youtube.getVideoByID(baseData[0].id);
	if (!vidData) return res.status(404).send({ error: 'Somethings wrong with youtubes api!' });

	req.client.queue.push({
		name: vidData.title,
		URL: `https://www.youtube.com/watch?v=${vidData.id}`,
		length: formatLength(vidData.duration)
	});

	res.status(200).send({ info: `Queued ${vidData.title}` });
};

function formatLength(obj) {
	if (obj.years || obj.months || obj.weeks || obj.days || obj.hours) throw new Error('No songs above 1 hour');

	return `${obj.minutes}m ${obj.seconds < 10 ? `0${obj.seconds}` : obj.seconds}s`;
}
