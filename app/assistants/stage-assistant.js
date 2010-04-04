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
	{label: $L("Select Groups"), command: "do-selectGroups"},
	{label: $L("Test"), command: "do-test"},
	{label: $L("Make Word"), command: "do-wordAssm"},
	{label: $L("Make Sentence"), command: "do-sentAssm"},
        {label: $L("About Shizi..."), command: "do-aboutShizi"},
        Mojo.Menu.editItem,
        Mojo.Menu.helpItem
    ]
};

var Char = {};
//var chars = [];
function StageAssistant() {
};

StageAssistant.prototype.setup = function() {
//Initiate database
    var that = this;
    persistence.connect("charslib", "Chinese Charactor Lib", 800 * 1024);
    Char = persistence.define("Charlib", {
    	gr: "TEXT",
    	latin: "TEXT",
    	ch: "TEXT",
    	py: "TEXT"
    });
    var chars = [];
    persistence.schemaSync(function(tx){
	//check if the database is exist, if so, skip inserting json file to database;
    	Char.all().list(tx, function(results){
    	    if (results.length == 0){
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
    	});
    	persistence.flush();
    });

    if (!Shizi.context) {
	this.controller.pushScene("selectGroups");
    }

    Char.all().filter("gr","=","1a").filter("latin","=","shi").order("latin", false).list(null, function (results) {
    	results.forEach(function (r){
    	    chars.push(r);
	});
	that.controller.pushScene("showChar",chars);
    });

 //   this.controller.pushScene("showChar",chars);
};

StageAssistant.prototype.handleCommand = function(event) {
    if(event.type == Mojo.Event.command) {
    switch(event.command) {
    case "do-selectGroups":
	this.controller.pushScene("selectGroups");
	break;
    case "do-test":
	this.controller.pushScene("test");
	break;
    case "do-wordAssm":
	this.controller.pushScene("wordAssm");
	break;
    case "do-sentAssm":
	this.controller.pushScene("sentAssm");
	break;
    case "do-aboutShizi":
        var currentScene = this.controller.activeScene();
            currentScene.showAlertDialog({
                onChoose: function(value) {},
                title: $L("Shizi v#{version}").interpolate({
		    version: Shizi.versionString}),
                message: $L("For my son Yuan Yuan. \nCopyright 2010, Ben Luo."),
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