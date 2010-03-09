function ShowCharAssistant(charlibs) {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
    this.charindex = 0;
    this.chars = charlibs;
    this.charNumber = this.chars.length;
    this.charstatus = 0; //0 means Chinese, 1 is Pinyin
}

ShowCharAssistant.prototype.handlePreButtonPress = function(event){
    if (this.charindex > 0){
	this.charindex--;
    }
    var character = this.chars[this.charindex].ch;
    this.controller.get("onechar").update(character);
}

ShowCharAssistant.prototype.handleNextButtonPress = function(event){
    if (this.charindex < this.charNumber-1) {
	this.charindex++;
    }
    var character  = this.chars[this.charindex].ch;
    this.controller.get("onechar").update(character);
}

ShowCharAssistant.prototype.handleOnecharPress = function(event){
    this.charstatus = !this.charstatus;
    if (this.charstatus == 0) {
	var character  = this.chars[this.charindex].ch;
    }
    else {
	var character  = this.chars[this.charindex].py;    
    }
    this.controller.get("onechar").update(character);
}


ShowCharAssistant.prototype.setup = function() {
    // this function is for setup tasks that have to happen when 
    //the scene is first created
		
    /* use Mojo.View.render to render view templates and add them to the scene, if needed. */
    
    /* setup widgets here */
    
    // Setup App Menu
    this.controller.setupWidget(Mojo.Menu.appMenu, Shizi.MenuAttr, Shizi.MenuModel);
	
	
	/* add event handlers to listen to events from widgets */
    this.nextModel = {
	buttonLabel: $L("Next"),
	disabled: false,
    };
    this.previousModel = {
	buttonLabel: $L("Previous"),
	disabled: false,
    };
    this.voiceModel = {
	buttonLabel: $L("Voice"),
	disabled: false,
    };
    
    this.controller.setupWidget("prevButton", {},
				this.previousModel);
    this.controller.setupWidget("nextButton", {},
				this.nextModel);
    this.controller.setupWidget("voiceButton", {},
				this.voiceModel);
    this.controller.listen("nextButton", Mojo.Event.tap, 
			   this.handleNextButtonPress.bind(this));
    this.controller.listen("prevButton", Mojo.Event.tap,
			   this.handlePreButtonPress.bind(this));
    this.controller.listen("onechar", Mojo.Event.tap,
			   this.handleOnecharPress.bind(this));
}

ShowCharAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


ShowCharAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

ShowCharAssistant.prototype.cleanup = function(event) {
	/* this function should do any eanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}