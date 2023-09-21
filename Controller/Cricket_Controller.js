// cricketController.js

const cricLive = require('cricket-live-api');

// Define a function to get live cricket scores
exports.getLiveCricketScore = async (req, res) => {
    try {
        const liveScore = await cricLive.getLiveScore(2); // You can change the match ID as needed

        res.status(200).json(liveScore);
    } catch (error) {
        console.error('Error getting live cricket score:', error);
        res.status(500).json({ error: 'Error getting live cricket score' });
    }
};