const axios = require('axios');
			
//declare as an asynchronous function 
async function fetchData() {
    //try catch similar to .then and .catch
    try { 
        const response = await axios.get('https://api.example.com/data');
        console.log(response.data);
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}
fetchData()