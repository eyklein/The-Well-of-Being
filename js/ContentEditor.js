function ContentEditorModual(content_,overlay_){
	this.overlay=overlay_;
	this.content=content_;

	// console.log(this.content)
	this.html={}

	this.createHTML();
	this.createViewport();
	this.createTools();

	




}

ContentEditorModual.prototype.changeType=function(type_){
	this.content.type=type_;
}
ContentEditorModual.prototype.getType=function(){

	return this.content.content.type;
}
ContentEditorModual.prototype.getValue=function(){
	return this.content.content.value;
}

ContentEditorModual.prototype.createHTML=function(){
	

	this.html.viewport = document.createElement("div");
	this.html.viewport.classList.add("viewport");

	this.html.contentToolBox = document.createElement("div");
	this.html.contentToolBox.classList.add("content-tool-box");
	
	//this.html.main.appendChild(this.html.viewport);

	


}
ContentEditorModual.prototype.createTools=function(){
	if(this.getType()=="text"){
		this.html.clearButton = document.createElement("button");
		this.html.clearButton.classList.add("clear-text");
		this.html.clearButton.innerHTML="CLEAR";
		this.html.contentToolBox.appendChild(this.html.clearButton);

		this.html.clearButton.contentEditorObject=this;
		
	}
	// else if(this.getType()=="text-clickable"){
		
	// }
	else if(this.getType()=="audio"){
		//console.log(" AUDIO &&&&&&&&&&&&&&&&&&&&&&7")
		this.html.playButton = document.createElement("button");
		this.html.playButton.classList.add("Play");
		this.html.playButton.innerHTML="PLAY";
		this.html.contentToolBox.appendChild(this.html.playButton);

		this.html.playButton.contentEditorObject=this;

		// this.html.playButton.addEventListener("click",this.eventListenerPlay.bind(this));
		// this.html.playButton.removeEventListener("click",this.eventListenerPlay.bind(this));
		this.bindEventListenerPlay = this.eventListenerPlay.bind(this)
		this.html.playButton.addEventListener("click",this.bindEventListenerPlay);

		// console.log("*************************************************************************************************")
		// console.log(this.content);
		// console.log(this.content.properties)
		// console.log(this.content.properties[clipping])
		for(let property in this.content.properties){
			// console.log("----------------------------------------------------------------------------------------------------")
			// console.log(property)
			
			//this.html.contentToolBox.appendChild(this.content.properties[property].getBackEndHTML());
		}
		//this.html.playButton.removeEventListener("click",this.bindEventListenerPlay);

		//console.log(this.html.playButton)

		//this.html.playButton.removeEventListener("click",this.eventListenerPlay);

		
	}
}

// ContentEditorModual.prototype.drawUntilSourceStop=function(){


// 	console.log(this.content)
// 	this.content.audioObjectHandler.audioDisplay.updatePlayPosition();
// 	//console.log(this)
// 	if(true){
// 		setTimeout(this.drawUntilSourceStop.bind(this), 6);
// 	}
	
// }

ContentEditorModual.prototype.eventListenerPlay=function(){
	//console.log(this)
	//this.content.source=

	this.content.playSound();

	this.content.audioDisplay.continuousUpdatePlayBar()

	// console.log(Object.getOwnPropertyNames(this))
	this.html.playButton.removeEventListener("click",this.bindEventListenerPlay);
	// console.log(this)
	// console.log("should have removed event listener")
	//console.log(event_.target.contentEditorObject.content.source)
	//event_.target.removeEventListener()
	
}

ContentEditorModual.prototype.createViewport=function(){
	if(this.getType()=="text"){
		this.html.editor = document.createElement("textarea");
		
		this.html.editor.classList.add("text-editor");
		this.html.editor.value=this.getValue();
		this.html.viewport.appendChild(this.html.editor);
	}else if(this.getType()=="img" || this.getType()=="img-background"){
		this.html.image = document.createElement("img");
		this.html.image.style.width='100%';
		//this.html.image.style.height='100%';
		//console.log(this.getValue())
		this.html.image.src=this.getValue();
		this.html.viewport.appendChild(this.html.image);

		// this.html.editor = document.createElement("textarea");
		// //this.html.editor.onselect="return true;"
		// this.html.editor.classList.add("text-editor");
		// this.html.editor.classList.add("clickable");
		// this.html.viewport.appendChild(this.html.editor);

		// this.html.link = document.createElement("textarea");
		// this.html.link.classList.add("link");
		// this.html.link.classList.add("clickable");
		// //this.html.link.value=this.content.;
		// this.html.viewport.appendChild(this.html.link);

		// this.html.editor.value=this.getValue();
	}else if(this.getType()=="audio"){
		if(this.content.audioDisplay!=undefined){
			console.log("this.contentaudioObjectHandler.audioDisplay.getCanvaseWrap()")
			this.html.viewport.appendChild(this.content.audioDisplay.getCanvaseWrap());
		}
	}
}

ContentEditorModual.prototype.getToolBox=function(){
	return this.html.contentToolBox;
}


ContentEditorModual.prototype.getVeiwPort=function(){
	return this.html.viewport;
}

ContentEditorModual.prototype.updateVeiwPort=function(){
	this.overlay.updateVeiwPort();
}

ContentEditorModual.prototype.asignThisModual=function(){
	this.overlay.asignModual(this)
}
ContentEditorModual.prototype.display=function(condition_){
	this.overlay.display(condition_);
}
ContentEditorModual.prototype.save=function(){
	if(this.getType()=="text"){
		console.log(this.html.editor.value)
		this.content.content.value=this.html.editor.value;
		this.content.updateIconContent();
		this.content.createFrontEndHTML();
	}
}

ContentEditorModual.prototype.cancel=function(){
	this.html.editor.value=this.getValue();
}
