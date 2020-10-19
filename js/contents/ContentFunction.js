class FunctionContent extends Content{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)
		this.type="function";
		this.htmlParent={};

		// this.function = eval(this.content.value);

		this.name=this.content.value;
		//this.createNode();
		this.cNode=new ContentNode(this);
	}




	createFrontEndHTML(){
		super.createFrontEndHTML();
		// this.frontEndCreated=true;
		// this.html.fe = document.createElement("span");
		// this.html.fe.innerHTML=this.content.value;
		// this.createEffects();

		// this.applyEffects();
		
	}




	createEffects(){
		
	
	}


	applyEffects(){
		
	}
	
	play(){
		console.log(this.content.value)
		eval(this.content.value)
	}

	display(log_){	
		console.log("Display")
		
	}
	undisplay(log_){	
		
		
	}

}