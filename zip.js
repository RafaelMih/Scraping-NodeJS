var http = require('http'),
    fs = require('fs'),
    request = require('request'),
    AdmZip = require('adm-zip'),
    path = require('path');
     // For saving NSE Equity bhavcopy


var ufs = ["ac", "am", "al"];
var partidos = ["dem"];
var csvFileName = "";
var pathZip = "";

for (var i = 0; i < ufs.length; i++) { 

    pathZip = './data/'+ufs[i]+'.zip';
    var out = fs.createWriteStream(pathZip);

    var req = request(
        {
            method: 'GET',
            uri: 'http://agencia.tse.jus.br/estatistica/sead/eleitorado/filiados/uf/filiados_dem_'+ ufs[i] +'.zip',
            headers: { "User-Agent": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11",
                "Referer": "http://www.nseindia.com/products/content/all_daily_reports.htm",
                "Accept-Encoding": "gzip,deflate,sdch",
                "encoding": "null",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                "Cookie": "cookie"
            }
        });

    req.pipe(out); 
}

console.log(pathZip);

var zip = new AdmZip(pathZip); 
       
console.log(pathZip);
   
zip.extractAllTo("./", true);
          