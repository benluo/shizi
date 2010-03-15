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
        persistence.flush(tx, function(){
	    Char.all().order("latin", false).list(tx, function (results) {
		results.forEach(function (r){
		    chars.push(r);
//		    Mojo.Log.error("this is %s in %s", r.latin, r.ch);
		});
		that.controller.pushScene("showChar",chars);
/*		results.forEach(function (r) {
		    chars.push(r);
		    Mojo.Log.error("char latin is ", r.latin);
		});
	    });*/
	    });
	});

//    Mojo.Log.error("Shizi.context.chars outter length is ", typeof chars);
    });   
//    Mojo.Log.error("chars outter length is ", chars.length);
 //   this.controller.pushScene("showChar",chars);
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