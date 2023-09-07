const Video = require("../Model/Video_Model")


exports.uploadVideo = async (req, res) => {
    try {
      const {  videoUrl } = req.body;
  
      // Create a new video document with the provided data
      const video = new Video({  videoUrl });
  
      // Save the video to the database
      await video.save();
  
      res.status(201).json(video);
    } catch (error) {
      console.error(error); // Log the error for debugging
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  exports.getAllVideos = async (req, res) => {
    try {
      const videos = await Video.find();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };