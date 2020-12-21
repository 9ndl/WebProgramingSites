// CSC 337 hello world server

const express = require("express");
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
	res.header("Access-Control-Allow-Origin", "*");
    res.send('{"city": "London", "country": "CA", "weather": [{"temperature": 80.35,"icon": "02d"}, {"temperature": 83.59,"icon": "01d"}, {"temperature": 72.14,"icon": "10d"}, {"temperature": 56.50,"icon": "01d"}, {"temperature": 61.84,"icon": "01d"}, {"temperature": 67.93,"icon": "01d"}, {"temperature": 76.06,"icon": "01d"}]}');
    //res.send(404);
})

app.listen(3000);
