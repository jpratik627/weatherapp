const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')



app.get('/', function (req, res) {
    res.render('weather', {weather: null, error: null});
  })

app.post('/', function (req, res) {

    var city = req.body.city;   
    var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=*************`;

    request(url, function (err, response, body) {
        if (err) {
            res.render('weather', { weather: null, error: 'Error, please try again' });
        } else {
            let weather = JSON.parse(body)
            if (weather.main == undefined) {
                res.render('weather', { weather: null,weatherDes:null, error: 'Error, please try again' });
            } else {
                var temp = (weather.main.temp - 32) * (5/9);
                var dec = (weather.weather[0].description);
                var linebreak = '\n';
                let hCity=`City:${weather.name}`;
                let hTemp=`Temperature:${temp.toFixed(2)}\xB0`;
                let hdes=`Condition:${dec}`
                let weatherText =hCity;
                var icon_id = `${weather.weather[0].icon}`;
                let icon = `https://openweathermap.org/img/w/${icon_id}.png`;
                res.render('weather', { weather: weatherText,weatherTemp:hTemp,weatherDes:hdes,hicon:`https://openweathermap.org/img/w/${icon_id}.png`, error: null });
        
            }
        }
    });
})
const port = process.env.PORT || '5000';
app.listen(port);


