const axios = require('axios');


exports.getLiveCricketScores = async (req, res) => {
    try {
        const response = await axios.get('https://www.cricbuzz.com/match-api/2/commentary.json', {
            headers: {
                'User-Agent': 'Cricks', // You can replace this with your User-Agent
            },
        });

        // Log the full API response for debugging
        console.log('Full API Response:', response);

        if (response.status === 200) {
            const liveScores = response.data; // Check the structure of response.data
            console.log('API Response Data:', liveScores);

            // Return the live scores as a JSON response
            res.status(200).json(liveScores);
        } else {
            console.error('Error fetching live cricket scores:', response.statusText);
            res.status(500).json({ error: 'Error fetching live cricket scores' });
        }
    } catch (error) {
        console.error('Error making API request:', error);
        res.status(500).json({ error: 'Error making API request' });
    }
};





