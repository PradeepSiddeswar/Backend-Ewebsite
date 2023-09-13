const Video = require('../Model/Video_Model');

exports.createVideo = async (req, res) => {
  try {
    const video = new Video(req.body);
    await video.save();
    res.json({ message: 'Video created successfully', data: video });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};

exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json({ message: 'Success', data: { Youtubvideo: videos } });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error });
  }
};


exports.delete = (req, res) => {
  const id = req.params.id
  Video.findByIdAndDelete(id)
      .then(data => {
          if (!data) {
              res.status(400).send(`category not found with ${id}`)
          } else {
              res.send("category deleted successfully")
          }
      })
      .catch(error => {
          res.status(500).send(error)
      })
}