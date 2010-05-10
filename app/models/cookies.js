//For storing context information
Shizi.predefinedGroups = [{name:"digital",chars:['一','二','三','四','五','六','七','八','九','十']},{name:"fourSeasons", chars:['春','夏','秋','冬']},{name:"color",chars:['红','橙','黄','绿','青','蓝','紫','白','黑']},{name:"family",chars:['爸','妈','爷','奶','哥','弟','姐','妹']}];

Shizi.Cookies = ({
    initialize: function(){
	// get context
	this.cookieData = new Mojo.Model.Cookie("context");
	var context = this.cookieData.get();
	if (context) {
            Shizi.context = context.context;
	}
	else {
            for (var i = 0; i++;i< predefinedGroups.length) {
		Shizi.context.groups[i] = predefinedGroups[i];
	    }
	}
    },

    // store - context
    storeCookie: function(){
    	this.cookieData.put({
    	    context: Shizi.context,
    	});
    }
})