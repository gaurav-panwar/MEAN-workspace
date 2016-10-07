//console.log("Testing");

const readline = require('readline');
const fs = require('fs');
var isHead = true;


const rl = readline.createInterface({
	input: fs.createReadStream('Crimes_-_2001_to_present.csv'),
});

//const ws = fs.createWriteStream('result.js');


var arrRes = [];
var cnt = 0;
var lineHeader = [];
var ln = [];
var sep = "";

rl.on('line', function(line) {

	if(isHead == true) {
		lineHeader = lineSplit(line);/*line.split(',');*/
		//console.log(lineHeader);
		fs.writeFileSync('result.json', "[\n");
		isHead = false;
	}
	else {
			ln = lineSplit(line);/*line.split(',');*/
			obj = {};
			for(var i=0; i<ln.length; ++i) {
				obj[lineHeader[i]] = ln[i];
			}
		//arrRes.push(obj);
		fs.appendFileSync('result.json', sep + JSON.stringify(obj));
		++cnt;
		if(!sep)
			sep = ",\n";
		//arrRes = [];
		//console.log(arrRes);
		//console.log(++cnt);
	}
	/*if(cnt > 1000) {
		fs.appendFileSync('result.json', "\n]");
		return;
	}*/
});

rl.on('close', function () {
	fs.appendFileSync('result.json', "\n]");
});


function lineSplit(line) {
	var ln = line.split(',');
	var bad = [];

	for(var i=ln.length-1; i> 0; --i) {
    	// find all the unescaped quotes on the line:
    	var m = ln[i].match(/[^\\]?\"/g);

    	// if there are an odd number of them, this line, and the line after it is bad:
    	if((m ? m.length : 0) % 2 == 1) { bad.push(i--); }
	}

	// starting at the bottom of the list, merge lines back, using \r\n
	for(var b=0; b < bad.length; ++b) {
    	ln.splice(bad[b]-1, 2, ln[bad[b]-1] +  "," + ln[bad[b]]);
	}
	return ln;
}
