function GroupNameDialogAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
}

GroupNameDialogAssistant.prototype.handleOkButtonPress = function(event){
    Shizi.context.groups.push({name: this.groupNameModel.value, chars: []});
    Shizi.Cookies.storeCookie();
    this.controller.swapScene("selectGroups");
}

GroupNameDialogAssistant.prototype.handleOkButtonPress = function(event){
    this.controller.popScene(); //?
}

GroupNameDialogAssistant.prototype.setup = function() {

    /* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
    /* setup widgets here */

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
    this.controller.setupWidget("newGroupName",
		this.attributes = {
		    hintText: $L('Input new group name and hit Enter'),
		    multiline: false,
		    enterSubmits: false,
		    focus: true
		},
		this.groupNameModel = {
		    value: "",
		    disabled: false
		});

	/* add event handlers to listen to events from widgets */
    this.controller.listen("okButton", Mojo.Event.tap, 
			   this.handleOkButtonPress.bind(this));
    this.controller.listen("cancelButton", Mojo.Event.tap, 
			   this.handleCancelButtonPress.bind(this));

};

GroupNameDialogAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

GroupNameDialogAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

GroupNameDialogAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
