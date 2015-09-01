var soap = require("soap");
var parser = require('xml2json');
var should = require('should');
var util = require('util');


var url = "http://www.webservicex.com/globalweather.asmx?WSDL";
var args = {CityName: "Hamburg", CountryName: "Germany"};


describe("a test", function(){
	var soapResult = null;
	var error = null;

	before(function(done){
		this.timeout(5000);
		soap.createClient(url, function(err, client) {
			client.GetWeather(args, function(err, result) {
				console.log("XML", result.GetWeatherResult);
				soapResult = parser.toJson(result.GetWeatherResult);
				error = err;
				done();
			});
		});
	});

	it('should parse XML data', function(){
		should.exist(soapResult);
		soapResult = JSON.parse(soapResult);
	});

	it('should successful return result data', function(){
		soapResult.CurrentWeather.Status.should.equal("Success");
	});

});

