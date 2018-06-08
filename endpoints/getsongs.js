module.exports = (req, res) => {
	res.status(200).send({ info: 'Successfully acquired songs!', songs: req.client.queue });
};
