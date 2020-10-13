// // function allowDrop(ev) {
// // 		console.log("allow drop")
// // 		ev.preventDefault();
// //  }

// //  function dragStart(ev) {
// //  	console.log(ev)
// //  	console.log(ev.target)
// //  	// ev.preventDefault();

// //  	ev.target.style.left=ev.mouseX+"px"
    

// //     ev.dataTransfer.setData("Text", ev.target.id);

// //     ev.dataTransfer.setDragImage(document.createElement("div"), 0, 0);
// //  }



// //   function dragging(ev) {
// //   	ev.preventDefault()
// //  	console.log("dragging")
// //  }


// //  function drop(ev) {
// //  	console.log(" drop!!!!")
// //      ev.preventDefault();
// //      var data = ev.dataTransfer.getData("Text");
// //      var element = document.getElementById(data);

// //      var style = window.getComputedStyle(element);
// //      var top = parseInt(style.top.replace("px"));
// //      var left = parseInt(style.left.replace("px"));

// //      top += ev.offsetY;
// //      left += ev.offsetX;

// //      element.style.top = top + "px";
// //      //No X-axis movement...
// //      //element.style.left = left + "px";
// //  }

// class KeyContent extends Content{
// 	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
// 		super(contentJson_,parentScene_)
		
// 		this.htmlParent={};

// 		this.name="key";
		
// 		this.keys=this.content.keys;
// 		this.function=this.content.function;
		
// 		this.type="key";
// 		this.cNode=new ContentNode(this);
// 	}


// 	// reset(){
// 	// 	// if(!this.html.fe.paused){
// 	// 	// 	this.html.fe.pause();
// 	// 	// }
// 	// 	// this.html.fe.currentTime=this.start+.1;
// 	// 	this.delete();
// 	// 	this.createFrontEndHTML();
// 	// 	this.applyEffects();
// 	// }
// 	// delete(){
// 	// 	this.html.fe.remove()
// 	// }

// 	createFrontEndHTML(){
		

// 		this.html={}
// 		this.html.fe=document.createElement("div");

		
// 	}

	


// 	createEffects(){
		
		
	
// 	}


// 	applyEffects(){
		
		
// 	}

// 	remove(){

// 	}
	
	

// 	displayFrontEndHTML(){

// 		addKeyFunction()



		
		
// 	}

// }