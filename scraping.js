var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){

url = 'http://www.tse.jus.br/partidos/partidos-politicos/registrados-no-tse';

request(url, function(error, response, html){

    if (!error && response.statusCode == 200) {

	    var $ = cheerio.load(html);

	    var title, release, rating;
	    var json = { title : "", partidos : []};
	
		json.title = $("title").text();

	    $('table.grid tbody tr').each(function(){
		    
		    var children = $(this).children();
		    var credits = parseFloat($(children[3]).text().replace(',', '.')); // We need to replace comma with a dot since parseFloats only supports dots by design
		    var row = {
		    	"ordem" : $(children[0]).text().trim(),
		        "partido" : $(children[1]).text().trim(),
		        "dsPartido": $(children[2]).text().trim(),
		        "deferimento" : $(children[3]).text().trim(),
		        "presidenteNacional" : $(children[4]).text(),
		        "numero" : $(children[5]).text(),		        
		    };
		    
		    json.partidos.push(row);

		    console.log(JSON.stringify(row));
		});
	}

	fs.writeFile('output.json', JSON.stringify(json, null, 4), function(err){

	    console.log('File successfully written! - Check your project directory for the output.json file');

	});

	// Finally, we'll just send out a message to the browser reminding you that this app does not have a UI.
	res.send('Check your console!')

	});
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;