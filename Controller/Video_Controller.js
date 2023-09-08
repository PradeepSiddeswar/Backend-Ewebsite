const Video = require("../Model/Video_Model")

exports.createVideo = async (req, res) => {
    try {
      // Create a new video
      const newVideo = new Video({
        Youtubvideo: req.body.Youtubvideo // Assuming you're sending the video URL in the request body
      });
  
      // Save the video to the database
      const savedVideo = await newVideo.save();
  
      // Send a response with the newly created video
      res.status(201).json(savedVideo);
    } catch (error) {
      // Handle any errors
      res.status(500).json({ error: 'Could not create video' });
    }
  };
  
  // Controller function to get all videos
  exports.getAllVideos = async (req, res) => {
    try {
      // Fetch all videos from the database
      const allVideos = await Video.find();
  
      // Send the list of videos as a JSON response
      res.status(200).json(allVideos);
    } catch (error) {
      // Handle any errors
      res.status(500).json({ error: 'Could not retrieve videos' });
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