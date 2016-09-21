const readline = require('readline');
const fs = require('fs');
var isHead = true;


const rl = readline.createInterface({
	input: fs.createReadStream('Crimes_-_2001_to_present.csv'),
});


var cnt = 0;
var lineHeader = [];
var ln = [];
var sep = "";

var theft = {"under500" : new Array(16).fill(0), "over500": new Array(16).fill(0) };
var assault = {"arrest" : new Array(16).fill(0), "noArrest": new Array(16).fill(0) };
const MOD = 2001;

rl.on('line', function(line) {

	if(isHead == true) {
		line = line.replace(/"[^"]+"/g, function (match) {return match.replace(/,/g, ';');});
		lineHeader = line.split(',');
		isHead = false;
	}
	else {
			line = line.replace(/"[^"]+"/g, function (match) {return match.replace(/,/g, ';');}); 
			ln = line.split(',');

			if(ln[5] == 'THEFT') {
				if(ln[6] == '$500 AND UNDER') {
					theft.under500[parseInt(ln[17])%MOD]++;
				}
				else if(ln[6] == 'OVER $500') 
					theft.over500[parseInt(ln[17])%MOD]++;
				
			}
			else if(ln[5] == 'ASSAULT') {
				if(ln[8] == 'true')
					assault.arrest[parseInt(ln[17])%MOD]++;
				else if(ln[8] == 'false')
					assault.noArrest[parseInt(ln[17])%MOD]++;
			}
			else {}
		++cnt;
	}
	
});

rl.on('close', function () {
	fs.writeFileSync('resultTheft.json', JSON.stringify(theft) + "\n Records Checked : " + cnt);
	fs.writeFileSync('resultAssault.json', JSON.stringify(assault) + "\n Records Checked : " + cnt);
});


