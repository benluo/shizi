function SelectCharsAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

SelectCharsAssistant.prototype.handleOkButtonPress = function(event){
  //  this.stageController = this.controller.stageController();
    Shizi.context = {groups: [],
		     currentGroup: 0,
		     currentChar: 0,
		     learnedChars: [],
		    };
    Shizi.Cookies.storeCookie();
    this.controller.stageController.swapScene("selectGroups", ???);
}


SelectCharsAssistant.prototype.setup = function() {
    /* this function is for setup tasks that have to happen when the scene is first created */
    if (){
	that.controller.pushScene("showChar",chars);
    }
	
    /* Setup App Menu */
    this.controller.setupWidget(Mojo.Menu.appMenu, Shizi.MenuAttr, Shizi.MenuModel);
    
    /* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
    /* setup widgets here */
    this.okModel = {
	buttonLabel: $L("OK"),
    };

    this.controller.setupWidget("okButton", {},
				this.okModel);
	
    /* add event handlers to listen to events from widgets */
    this.controller.listen("okButton", Mojo.Event.tap, 
			   this.handleOkButtonPress.bind(this));
}

SelectCharsAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


SelectCharsAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

SelectCharsAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}
