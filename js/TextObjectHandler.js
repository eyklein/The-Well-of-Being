// function TextObjectHandler(text_, content_, propertiesJSON){
// 	this.content=content_;

// 	this.html={};
// 	//this.html.be={};//back end
// 	this.html.fe={};//front end

// 	this.properties={}
// 	for(let propertyType in propertiesJSON_){
// 		this.properties[propertyType]=new ContentProperty(propertiesJSON_[propertyType],this);
// 	}
// }

// TextObjectHandler.prototype.createBackEndHTML=function(){
// 	this.html.be={};
	
// 	this.html.be.container = document.createElement("div");
// 	this.html.be.container.classList.add("content-container");
// 	this.html.be.container.classList.add("content-" + this.content.id);
// 	this.html.be.container.classList.add("content-" + this.content.content.type);

// 	this.html.be.divIcon = document.createElement("div");
// 	this.html.be.divIcon.classList.add("content-icon");
	
// 	this.html.be.divIcon.contentObject=this;
// 	this.html.be.divIcon.testVareable="whatsikfados nifads";
// 	this.html.be.divIcon.onmouseover = function(event_){
// 		//console.log(event_)

// 		getParentWithProperty(event_.target,"contentObject").contentObject.addClassUp("infocus",true)


// 	};
	
// 	this.html.be.divIcon.onmouseout = function(event_){

// 		getParentWithProperty(event_.target,"contentObject").contentObject.removeClassUp("infocus",true)
		
// 	};

// 	this.html.be.divIcon.ondblclick  = function(event_){
// 		//console.log(event_.target.contentObject)
// 		//let thisTargetObject
// 		// while(thisTargetObject==undefined){
// 		 	let thisTargetObject=getContentObject(event_.target);

// 		 	//console.log(thisTargetObject)
// 		// }
// 		//thisTargetObject.contentEditorOverlay.asignContent(thisTargetObject.contentEditorModual);


// 		//right now I am doing create Content twice. once on page load and again on click
// 		thisTargetObject.contentEditorModual.html.viewport.innerHTML=""
// 		thisTargetObject.contentEditorModual.asignThisModual()
// 		thisTargetObject.contentEditorModual.updateVeiwPort();
// 		thisTargetObject.contentEditorModual.createViewport()
// 		thisTargetObject.contentEditorModual.display(true);

// 		//currentPlay.contentEditorOverlay.display()

// 		//event_.target.contentObject.contentEditor.display(true);
// 	};




// 	this.html.be.container.appendChild(this.html.be.divIcon)

	

// 	this.html.be.iconDragBar = document.createElement("div");
// 	this.html.be.iconDragBar.classList.add("draggable-bar");
// 	this.html.be.container.appendChild(this.html.be.iconDragBar)
// 	this.html.be.iconDragBar.contentObject=this;
// 	// this.html.be.iconDragBar.addEventListener("drag",function(){
// 	// 	console.log("dragging")
// 	// })





// 	this.html.be.iconDragBar.onmousedown = function(event_) { // (1) start the process

// 	  	startMoveAt(event_.pageX, event_.pageY, this.contentObject);

// 	  	// centers the ball at (pageX, pageY) coordinates
// 	  	function startMoveAt(pageX_, pageY_, object_) {
// 	  		// console.log(object)
// 	  		// console.log("x: " + pageX + "     y: "+ pageY)
// 	  		mouseDragTempObj.mouseDownPos={}

// 	  		mouseDragTempObj.mouseDownPos.x=pageX_;
// 	  		mouseDragTempObj.mouseDownPos.y=pageY_;

// 	  		mouseDragTempObj.prev={};
// 	  		mouseDragTempObj.prev.y=pageY_;

// 	  		//mouseDragTempObj.actionHieght=

// 	  		// mouseDragTempObj.containerPos.x=parseInt(object.html.be.container.style.left);
// 	  		// mouseDragTempObj.containerPos.y=parseInt(object.html.be.container.style.top);



// 	  		mouseDragTempObj.object=object_;
// 	    	// object.html.be.container.style.left = pageX  + 'px'; //- this.html.be.iconDragBar.offsetWidth / 2
// 	  	  // 	object.html.be.container.style.top = pageY  + 'px'; //- this.html.be.iconDragBar.offsetHeight / 2
	  	

// 	  	}

// 	  	//function moveAt(pageX, pageY) {
// 	  	function moveAt(deltaY_) {
// 	  		//console.log(mouseDragTempObj)
// 	  		//mouseDragTempObj.object.html.be.container.style.top=mouseDragTempObj.containerPos.y + pageY - mouseDragTempObj.mouseDownPos.y + "px";
// 	  		//mouseDragTempObj.object.actionsIn[0].changeActionDelay(pageY - mouseDragTempObj.mouseDownPos.y);
	  		



// 	  		//mouseDragTempObj.object.actionsIn[0].deltaActionDelay(pageY - mouseDragTempObj.prev.y);
// 	  		mouseDragTempObj.object.actionsIn[0].deltaActionDelay(deltaY_);
// 	  		//mouseDragTempObj.prev.y=pageY;
// 	  		//mouseDragTempObj.containerPos.y + 

// 	  		// console.log(object)
// 	  		// console.log("x: " + pageX + "     y: "+ pageY);


// 	  		//object.html.be.container.style.left = pageX  + 'px'; //- this.html.be.iconDragBar.offsetWidth / 2
// 	  	  	//object.html.be.container.style.top = pageY -mouseDragPos.start.y  + 'px'; //- this.html.be.iconDragBar.offsetHeight / 2

// 	    	// object.html.be.container.style.left = pageX  + 'px'; //- this.html.be.iconDragBar.offsetWidth / 2
// 	  	  // 	object.html.be.container.style.top = pageY  + 'px'; //- this.html.be.iconDragBar.offsetHeight / 2
	  	

// 	  	}

// 	  	function onMouseMove(event_, text_) {
// 	  		//console.log(this)
// 	    	moveAt(event_.pageY-mouseDragTempObj.prev.y);
// 	    	mouseDragTempObj.prev.y=event_.pageY;
// 	  	}

// 		// (3) move the ball on mousemove
// 		document.addEventListener('mousemove', onMouseMove);

// 	  	// (4) drop the ball, remove unneeded handlers
// 	  	// this.contentObject.html.be.iconDragBar.onmouseup = function() {
// 	  	window.onmouseup = function() {
// 	  		//console.log("remove event listener")
// 	  		//also need to remove 
// 		    document.removeEventListener('mousemove', onMouseMove);
// 		    window.onmouseup = null;
// 		};

// 	};
	

	
	
	
// }
