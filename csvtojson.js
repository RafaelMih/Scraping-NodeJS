// Node packages for file system
var fs = require('fs');
var path = require('path');


var ufs = ["ac","al","am"];
var partidos = ["dem"];

for (var i = 0; i < ufs.length; i++) { 
    var csvFileName="./data/unzip/aplic/sead/lista_filiados/uf/filiados_dem_"+ ufs[i] +".csv";

    var filePath = path.join(__dirname, csvFileName);
    // Read CSV
    var f = fs.readFileSync(filePath, {encoding: 'utf-8'}, 
        function(err){console.log(err);});

    // Split on row
    f = f.split("\n");

    // Get first row for column headers
    var headers = f.shift().split(";");

    var json = [];    
    f.forEach(function(d){
        // Loop through each row
        tmp = {}
        row = d.split(";")
        for(var i = 0; i < headers.length; i++){            
            tmp[headers[i]] = row[i];
        }
        // Add object to list
        json.push(tmp);
    });

    var outPath = path.join(__dirname, './'+ ufs[i]);
    // Convert object to string, write json to file
    fs.writeFileSync(outPath, JSON.stringify(json), 'utf-8', 
        function(err){console.log(err);});   
}
