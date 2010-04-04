function ShowCharAssistant(charlibs) {
	/* this is the creator function for your scene assistant object. It will be passed all the 
	   additional parameters (after the scene name) that were passed to pushScene. The reference
	   to the scene controller (this.controller) has not be established yet, so any initialization
	   that needs the scene controller should be done in the setup function below. */
    this.charIndex = 0;
    this.chars = charlibs;
    this.charNumber = this.chars.length;
    this.charStatus = 0; //0 means Chinese, 1 is Pinyin
}


/*
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
*/

ShowCharAssistant.prototype.setup = function() {
    // this function is for setup tasks that have to happen when 
    //the scene is first created
		
    /* use Mojo.View.render to render view templates and add them to the scene, if needed. */
    
    /* setup widgets here */

    //setup command Menu

    this.charMenuModel = {
	visible: true,
	items: [
	    {items: []},//{icon: "back", command: "do-charPrevious"}]},
	    {},
	    {items: []} //{icon: "forward", command: "do-charNext"}]}
	]};
    if (this.charIndex > 0) {
	this.charMenuModel.items[0].items=[{icon: "back", command: "do-charPrevious"}];
    }
    
    if (this.charIndex < this.charNumber-1) {
	this.charMenuModel.items[2].items=[{icon: "forward", command: "do-charNext"}];
    }

    this.controller.setupWidget(Mojo.Menu.commandMenu, undefined, this.charMenuModel);
    
    // Setup App Menu
    this.controller.setupWidget(Mojo.Menu.appMenu, Shizi.MenuAttr, Shizi.MenuModel);

}

ShowCharAssistant.prototype.handleCommand = function(event) {
    if(event.type == Mojo.Event.command) {
	switch(event.command) {
        case "do-charNext":
	    if (this.charIndex < this.charNumber-1) {
		this.charIndex++;
		if (this.charIndex==1){
		    this.charMenuModel.items[0].items=[{icon: "back", command: "do-charPrevious"}];
		    this.controller.modelChanged(this.charMenuModel, this);
		}
		if (this.charIndex == this.charNumber-1) {
		    this.charMenuModel.items[2].items=[];
		    this.controller.modelChanged(this.charMenuModel, this);
		}
	    }
            break;
	case "do-charPrevious":
	    if (this.charIndex > 0){
		this.charIndex--;
		if (this.charIndex == this.charNumber-2){
		    this.charMenuModel.items[2].items=[{icon: "forward", command: "do-charNext"}];
		    this.controller.modelChanged(this.charMenuModel, this);
		}
		if (this.charIndex == 0) {
		    this.charMenuModel.items[0].items=[];
		    this.controller.modelChanged(this.charMenuModel, this);
		}
	    }
	    break;
	}
	$("onechar").update(this.chars[this.charIndex].ch);
    }
};

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