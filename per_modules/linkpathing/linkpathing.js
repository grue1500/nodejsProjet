var http = require('http'),
	url = require('url'),
	ejs = require('ejs'),
	fs = require('fs'),
	path = require('path'),
	EventEmitter = require('events').EventEmitter;
	


var Pathing = {
	Default: './web_fils'
		};


exports.PathingDefault = function(path) {
	Pathing.Default = path;
}



var server = http.createServer().listen(8080);



 

	server.on('request',function(req, res)
	{
		//request treatment	
		var ReqUrl = url.parse(req.url).pathname;					
		console.log(ReqUrl);//display what is ask too the server.
		
		var ResValue = {
				Statut:'',
				Path:'',
				Extention:'',
				ErrorCode: '',
			};


/***********chechk for path too fils****************/

		//var RegexEndBytext = '(?=[^\/]+$)[A-z]\D*';
		//var RegexEndBySlash = '\/(?=[^\/]*$)';
					

			if(fs.existsSync(Pathing.Default+ReqUrl))
			{
				console.log(path.extname(ReqUrl));
				
				if(path.extname(ReqUrl))// va cherhcer l'extention de fichier dans le url
				{
					var extention = path.extname(ReqUrl); // va chercher l"extention
					
					ResValue.Statut = true;
					ResValue.Path = Pathing.Default+ReqUrl;
					ResValue.Extention = extention;

					WebResponse(ResValue);

				}
				else
				{
					//***processed if url not fils and juste a path***//
					if(fs.existsSync(Pathing.Default+ReqUrl+"/index.ejs"))
					{
						var extention = '.ejs'; // va chercher l"extention
						
						ResValue.Statut = true;
						ResValue.Path = Pathing.Default+ReqUrl+"/index.ejs";
						ResValue.Extention = extention;

						WebResponse(ResValue);
					}
					else   //retour le 404 si la request 
					{
						ResValue.Statut = false;
						ResValue.Path = Pathing.Default+"/404.ejs";
						ResValue.Extention = ".ejs";

						WebResponse(ResValue);
					}
				}
				

			}
			else
			{
				

				if(path.extname(ReqUrl) == '.ejs' || !path.extname(ReqUrl))
				{
					ResValue.Statut = true;
					ResValue.Path = Pathing.Default+"/404.ejs";
					ResValue.Extention = ".ejs";

					WebResponse(ResValue);
				}
				else
				{
					ResValue.Statut = false;
					ResValue.ErrorCode = 404;

					WebResponse(ResValue);
				}
			}
	}
			//######fin#########//		
/***********chechk for path too fils****************/

/******************** check si il y a un fichier script ***********************/



						
/******************** check si il y a un fichier script ***********************/




//
//
//      i am the point too deal with the reponse and if i use a function or not 
//
//
function WebResponse(ResData){


	if(ResData.Statut == true)
	{
		
		var FilsExt = MIME(ResData.Extention);

 		var Data = fs.readFileSync(ResData.Path);

		console.log(ResData);

		

		res.writeHead(200, {"Content-Type": FilsExt.TypeMime});

		
		//get the file too push

		if(FilsExt.Binary == "y")
		{
			res.end(Data,"binary");
		}
		else
		{
			res.end(Data,'utf8');
		}



	}
	else
	{
		console.log(ResData);

		res.writeHead(ResData.ErrorCode);
		res.end();
	}

	
			
}



/****** Function pour definier fichier  *******/

function MIME(FilsExt)
{

var ExtentionLibrary = 
	[
	{Extention: '.aac', TypeMime: 'audio/aac', Binary:'y'},
	{Extention: '.abw', TypeMime: 'application/x-abiword', Binary:'y'},
	{Extention: '.arc', TypeMime: 'application/octet-stream', Binary:'y'},
	{Extention: '.avi', TypeMime: 'video/x-msvideo', Binary:'y'},
	{Extention: '.azw', TypeMime: 'application/vnd.amazon.ebook', Binary:'y'},
	{Extention: '.bin', TypeMime: 'application/octet-stream', Binary:'y'},
	{Extention: '.bz', TypeMime: 'application/x-bzip', Binary:'y'},
	{Extention: '.bz2', TypeMime: 'application/x-bzip2', Binary:'y'},
	{Extention: '.csh', TypeMime: 'application/x-csh', Binary:'y'},
	{Extention: '.css', TypeMime: 'text/css', Binary:'n'},
	{Extention: '.csv', TypeMime: 'text/csv', Binary:'n'},
	{Extention: '.doc', TypeMime: 'application/msword', Binary:''},
	{Extention: '.docx', TypeMime: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', Binary:'y'},
	{Extention: '.eot', TypeMime: 'application/vnd.ms-fontobject', Binary:'y'},
	{Extention: '.epub', TypeMime: 'application/epub+zip', Binary:'y'},
	{Extention: '.gif', TypeMime: 'image/gif', Binary:'y'},
	{Extention: '.htm', TypeMime: 'text/html', Binary:'n'},
	{Extention: '.html', TypeMime: 'text/html', Binary:'n'},
	{Extention: '.ico', TypeMime: 'image/x-icon', Binary:'y'},
	{Extention: '.ics', TypeMime: 'text/calendar', Binary:'y'},
	{Extention: '.jar', TypeMime: 'application/java-archive', Binary:'y'},
	{Extention: '.jpeg', TypeMime: 'image/jpeg', Binary:'y'},
	{Extention: '.jpg', TypeMime: 'image/jpeg', Binary:'y'},
	{Extention: '.js', TypeMime: 'application/javascript', Binary:'y'},
	{Extention: '.json', TypeMime: 'application/json', Binary:'y'},
	{Extention: '.mid', TypeMime: 'audio/midi', Binary:'y'},
	{Extention: '.midi', TypeMime: 'audio/midi', Binary:'y'},
	{Extention: '.mpeg', TypeMime: 'video/mpeg', Binary:'y'},
	{Extention: '.mpkg', TypeMime: 'application/vnd.apple.installer+xml', Binary:'y'},
	{Extention: '.odp', TypeMime: 'application/vnd.oasis.opendocument.presentation', Binary:'y'},
	{Extention: '.ods', TypeMime: 'application/vnd.oasis.opendocument.spreadsheet', Binary:'y'},
	{Extention: '.odt', TypeMime: 'application/vnd.oasis.opendocument.text', Binary:'y'},
	{Extention: '.oga', TypeMime: 'audio/ogg', Binary:'y'},
	{Extention: '.ogv', TypeMime: 'video/ogg', Binary:'y'},
	{Extention: '.ogx', TypeMime: 'application/ogg', Binary:'y'},
	{Extention: '.otf', TypeMime: 'font/otf', Binary:'y'},
	{Extention: '.png', TypeMime: 'image/png', Binary:'y'},
	{Extention: '.pdf', TypeMime: 'application/pdf', Binary:'y'},
	{Extention: '.ppt', TypeMime: 'application/vnd.ms-powerpoint', Binary:'y'},
	{Extention: '.pptx', TypeMime: 'application/vnd.openxmlformats-officedocument.presentationml.presentation', Binary:'y'},
	{Extention: '.rar', TypeMime: 'application/x-rar-compressed', Binary:'y'},
	{Extention: '.rtf', TypeMime: 'application/rtf', Binary:'y'},
	{Extention: '.sh', TypeMime: 'application/x-sh', Binary:'y'},
	{Extention: '.svg', TypeMime: 'image/svg+xml', Binary:'y'},
	{Extention: '.swf', TypeMime: 'application/x-shockwave-flash', Binary:'y'},
	{Extention: '.tar', TypeMime: 'application/x-tar', Binary:'y'},
	{Extention: '.tif', TypeMime: 'image/tiff', Binary:'y'},
	{Extention: '.tiff', TypeMime: 'image/tiff', Binary:'y'},
	{Extention: '.ts', TypeMime: 'application/typescript', Binary:'y'},
	{Extention: '.ttf', TypeMime: 'font/ttf', Binary:'y'},
	{Extention: '.vsd', TypeMime: 'application/vnd.visio', Binary:'y'},
	{Extention: '.wav', TypeMime: 'audio/x-wav', Binary:'y'},
	{Extention: '.weba', TypeMime: 'audio/webm', Binary:'y'},
	{Extention: '.webm', TypeMime: 'video/webm', Binary:'y'},
	{Extention: '.webp', TypeMime: 'image/webp', Binary:'y'},
	{Extention: '.woff', TypeMime: 'font/woff', Binary:'y'},
	{Extention: '.woff2', TypeMime: 'font/woff2', Binary:'y'},
	{Extention: '.xhtml', TypeMime: 'application/xhtml+xml', Binary:'n'},
	{Extention: '.xls', TypeMime: 'application/vnd.ms-excel', Binary:'y'},
	{Extention: '.xlsx', TypeMime: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', Binary:'y'},
	{Extention: '.xml', TypeMime: 'application/xml', Binary:'n'},
	{Extention: '.xul', TypeMime: 'application/vnd.mozilla.xul+xml', Binary:'y'},
	{Extention: '.zip', TypeMime: 'application/zip', Binary:'y'},
	{Extention: '.3gp', TypeMime: 'video/3gpp', Binary:'y'},
	{Extention: '.3g2', TypeMime: 'video/3gpp2', Binary:'y'},
	{Extention: '.7z', TypeMime: 'application/x-7z-compressed', Binary:'y'},
	//costome extension
	{Extention:'.ejs', TypeMime: 'text/html', Binary:'n'}
	],

	Data = ""; 	



	for (var i = 0; i < ExtentionLibrary.length; i++) {

		if(ExtentionLibrary[i].Extention == FilsExt)
		{
			Data = ExtentionLibrary[i];
			break;
		}
		
	}

	return Data;


}

			


			/*var path = './views/' + FilePath;
			var file; 
				
				if(fs.existsSync(path))
				{	
					file = fs.readFileSync(path, 'utf8');
					console.log('data receve');
				
					console.log(file);
					var files = ejs.render(file, value);
				

					res.writeHead(200, {"Content-Type": "text/html"});
					res.write(files, function(err) 
					{
						
						if(err)
						{
							console.log('ERROR DE RES.write\n'+err);
						}
					
						res.end();

					});	

				}
				else
				{
					console.error('Myfile does not exist');
					res.end();
				}*/




	
} );





    