//Import file system functionality
var MapArr = [];
exports.readDirectory = function(req,res) {

	var fs = require('fs');
	var folderName= '/Users/amiteshjaiswal/Documents/Angular Widgets/D3-Word-Cloud/files/';
	console.log("folder: "+folderName);
	if (folderName == undefined) {
		console.log("Please specify a folder");
		return;
	}

	var fileDataArr = [];
	var dataMap = {};
	fs.readdir(folderName, function(err, data){
		if (err) {
			throw err; 
		} 
		
		
		//console.log("length---------------------: "+data.length);
		data.forEach(function(file){ 
			fs.readFile(folderName + "/" + file, 'utf8', function(err, filedata){ //read each file in array
				if (err) {
				throw err;
				} 
				console.log("file: "+file);
				if(file.indexOf('.txt')!==-1 || file.indexOf('.pdf')!==-1){
					var testingVariable = filedata.split(" ");
					
					for(var j=0; j<testingVariable.length;j++){
						console.log(testingVariable[j]);
						var flag = 0;
						for(var i=0;i<MapArr.length;i++){
							if(MapArr[i].text === testingVariable[j]){
								flag =1;
								MapArr[i].size = MapArr[i].size+1;
							}
						}
						if(flag === 0)
						{
							MapArr.push({text: testingVariable[j], size: 1});
						}
					}
					console.log(MapArr);
					fs.writeFileSync("./public/d3WordCloud/scrape_data.js","var scrapeData = "+JSON.stringify(MapArr));
					res.render('wordCloud');
				}
			});
			
		});
		
	});
};
