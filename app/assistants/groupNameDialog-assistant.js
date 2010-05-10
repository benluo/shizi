/* New Group Name
*/
function GroupNameDialogAssistant(sceneAssistant) {
    // remain parent assistant
    this.sceneAssistant = sceneAssistant;
};

GroupNameDialogAssistant.prototype.okButtonPress = function(){
    Shizi.context.groups.push({name: this.groupNameModel.value, chars: []});
    Shizi.Cookies.storeCookie();
    this.widget.mojo.close();
};

GroupNameDialogAssistant.prototype.setup = function(widget) {
    this.widget = widget;
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

    this.sceneAssistant.controller.setupWidget("nameOkButton", {}, this.okModel);
    this.sceneAssistant.controller.setupWidget("nameCancelButton", {}, this.cancelModel);
    this.sceneAssistant.controller.setupWidget("groupName",
		this.attributes = {
		    hintText: $L('Input new group name'),
		    multiline: false,
		    enterSubmits: false,
		    focus: true
		},
		this.groupNameModel = {
		    value: "",
		    disabled: false
		});
	/* add event handlers to listen to events from widgets */
    this.okButtonPressHandler = this.okButtonPress.bindAsEventListener(this); // Don't know why can not use bind, only can use bindAsEventListener
    this.sceneAssistant.controller.listen(this.sceneAssistant.controller.get("nameOkButton"),
					  Mojo.Event.tap, this.okButtonPressHandler);
   this.sceneAssistant.controller.listen(this.sceneAssistant.controller.get("nameCancelButton"), 
					 Mojo.Event.tap, this.widget.mojo.close);
};

GroupNameDialogAssistant.prototype.activate = function() {
	/* put in event handlers here that should only be in effect when this scene is active. For
	   example, key handlers that are observing the document */
};

GroupNameDialogAssistant.prototype.cleanup = function() {
	/* this function should do any cleanup needed before the scene is destroyed as 
	   a result of being popped off the scene stack */
};