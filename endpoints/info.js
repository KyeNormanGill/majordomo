module.exports = (req, res) => {
	res.status(200).send({
		username: req.client.user.username,
		tag: req.client.user.tag,
		avatar: req.client.user.avatarURL({ size: 256 }),
		info: 'Successfully acquired info!'
	});
};
