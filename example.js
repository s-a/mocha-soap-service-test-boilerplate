var soap = require("soap");

var parser = require('xml2json');



var url = "http://www.webservicex.com/globalweather.asmx?WSDL";
var args = {CityName: "Hamburg", CountryName: "Germany"};
soap.createClient(url, function(err, client) {
	client.GetWeather(args, function(err, result) {
		var json = parser.toJson(result.GetWeatherResult.toString()); //returns a string containing the JSON structure by default
		console.log(json);
	});
});