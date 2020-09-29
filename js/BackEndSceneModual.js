function BackEndSceneModual(scenes_,backEnd_){
	//console.log(scene_)
	this.backEnd=backEnd_;
	this.scenesLib=scenes_;
	this.createHTML();
	// this.nestHTML();
	this.addHTMLToScene();
	this.adjustPos();


}

BackEndSceneModual.prototype.addHTMLToScene=function(){
	for(let code in this.scenesLib){
		this.scenesLib[code].addHTMLtoSceneContainer()
	}
}

BackEndSceneModual.prototype.display=function(scene_){
	//console.log(2)
	console.log(scene_.getBackEndHTML())
	this.backEnd.replaceContent(scene_.getBackEndHTML());

}

BackEndSceneModual.prototype.adjustPos=function(){

	for(let code in this.scenesLib){
		this.scenesLib[code].adjustPosBEInScene()
	}

}

// BackEnd.prototype.adjustPos=function(adjustmentObject_){
// 	if(adjustmentObject_ instanceof Scene){
// 		for(let i=0;i<adjustmentObject_.actions.length;i++){
// 			this.adjustPos(adjustmentObject_.actions[i])
// 		}
// 	}else if(adjustmentObject_ instanceof Action){
// 		adjustmentObject_.backEndAdjustPos();
// 	}
// }




// BackEndSceneModual.prototype.nestHTML=function(){
// 	for(let code in this.scenesLib){
// 		this.scenesLib[code].nestHTMLElementsBE()
// 	}

// }
BackEndSceneModual.prototype.createHTML=function(){
	//creates divs for all scenes
	for(let code in this.scenesLib){
		let sceneTemp = this.scenesLib[code];

		//creates a div for the scene
		sceneTemp.createBackEndHTML()

		//what follows could be moved into each individual scene
		
		//create empty div for content
		for(let id in sceneTemp.contentsLib){
			sceneTemp.contentsLib[id].createBackEndHTML()
			//?????????????????????---
			//sceneTemp.contentsLib[id].updateIconContent();
		}

		//create empty div for actions
		for(let id in sceneTemp.actionsLib){
			sceneTemp.actionsLib[id].createBackEndHTML();
		}

		//combine actions and content
		for(let id in sceneTemp.actionsLib){
			
			sceneTemp.actionsLib[id].addHTMLElementsToContentDiv();
		}

	}
}
BackEndSceneModual.prototype.updateIconContent=function(){
	//creates divs for all scenes
	for(let code in this.scenesLib){
		let sceneTemp = this.scenesLib[code];

		
		//create empty div for content
		for(let id in sceneTemp.contentsLib){
			sceneTemp.contentsLib[id].updateIconContent();
		}
	}

}
BackEndSceneModual.prototype.getTopButtons=function(){

	
	return this.html.topButtonsSpan;

}

BackEndSceneModual.prototype.createTopButtons=function(){

	//this.createSceneModuals();

	this.html={}
	this.html.topButtonsSpan=document.createElement("span");
	
	for(let code in this.scenesLib){

		this.scenesLib[code].createBackEndButton();

		this.html.topButtonsSpan.appendChild(this.scenesLib[code].html.be.sceneButton);
	}
	//return html;

}

BackEndSceneModual.prototype.getTopButtons=function(){

	//this.createSceneModuals();

	return this.html.topButtonsSpan;

}
