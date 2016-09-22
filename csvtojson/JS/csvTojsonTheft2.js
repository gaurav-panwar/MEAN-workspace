const readline = require('readline');
const fs = require('fs');
var isHead = true;

//Assigning input stream to file
const rl = readline.createInterface({
	input: fs.createReadStream('../Crimes_-_2001_to_present.csv'),
});

//Declaring variables
var cnt = 0;
var lineHeader = [];
var ln = [];
var sep = "";
//indexes of Primary Type, Description, Year and Arrest of Crime
var idxPrimaryType, idxDescription, idxYear, idxArrest;

var theft = {"under500" : new Array(16).fill(0), "over500": new Array(16).fill(0) };
var assault = {"arrest" : new Array(16).fill(0), "noArrest": new Array(16).fill(0) };
const MOD = 2001;


//Read each line from csv and process the data
rl.on('line', function(line) {
	line = line.replace(/"[^"]+"/g, function (match) {return match.replace(/,/g, ';');});

	if(isHead == true) {
		lineHeader = line.split(',');

		idxPrimaryType = +lineHeader.indexOf("Primary Type");
		idxDescription = +lineHeader.indexOf("Description");
		idxArrest = +lineHeader.indexOf("Arrest");
		idxYear = +lineHeader.indexOf("Year");

		isHead = false;
	}
	else {
		ln = line.split(',');

		if(ln[idxPrimaryType] == 'THEFT') {
			if(ln[idxDescription] == '$500 AND UNDER') {
				theft.under500[parseInt(ln[idxYear])%MOD]++;
			}
			else if(ln[idxDescription] == 'OVER $500') 
				theft.over500[parseInt(ln[idxYear])%MOD]++;	
			}
			else if(ln[idxPrimaryType] == 'ASSAULT') {
				if(ln[idxArrest] == 'true')
					assault.arrest[parseInt(ln[idxYear])%MOD]++;
				else if(ln[idxArrest] == 'false')
					assault.noArrest[parseInt(ln[idxYear])%MOD]++;
			}
			else {}
		++cnt;
	}
	
});

//Write objects to files on close of the file.
rl.on('close', function () {
	var theft2 = {"theftUnder500":[], "theftOver500":[]};
	var assault2 = {"assaultArrest":[], "assaultNoArrest":[]};

	for (var i = 0; i < 16; i++) {
		theft2.theftUnder500.push({"year":(i+MOD), "count":theft.under500[i]});
		theft2.theftOver500.push({"year":(i+MOD), "count":theft.over500[i]});

		assault2.assaultArrest.push({"year":(i+MOD), "count":assault.arrest[i]});
		assault2.assaultNoArrest.push({"year":(i+MOD), "count":assault.noArrest[i]});
	}

	fs.writeFileSync('../json/resultTheft2.json', JSON.stringify(theft2));
	fs.writeFileSync('../json/resultAssault2.json', JSON.stringify(assault2));
});


