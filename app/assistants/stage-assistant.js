// Shizi namespace
var Shizi = {};

// Constants
Shizi.versionString = "0.0.1";

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

var Char = {}

function StageAssistant() {
};

StageAssistant.prototype.setup = function() {
//Initiate database
	var chars = [];
    persistence.connect("charslib", "Chinese Charactor Lib", 254 * 1024);
    Char = persistence.define("Charlib", {
    	gr: "TEXT",
    	latin: "TEXT",
    	ch: "TEXT",
    	py: "TEXT"
    });
    persistence.schemaSync(function(tx){
        var chinese ={};
        for (var i=0 ; i< charslib.length; i++) {
        	chinese = charslib[i];
        	//	Mojo.Log.error("All Chars is ", chinese.ch);
        	var t = new Char();
        	t.gr = chinese.gr;
        	t.latin = chinese.latin;
        	t.ch = chinese.ch;
        	t.py = chinese.py;
        	persistence.add(t);
        }
        persistence.flush(tx, function(){
        	Mojo.Log.error("this is test");
        	Char.all().order("latin", false).list(tx, function (results) {
        	    results.forEach(function (r) {
 //       	    	console.log (typeof r);
        	    	chars.push(r); // simply adds the whole record to the array
        	    	Mojo.Log.info("row from db is ", r.ch); 
        	    });
        	});
        });
   	});

    Mojo.Log.info("chars[1].ch is ", chars[1].ch);

    this.controller.pushScene("showChar", chars);
};

StageAssistant.prototype.handleCommand = function(event) {
    if(event.type == Mojo.Event.command) {
    switch(event.command) {
        case "do-aboutShizi":
        var currentScene = this.controller.activeScene();
            currentScene.showAlertDialog({
                onChoose: function(value) {},
                title: $L("Shizi — v#{version}").interpolate({
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
