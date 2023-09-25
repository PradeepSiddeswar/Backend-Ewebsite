const axios = require('axios');

async function fetchData() {
  const options = {
    method: 'GET',
    url: 'https://cricbuzz-cricket.p.rapidapi.com/matches/v1/recent',
    headers: {
      'X-RapidAPI-Key': 'd8686e86cdmshee0bb392831c2ffp169d40jsn635e8060975c',
      'X-RapidAPI-Host': 'cricbuzz-cricket.p.rapidapi.com'
    }
  };
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

// Call the async function to start fetching data
fetchData();



  


