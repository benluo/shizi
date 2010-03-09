function SelectLibsAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

SelectLibsAssistant.prototype.handleOkButtonPress = function(event){
/*    var currentUser = Shizi.users[Shizi.currentUser];
    currentUser.selectedLibs = [];
    this.controller.stageController.pushScene("showChar"); 
*/
}

SelectLibsAssistant.prototype.handleCancelButtonPress = function(event){
    if (!Shizi.users[Shizi.currentUser].selectedLibs){
	var currentScene = this.controller.activeScene();
        currentScene.showAlertDialog({
            onChoose: function(value) {},
            title: $L("No selected lib"),
            message: $L("You have to select at least one lib."),
            choices:[
                {label:$L("OK"), value:""}
            ],
        });
    }
    else{
	this.controller.popScene();
    }
}

SelectLibsAssistant.prototype.setup = function() {
	/* this function is for setup tasks that have to happen when the scene is first created */
	
   // Setup App Menu
    this.controller.setupWidget(Mojo.Menu.appMenu, Shizi.MenuAttr, Shizi.MenuModel);
	/* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
	/* setup widgets here */

    // Setup story list with standard news list templates.
/*    this.controller.setupWidget("chlibsList",
				itemTemplate: "selectLibs/chlibsRowTemplate",
				listTemplate: "selectLibs/chlibsListTemplate",
				swipeToDelete: false,
				renderLimit: 40,
				reorderable: false
			       },
    this.storyModel = {
	items: this.feed.stories
    });*/

this.checkAttributes = {
		property: "value",
		trueValue: "ON",
		falseValue: "OFF",
		fieldName: 'checkboxstuff'
	};
	this.checkModel = {
		value: "OFF",
		disabled: false
	};

	this.controller.setupWidget('lib-checkbox', this.checkAttributes, this.checkModel);
    
    this.okModel = {
	buttonLabel: $L("OK"),
	disabled: false,
    };
    this.cancelModel = {
	buttonLabel: $L("Cancel"),
	disabled: false,
    };

    this.controller.setupWidget("okButton", {},
				this.okModel);
    this.controller.setupWidget("cancelButton", {},
				this.cancelModel);

	/* add event handlers to listen to events from widgets */
    this.controller.listen("okButton", Mojo.Event.tap, 
			   this.handleOkButtonPress.bind(this));
    this.controller.listen("cancelButton", Mojo.Event.tap, 
			   this.handleCancelButtonPress.bind(this));
}

SelectLibsAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
}


SelectLibsAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
}

SelectLibsAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
}
