function SelectGroupsAssistant() {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
};

SelectGroupsAssistant.prototype.handleNewGroupButtonPress = function(event){
    this.controller.showDialog({
	template: "selectGroups/groupName-dialog",
	assistant: new GroupNameDialogAssistant(this)
    });
};

SelectGroupsAssistant.prototype.handleOkButtonPress = function(event){
  //  this.stageController = this.controller.stageController();
    var usersNo = Shizi.users.length;
    Shizi.users[usersNo] = {name: this.userModel.value,
			   selectedLibs: [],
			   currentLib: 0,
			   learnedChars: [],
			   lastLearnedChar: ""
			  };
    Shizi.Cookies.storeCookie();
    this.controller.swapScene("showChar");//, ???);

};

SelectGroupsAssistant.prototype.handleCancelButtonPress = function(event){
    this.controller.popScene();
};

SelectGroupsAssistant.prototype.setup = function() {
/*
    if (!Shizi.context.currentGroup){
	this.controller.showDialog({
            template: "selectGroups/groupName-dialog",
            assistant: new GroupNameDialogAssistant(this)
        });
	//	this.controller.swapScene("selectChars");
    }
*/	
    /* Setup App Menu */
    this.controller.setupWidget(Mojo.Menu.appMenu, Shizi.MenuAttr, Shizi.MenuModel);
    
    /* use Mojo.View.render to render view templates and add them to the scene, if needed. */
	
    /* setup widgets here */
    this.groupListModel = {
	items: Shizi.predefinedGroups
    };
    this.controller.setupWidget("groupList",
	{
	    itemTemplate: "selectGroups/groupRowTemplate",
	    listTemplate: "selectGroups/groupListTemplate",
	    swipeToDelete: false,
	    renderLimit: 40,
	    reorderable: false
	}, this.groupListModel);

    this.newGroupModel = {
	buttonLabel: $L("Add New Group"),
	disabled: false,
    };
    this.controller.setupWidget("newGroupButton", {}, this.newGroupModel);
    this.okModel = {
	buttonLabel: $L("OK"),
	disabled: false,
    };
    this.controller.setupWidget("okButton", {}, this.okModel);
    this.cancelModel = {
	buttonLabel: $L("Cancel"),
	disabled: false,
    };
    this.controller.setupWidget("cancelButton", {}, this.cancelModel);
	
    /* add event handlers to listen to events from widgets */
    this.controller.listen("newGroupButton", Mojo.Event.tap, 
			   this.handleNewGroupButtonPress.bind(this));
    this.controller.listen("okButton", Mojo.Event.tap, 
			   this.handleOkButtonPress.bind(this));
    this.controller.listen("cancelButton", Mojo.Event.tap, 
			   this.handleCancelButtonPress.bind(this));

};

SelectGroupsAssistant.prototype.activate = function(event) {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

SelectGroupsAssistant.prototype.deactivate = function(event) {
	/* remove any event handlers you added in activate and do any other cleanup that should happen before
	   this scene is popped or another scene is pushed on top */
};

SelectGroupsAssistant.prototype.cleanup = function(event) {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};
