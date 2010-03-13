// Shizi namespace
var Shizi = {};

// Constants
Shizi.versionString = "0.0.1";

//Shizi.context = {};
// Setup App Menu for all scenes; all menu actions handled in
Shizi.MenuAttr = {omitDefaultItems: true};
Shizi.MenuModel = {
    visible: true,
    items: [
        {label: $L("About Shizi..."), command: "do-aboutShizi"},
        Mojo.Menu.editItem,
        Mojo.Menu.helpItem
    ]
};

var Char = {};
var chars = [];
function StageAssistant() {
};

StageAssistant.prototype.setup = function() {
//Initiate database
	//var chars;
    persistence.connect("charslib", "Chinese Charactor Lib", 254 * 1024);
    Char = persistence.define("Charlib", {
    	gr: "TEXT",
    	latin: "TEXT",
    	ch: "TEXT",
    	py: "TEXT"
    });
    persistence.schemaSync(function(tx){
	var allChars = Char.all();
	if (allchars == null){
	    var chinese ={};
            for (var i=0 ; i< charslib.length; i++) {
        	chinese = charslib[i];
        	var t = new Char();
        	t.gr = chinese.gr;
        	t.latin = chinese.latin;
        	t.ch = chinese.ch;
        	t.py = chinese.py;
        	persistence.add(t);
            }
	}
        persistence.flush();
    });
    var tmp;
    allChars = Char.all().order("latin", false);
    allChars.list(null, function (results) {
	chars = results;
	//Shizi.context.chars = results;
	Mojo.Log.error("Shizi.context.chars inner length is ", chars.length);
	Mojo.Log.error("shizi char is ", chars[1].ch);//Shizi.context.chars.length);
    });
    Mojo.Log.error("chars outter length is ", chars.length);
    Mojo.Log.error("Shizi.context.chars outter length is ", typeof chars);//Shizi.context.chars.length);
    
    this.controller.pushScene("showChar",chars);//, tmp);//Shizi.context.chars);
};

StageAssistant.prototype.handleCommand = function(event) {
    if(event.type == Mojo.Event.command) {
    switch(event.command) {
        case "do-aboutShizi":
        var currentScene = this.controller.activeScene();
            currentScene.showAlertDialog({
                onChoose: function(value) {},
                title: $L("Shizi 鈥� v#{version}").interpolate({
            version: Shizi.versionString}),
                message: $L("For my son Yuan Yuan. \nCopyright 2009, Ben Luo."),
                choices:[
                    {label:$L("OK"), value:""}
                ],
            });
            break;
        }
    }
};

// Deactivate - save users information
StageAssistant.prototype.deactivate = function() {
    Shizi.Cookie.storeCookie();
};
