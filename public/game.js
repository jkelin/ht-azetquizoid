var socket = new WebSocket("ws://azetquizoid.azurewebsites.net/game");

var gameData = {
	initialized: false,
	running: false,
	debugMode: true,
	gameId: -1
}

function image(url, width, height, options, size)
{
	this.url = url; 
	this.width = width; 
	this.height = heigh; 
	this.options = options; 
	this.size = size;
}

function send(type, data) {
	var obj = {
		type: type,
		data: data
	};
	socket.send(JSON.stringify(obj));
}

function parseMsg(event) {
	var msg = event.data;
	var obj = JSON.parse(msg);
	return obj;
}

function createGame()
{
	if(gameData.initialized) send("create","");
}

function msgClient(data)
{
	console.log(data);
	document.getElementById("notifyBar").innerHTML = data;
}

function gameStarted(data)
{
	gameData.gameId = data.id;
}

function questionAsked(data)
{

}

socket.onopen = function (event) {
  gameData.initialized = true;
};

socket.onmessage = function (event) {
		var obj = parseMsg(event);
		if(gameData.debugMode) console.log("Data received", obj);
		var type = obj.type;
		var data = obj.data;
		switch(type)
		{
			case "error": console.error(obj.data); break;
			case "create-confirm": msgClient("Hra byla vytvořena, id: " + data.id); break;
			case "connect-confirm": msgClient("Klient připojen ke hře " + data.id); gameStarted(data); break;
			case "question": questionAsked(data); break;
			case "answer-report": break;
			case "guess-response" : break;
			case "status-report": break;
			default: console.warn("Unexpected message: " + obj)
		}

}