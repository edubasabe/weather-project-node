const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html"); 
});

app.post("/", (req, res) => {
  const location = req.body.cityName;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=d3c7251832665368660ea69fb8550fff`;
  
  https.get(url, (response) => {
    console.log("[response]:", response.statusCode);
  
    response.on("data", (data) => {
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const { description: desc, icon } = weatherData.weather[0];
  
      res.send(`
      <img src="http://openweathermap.org/img/wn/${icon}@2x.png" />
      <p>The weather is currently <b>${desc}</b></p>
      <h1>The temperature in ${location} is ${temp} degrees Celsius</h1>`);
    });
  });
});


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


