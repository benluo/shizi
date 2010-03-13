// Shizi namespace
var Shizi = {};

// Constants
Shizi.versionString = "0.0.1";

Shizi.context = {};
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
	//var chars;
    persistence.connect("charslib", "Chinese Charactor Lib", 254 * 1024);
    Char = persistence.define("Charlib", {
    	gr: "TEXT",
    	latin: "TEXT",
    	ch: "TEXT",
    	py: "TEXT"
    });
    persistence.schemaSync(function(tx){
/*        var chinese ={};
        for (var i=0 ; i< charslib.length; i++) {
        	chinese = charslib[i];
        	//	Mojo.Log.error("All Chars is ", chinese.ch);
        	var t = new Char();
        	t.gr = chinese.gr;
        	t.latin = chinese.latin;
        	t.ch = chinese.ch;
        	t.py = chinese.py;
        	persistence.add(t);
        } */
        persistence.flush(tx, function(){
        	Char.all().order("latin", false).list(tx, function (results) {
//        		Mojo.Log.error("the result length is ", results.length);
        		Shizi.context.chars = results;
        		Mojo.Log.error("Shizi.context.chars inner length is ", Shizi.context.chars.length);
/*        		Mojo.Controller.StageController.pushScene("showChar",chars);/*.forEach(function (r) {
 //       	    	console.log (typeof r);
        	    	chars.push(r); // simply adds the whole record to the array
        	    	Mojo.Log.info("row from db is ", r.ch); 
        	    });*/
        	});
        });
   	});

    Mojo.Log.error("Shizi.context.chars outter length is ", Shizi.context.chars.length);
    
//    this.controller.pushScene("showChar", Shizi.context.chars);
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
