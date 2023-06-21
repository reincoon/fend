/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'a017c';

/===================================================/


// Create a new date instance dynamically with JS
const d = new Date();
const newDate = d.getMonth() + 1 +'.'+ d.getDate()+'.'+ d.getFullYear();

document.querySelector('#generate').addEventListener('click', generateWeather);


/** Function to generate URL*/
function buildURL(){
    
  let zipCode = document.querySelector('#zip').value;
  let zip = '?zip='+zipCode+',us&appid=';
  return baseURL+zip+apiKey;
  
}
/* Function called by event listener */
async function generateWeather(e) {
  const generatedURL = buildURL();
  let feelings = document.querySelector('#feelings').value;
  await getWeatherData(generatedURL)
  .then(function(data){
    const postData = {
      name: data.name, 
      temp: data.main.temp, 
      date: newDate, 
      content: feelings
    };
    postWeatherData('/addData', postData)
  })
  .then(function(){
    retrieveData();
  })
}

/* Function to GET weather data from API */
const getWeatherData = async(url) => {
  const response = await fetch(url);

  try {
    const data = await response.json();
    return data;
  } catch(error) {
    console.log('Error:', error);
  }

}

/* Function to POST weather data */
const postWeatherData = async(url, data = {}) => {
  const response = await fetch(`http://localhost:8000${url}`, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  try {
    const newData = response.json();
    console.log(newData);
    return newData;
  } catch(error) {
    console.log('Error:', error);
  }

}

/* Function to update the UI dynamically */
const retrieveData = async() => {
  //const req = await fetch('/all');
  const request = await fetch('http://localhost:8000/all');
  try{
    const allData = await request.json();
    console.log(allData);
    //const latestEntry = allData[allData.length - 1];
    document.getElementById("date").innerHTML = `Date: ${allData.date}`;
    document.getElementById("temp").innerHTML = `Temperature: ${allData.temp}°C`;
    document.getElementById("content").innerHTML = `Feeling: ${allData.content}`;
  } catch(error) {
    console.log('Error:', error);
  }
}

/* Function to GET project data */
const getProjectData = async (url) => {
  const response = await fetch(`http://localhost:8000${url}`)
  try{
      const data = await response.json();
      return data
  }catch(error){
      console.log('error ', error)
  }
}