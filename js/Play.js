
function logActiveContentActions(){
	console.log("Active Video:")
	for(let id in currentStory.activeMainVideo){
		console.log(id + " : " + currentStory.activeMainVideo[id].html.fe.currentTime  + " - " + currentStory.activeMainVideo[id].isPlaying);
	}

	console.log("Active Audio:")
	for(let id in currentStory.activeMainAudio){
		console.log(id + " : " + currentStory.activeMainAudio[id].html.fe.currentTime + " - " + currentStory.activeMainAudio[id].isPlaying);
	}
}

function logActiveTimers(){
	for(let action in currentStory.currentScene.actionsLib){

		if(currentStory.currentScene.actionsLib[action].timer!=undefined){
			console.log(currentStory.currentScene.actionsLib[action].id);
			console.log(currentStory.currentScene.actionsLib[action].timer);
		}
	}
}

function pauseActiveTimers(){
	for(let action in currentStory.currentScene.actionsLib){

		if(currentStory.currentScene.actionsLib[action].timer!=undefined){
			currentStory.currentScene.actionsLib[action].timer.pause()
		}
	}
}


var currentStory;

var timeDelays={};

var cookie = new Cookie();

//var absoluteLocation="https://eyklein.github.io/TellMeAStory/";
var absoluteLocation="";


let drawInterval;
function draw(){
	


	
}

function startDraw(){
	if(drawInterval==undefined){
		drawInterval = setInterval(draw, 100);
	}
}
function stopDraw(){
	clearInterval(drawInterval)
	drawInterval=undefined;
}


window.AudioContext = window.AudioContext||window.webkitAudioContext;

var context = new AudioContext();

// function stopAudio(){

// 	for(let audioID in currentStory.activeMainAudio){
// 		currentStory.activeMainAudio[audioID].skip();
// 	}
// }

// function stopVideo(){

// 	for(let videoID in currentStory.activeMainVideo){
// 		currentStory.activeMainVideo[videoID].skip();
// 	}
// }

function clearTimeOut(){
	for(let listenerID in timeDelays){
		// console.log("REMOVING");
		// console.log(listenerID);
		clearTimeout(timeDelays[listenerID]);
	}
}

function playStory(){
  
  
}

class Story{
	constructor(){
		this.path="";//this will keep track of the path that has been taken
		this.sceneTimesArray=[];
		this.playing=false;
		this.audioCount=0;


		this.volume={};
		this.volume['main']=1;
		this.volume['background']=.2;
		this.currentScene=null;


		// this.mainVolume=1;
		// this.backgroundVolume=1;

		this.activeMainAudio={};
		this.activeBackgroundAudio={};

		this.activeMainVideo={};

		this.baseSceneNodes=[]
		this.rootEndNodes=[]


		this.scrollOrderArray=[];
		this.activePath=[];


		
		this.readingIsOn=true;
		this.pageTurnIsOn=true;
		this.captionsOn=true;

		this.muted=false;
		

		this.backgroundPlaying=false;

		
	}
	

	loadScenesLib(scenesData_){
		this.scenesLib={};

		//make scenes
	  	for(let i=0; i<scenesData_.length;i++){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  		this.scenesLib[scenesData_[i].id]=new Scene(scenesData_[i], this)
	  	}

	  	//add content to each scene
	  	for(let i=0; i<scenesData_.length;i++){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  		this.scenesLib[scenesData_[i].id].addContents(scenesData_[i]);
	  	}
	  	//add universal content to every scene
	  	if(this.scenesLib["uni"] != undefined){
	  		for(let sceneID in this.scenesLib){
	  			if(sceneID != "uni"){
	  				for(let contentID in this.scenesLib["uni"].contentsLib){

	  					this.scenesLib[sceneID].contentsLib[contentID] = this.scenesLib[sceneID].createContent(this.scenesLib["uni"].contentsLib[contentID].JSONData); //new ImageContent(this.scenesLib["uni"].contentsLib[contentID].JSONData,this.scenesLib[sceneID])
	  					this.scenesLib[sceneID].contentsLib[contentID].isCopyFromUni=true;


	  					//replace (unify) html
	  					this.scenesLib[sceneID].contentsLib[contentID].html = this.scenesLib["uni"].contentsLib[contentID].html //front end
	  					

	  					//console.log(this.scenesLib["uni"].contentsLib[contentID].effects)
	  					//replace effects
	  					this.scenesLib[sceneID].contentsLib[contentID].effects = this.scenesLib["uni"].contentsLib[contentID].effects
	  				}
	  			}
	  		}
	  	}

	  	//position the back end of every cNode
	  	for(let sceneID in this.scenesLib){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  		for(let contentID in this.scenesLib[sceneID].contentsLib){
	  			this.scenesLib[sceneID].contentsLib[contentID].addNodePosition()
	  		}
	  		this.scenesLib[sceneID].sudoContent.in.addNodePosition()
	  		for(let id in this.scenesLib[sceneID].sudoContent.out){
	  			this.scenesLib[sceneID].sudoContent.out[id].addNodePosition();
	  		}
	  		//this.scenesLib[sceneID].addContents(scenesData_[i]);
	  	}

	  	// this.cNode.addPosition(this.JSONData.backend)

	  	//add actions
	  	for(let i=0; i<scenesData_.length;i++){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  		this.scenesLib[scenesData_[i].id].addActions(scenesData_[i])
	  	}







	  

	  	


	  	// set which scenes lead into which scenes
	  	this.setLastAndNextSceneNodes();
	  	this.setSceneIndexNumbers();
	  	this.addScrollDivs();
	  	this.setSceneFullWidth()
	  	this.setRelativePositionIndex();
	  	this.setPositionIndex();
	  	this.setPosition();
	  	this.createPathsArrows();
	  	//this.setSceneNodePrevSiblings();
	  	// this.setSceneNodePositions();

	  	// this.setLeftOffsets();


	  		// set which content leads to which content
	  	//this.setLastAndNextContentNodes();

	  	//this.createScenesBackEnds();

	  	for(let id in this.scenesLib){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  		
	  		this.scenesLib[id].setBackEndActionAndContentPositions();
	  	}

	  	

	  	// for(let i=0; i<scenesData_.length;i++){//think about the order of loading. right now to goes through scene by scene maybe load all scens first and then do content
	  	// 	for(let id in this.scenesLib[scenesData_[i].id].contentsLib){
	  	// 		if(this.scenesLib[scenesData_[i].id].contentsLib[id] instanceof AudioContent){
		  // 			console.log(this.scenesLib[scenesData_[i].id].contentsLib[id].effects)
		  // 			console.log(this.scenesLib[scenesData_[i].id].contentsLib[id].effects.general.clipping)
		  // 		}
	  	// 	}

	  	// }






	}

	// clearScene(){
	// 	this.currentScene.clear();

	// 	this.clearActive();
	// }
	clearActive(){
		for(let id in this.activeMainVideo){

			this.activeMainVideo[id].stop();
		}
		for(let id in this.activeMainAudio){

			this.activeMainAudio[id].stop();
		}

		this.activeMainVideo={};
		this.activeMainAudio={};
	}



	restartScene(){
		this.currentScene.rewind();
	}



	endScene(){
		this.currentScene.goToEnd();
	}


	createScenesBackEnds(){
		for(let sceneID in this.scenesLib){
	  		this.scenesLib[sceneID].createSceneBackEnd();
	  	}
	}

	setContentIndexNumbers(){
		for(let sceneID in this.scenesLib){
	  		this.scenesLib[sceneID].setContentIndexNumbers();
	  	}
	}

	setContentFullWidth(){
		for(let sceneID in this.scenesLib){
	  		this.scenesLib[sceneID].setContentFullWidth();
	  	}
	}

	setLastAndNextSceneNodes(){
		for(let scene in this.scenesLib){
			for(let action in this.scenesLib[scene].actionsLib){
				if(this.scenesLib[scene].actionsLib[action].head instanceof Scene){
					let leadingScene = this.scenesLib[scene].actionsLib[action].scene;
					let trailingScene = this.scenesLib[scene].actionsLib[action].head;
					
					//set last scenes
					if(trailingScene.node.parents.indexOf(leadingScene.node) == -1){ 
						
						trailingScene.node.parents.push(leadingScene.node);

						trailingScene.node.parentsInfo[leadingScene.id]={};
						trailingScene.node.parentsInfo[leadingScene.id].count=1;
						trailingScene.node.parentsInfo[leadingScene.id].scene = leadingScene;
						trailingScene.node.parentsInfo[leadingScene.id].node = leadingScene.node;
						trailingScene.node.parentsInfo[leadingScene.id].order = trailingScene.node.parents.length-1;
					}
					else{
						trailingScene.node.parentsInfo[leadingScene.id].count++;
					}

					if(leadingScene.node.children.indexOf(trailingScene.node) == -1){

						leadingScene.node.children.push(trailingScene.node);

						leadingScene.node.childrenInfo[trailingScene.id]={};
						leadingScene.node.childrenInfo[trailingScene.id].count=1;
						leadingScene.node.childrenInfo[trailingScene.id].scene = trailingScene;
						leadingScene.node.childrenInfo[trailingScene.id].node = trailingScene.node;
						leadingScene.node.childrenInfo[trailingScene.id].order = leadingScene.node.children.length-1;
					
					}else{
						leadingScene.node.childrenInfo[trailingScene.id].count++;
					}

				}
			}
		}
	}


	setSceneIndexNumbers(){

		//find the scenes with no parent nodes those are the base nodes
		for(let scene in this.scenesLib){
			if(this.scenesLib[scene].node.parents==0 || scene == this.startingScene){
				//this.scenesLib[scene].index=0;

				this.scenesLib[scene].node.isBase=true;
				this.baseSceneNodes.push(this.scenesLib[scene].node);
				//console.log("#######*******************************###")

				//baseScenes.push(this.scenesLib[scene]);
				//baseScenes[this.scenesLib[scene].id]	
			}else{
				this.scenesLib[scene].node.isBase=false;
				//console.log("false")
			}
		}
		
		for(let i in this.baseSceneNodes){

			this.baseSceneNodes[i].assignDescendentsIndexes(0);
		}
	}

	addScrollDivs(){
		for(let i in this.scrollOrderArray){
			document.getElementById("scenes").append(this.scrollOrderArray[i].html.fe.container)
		}
	}


	setSceneFullWidth(){//sets the width the the children nodes will take up
		for(let i in this.rootEndNodes){
			this.rootEndNodes[i].setFullWidthCascadeUp(1)
		}
	}
	setRelativePositionIndex(){
		for(let i in this.scenesLib){
			this.scenesLib[i].node.setRelativePosition();
		}
	}
	setPositionIndex(){
		for(let i in this.baseSceneNodes){ //cascades down
			this.baseSceneNodes[i].setPositionIndex();
		}
	}
	setPosition(){
		for(let i in this.baseSceneNodes){ //cascades down
			this.baseSceneNodes[i].setPosition();
		}
	}
	createPathsArrows(){
		for(let key in this.scenesLib){ //cascades down
			this.scenesLib[key].node.createPathsArrows();
		}
	}
	
	setWidthSceneNodes(){

		for(let scene in this.scenesLib){
			this.scenesLib[scene].node.setWidth()
		}
		
	}
	
	loadAudio(){

		priorityAudioLoader.rankPriority();

		priorityAudioLoader.populateHistogram();

		priorityAudioLoader.loadBucket(0);
	}

	updatePlayPause(){
		this.windowManager.updatePlayPauseButton();
	}
	getStatus(){
		return this.currentScene.getStatus();
	}
	isPlaying(){
		return this.currentScene.isPlaying();
	}
	isPlayable(){
		return this.currentScene.isPlayable();
	}
	togglePlayPause(flash_){
		let status = this.getStatus()
		if(status=="playing"){
			this.pause(flash_);
		}else if(status == "paused"){
			this.play(flash_);
		}else{
			 scrollBy(20, true)
		}
	}

	executePlayPauseRewind(flash_){
		let status = this.getStatus()
		if(status=="playing"){
			this.pause(flash_);
			
		}else if(status == "paused"){
			this.play(flash_);
			// this.windowManager.flashPlay();
		}else if(status == "ended"){
			this.rewind();
		}
		

		//this.windowManager.updatePlayPauseButton()
	}


	// enablePlayPause(){
	// 	//this.play()//so that pause is shown
	// 	//console.log("enable play pause");
	// 	this.windowManager.play.style.display="none";
	// 	this.windowManager.pause.style.display="block";
	// }

	// disablePlayPause(){
	// 	// this.pause()//so that pause is shown
	// 	// console.log("disable play pause");
	// 	this.windowManager.play.style.display="block";
	// 	this.windowManager.pause.style.display="none";

	// }

	play(flash_){
		// console.log("PLAYING *********************")
		// this.updateVolume();

		// console.log("PLAYING!!!!!!!!")
		this.playing=true;
		startDraw();
		

		//restart all the action timers
		this.windowManager.displayPauseButton();

		for(let action in currentStory.currentScene.actionsLib){
			
			if(currentStory.currentScene.actionsLib[action].timer!=undefined){
				currentStory.currentScene.actionsLib[action].timer.resume();
			}
		}

		//mesures how far into scene we are threshhold
		if(this.currentScene.startTimer){
			this.currentScene.startTimer.resume();
		}

		this.currentScene.play();

		if(flash_){
			this.windowManager.flashPlay();
		}

		
	}

	enableNext(){
		this.windowManager.rightPanel.style.display="block";
	}

	disableNext(){

		this.windowManager.rightPanel.style.display="none";
		this.windowManager.shiftScenesLeft(false);
		console.log("DISABLE NEXT !!!")
	}

	backButton(){

		let wasPlaying = this.playing;
		if(this.currentScene.getPlayedTime() < 2000){
			this.currentScene.pause();
			let index = this.scrollOrderArray.indexOf(this.currentScene);
			index = Math.max(index,0);
			this.newScene(this.scrollOrderArray[index-1])
			// if(!wasPlaying){
			// 	this.pause()
			// }
		}else{
			this.rewind();
			// if(!wasPlaying){
			// 	this.pause()
			// }
		}
	}

	rewind(){
		this.currentScene.rewind();

		this.play();
	}

	pause(flash_){

		
		// this.playing=false;
		stopDraw();
		// console.log("DONE PLAYING!!!!!!!!")
		

	 	this.windowManager.displayPlayButton();
		
	 	// pause all the action timers
	 	for(let action in currentStory.currentScene.actionsLib){

			if(currentStory.currentScene.actionsLib[action].timer!=undefined){
				currentStory.currentScene.actionsLib[action].timer.pause();
			}
		}

		if(this.currentScene.startTimer){
			this.currentScene.startTimer.pause();
		}

		this.currentScene.pause();

		if(flash_){
			this.windowManager.flashPause();
		}
	}
	
	mute(){
		this.muted=true;
		this.currentScene.mute()
	}
	unmute(){
		this.muted=false;
		this.currentScene.unmute()
	}

	setMainVolume(volume_){
		
		
		//set volume for all the main audio
		this.volume['main']=volume_;
		this.currentScene.setVolume(volume_)
		// for(let audioContent in this.activeMainAudio){
		// 	//this.activeMainAudio[audioContent].setVolume(volume_);
		// 	this.activeMainAudio[audioContent].updateVolume();
		// }
		// for(let videoContent in this.activeMainVideo){
		// 	//this.activeMainAudio[audioContent].setVolume(volume_);
		// 	this.activeMainVideo[videoContent].updateVolume();
		// }
	}
	setBackgroundVolume(volume_){
		
		//set volume for all the main audio
		this.scenesLib['background'].contentsLib['799'].setVolume(volume_)
	}

	
	playBackground(){
		if(!this.backgroundPlaying){
			this.setBackgroundVolume(this.volume['background'])
			this.backgroundPlaying=true;
			this.scenesLib['background'].contentsLib['799'].play()
		}
	}
	pauseBackground(){
		this.backgroundPlaying=false;
		this.scenesLib['background'].contentsLib['799'].pause();
	}



	skip(){
		console.log(1)
		let maxSkipMade=0;

		this.pause();
		this.currentScene.started=true;
		
		if(this.currentScene.getStatus()=="ended"){
			this.windowManager.shiftScenesLeft(false);
			this.nextScene();
		}else{
			this.currentScene.skip(true);
		}
		
		this.play();



	}

	addEffectEditors(){
		for(let sceneKey in this.scenesLib){//this will create the divs for all the scenes. they could be created on each scene load
			this.scenesLib[sceneKey].addEffectEditors();//scene will cycle through each content (and action?) and create a div/span for each
		}
	}

	createScenesFrontEndHTMLs(){
		for(let sceneKey in this.scenesLib){//this will create the divs for all the scenes. they could be created on each scene load
			this.scenesLib[sceneKey].createFrontEndHTML();//scene will cycle through each content (and action?) and create a div/span for each
		}
	}
	createScenesContentEffectEditors(){
		for(let sceneKey in this.scenesLib){//this will create the divs for all the scenes. they could be created on each scene load
			this.scenesLib[sceneKey].createContentEffectEditors();//scene will cycle through each content (and action?) and create a div/span for each
		}
	}
	createScenesBackEndHTMLs(){
		for(let sceneKey in this.scenesLib){//this will create the divs for all the scenes. they could be created on each scene load
			this.scenesLib[sceneKey].createBackEndHTML();//scene will cycle through each content (and action?) and create a div/span for each
		}
	}
	// createProperties(){
	// 	for(let sceneKey in this.scenesLib){//this will create the divs for all the scenes. they could be created on each scene load
	// 		this.scenesLib[sceneKey].createProperties();//scene will cycle through each content (and action?) and create a div/span for each
	// 	}
	// }
	applyProperties(){
		for(let sceneKey in this.scenesLib){//this will create the divs for all the scenes. they could be created on each scene load
			this.scenesLib[sceneKey].applyProperties();//scene will cycle through each content (and action?) and create a div/span for each
		}
	}


	displayScene(autoPlay_){
		this.currentScene.display(autoPlay_);
	}

	// playCurrentScene(autoPlay_){
	// 	this.currentScene.start(autoPlay_);
	// }

	displayAll(){
		for(let id in this.scenesLib){
			this.scenesLib[id].display();
		}
	}

	nextScene(){
		this.newScene(this.scrollOrderArray[this.scrollOrderArray.indexOf(this.currentScene) + 1],true);
		// console.log("next Sceene")
	}



	//loads the new scene and tracks path (maybe just use this to start and track elseware?)
	newScene(newScene_, autoPlay_,type_){


		this.windowManager.shiftScenesLeft(false);

		if(newScene_ instanceof Scene){

			this.sceneTimesArray.push(
			{
				"scene":newScene_.id,
				"time":Date.now()
			});


			if(type_=="default" || type_==undefined){

				this.activePath.push(newScene_);
			}else if(type_=="back"){
				this.activePath.splice(this.activePath.indexOf(newScene_)+1);
			}else if(type_=="goTo"){
				//fill in with primary parents??
			}

			// if(this.uniqueSceneOrder.length ==0 || this.uniqueSceneOrder[this.uniqueSceneOrder.length-1] != newScene_){
			// 	this.uniqueSceneOrder.push(newScene_);
			// }
			

			//if(newScene_.id != "CONSTRUCT" && newScene_.id != "INSTUCTIONS" && newScene_.id != "INTRO"){
				cookie.set("scene", newScene_.id)
			// }else{
			// 	cookie.delete("scene")
			// }
			

			this.currentScene=newScene_;
			this.currentScene.entrance();

			if(this.currentScene.getPlayedTime()>1000){
				this.currentScene.rewind();
			}

			if(this.readingIsOn == true){
				this.currentScene.closeTextBox()
			}



			dataLayer.push({
				'pathScenes': newScene_.id,
				'pathTimes': Date.now(),
				'sceneTimesArray':this.sceneTimesArray,
				'event':'newScene'
			});

			

			// this.playCurrentScene(autoPlay_);
			if(this.currentScene.getPlayedTime()>300){
				this.currentScene.clear();
			}
			
			
			// if(!this.currentScene.started){
				this.currentScene.start(autoPlay_);
			// }
			console.log(newScene_)
			console.log(newScene_.name)
			this.windowManager.updateScrollThumbPage(newScene_.name);

			this.currentScene.play();



		}else if(typeof(newScene_) == "string"){
			this.newScene(this.scenesLib[newScene_],autoPlay_,type_)
		}


	}

	start(){
		console.log("start")
		// console.log("StartingScene: " + this.startingScene)
		this.newScene(this.startingScene, false,"default");

		//currentStory.windowManager=new WindowManager();
		
		this.windowManager.createMainButtons();


		//this.pause();
		//delaying the removal of the loading screen prevent it from flashing black ????

		
		setTimeout(function(){loadScreen.hide()},300);
		setTimeout(function(){this.pause()}.bind(this),400);
		//updateContentSize();
	}

	resumeScene(scene_, wasPlaying_){
		// console.log("resumeScene")
		currentStory.currentScene = scene_;

		this.windowManager.shiftScenesLeft(false)

	  			
		if(currentStory.currentScene.started == false){
			currentStory.currentScene.start();
		}else if(currentStory.currentScene.getStatus()=="ended"){
			currentStory.currentScene.rewind();
		}

		if(wasPlaying_){
			currentStory.currentScene.play();
		}
		

		currentStory.windowManager.updatePlayPauseButton()
	}

	// hideCaptions(){
	// 	for(let id in this.scenesLib){
	// 		this.scenesLib[id].hideCaptions();
	// 	}
	// 	this.captionsOn=false;

	// }
	// showCaptions(){
	//   for(let id in this.scenesLib){
	// 		this.scenesLib[id].showCaptions();
	// 	}
	// 	this.captionsOn=true;
	// }

	turnCaptionsOn(isOn_){
		if(isOn_){
			for(let id in this.scenesLib){
				this.scenesLib[id].showCaptions();
			}
			this.captionsOn=true;
		}else{
			for(let id in this.scenesLib){
				this.scenesLib[id].hideCaptions();
			}
			this.captionsOn=false;
		}
	}

	pageTurnOn(isOn_){
		this.pageTurnIsOn=isOn_;
	}

	// pageTurnOff(){
	// 	this.pageTurnIsOn=false;
	// }
	turnReadingOn(){
		this.unmute();
		this.currentScene.turnReadingOn()
		this.readingIsOn=true;

		// if(this.windowManager.html.readingSwitch.checked==false){
		// 	this.windowManager.html.readingSwitch.checked=true;
		// }
	}
	turnReadingOff(){
		// this.windowManager.turnReadingOff()

		this.mute();
		this.currentScene.turnReadingOff()
		this.readingIsOn=false;



		// if(this.windowManager.html.readingSwitch.checked==true){
		// 	this.windowManager.html.readingSwitch.checked=false;
		// }
	}

	turnReadingSettingsOn(){

	}

	turnReadingSettingsOff(){

	}

	setCurrentScene(scene_){
		if(this.scrollOrderArray.indexOf(scene_)>=1){
			currentStory.playBackground();
		}else{
			currentStory.pauseBackground();
		}
	}





	getJSON(){
		let jsonPlay={}
		jsonPlay.startingScene=this.startingScene;
		jsonPlay.scenes=[];
		let index=0;
		for(let id in this.scenesLib){
		 	jsonPlay.scenes[index]=this.scenesLib[id].getJSON()
		 	index++;
		}

		return jsonPlay;

	}
	saveJSON(){
		//(content, fileName, contentType) {
	    download("scenes_" + Date.now() + ".json",JSON.stringify(this.getJSON())); 
	}
};










function changeMainTextLocationLeft(left_){
	document.getElementById("main_text").style.left = left_+"px";
}
function changeMainTextLocationTop(top_){
	document.getElementById("main_text").style.top = top_+"px";
}
function changeMainTextLocation(left_,top_){
	
	document.getElementById("main_text").style.left = left_+"px";
	document.getElementById("main_text").style.top = top_+"px";
}

function clearMainText(){
	document.getElementById("main_text").innerHTML = "";
}



// let d = new Date();
// document.body.innerHTML = "<h1>Today's date is " + d + "</h1>";



var dataLoaded=false;
// fetch(absoluteLocation + "json/scenes.json")
// 	.then(function(resp){
// 		return resp.json();
// 	}).catch(function(resp){
// 		console.log("error while loading json ")
// 		console.log(resp)
// 	}).then(function(data){
// 		//console.log(data.scenes)
		
// 		//currentStroy.startingScene = data.startingScene;
		
// 		window.onload.data=data;
// 		dataLoaded=true;
		

// 		//console.log("loading scen data");

	
// 		if(pageLoaded){//if the page is already loaded otherwise do this on page load

// 			//console.log("pageLoaded loaded first then dataLoaded")
// 			currentStory.startingScene = data.startingScene;
// 			populateStory(data.scenes)

// 			currentStory.loadAudio();
// 			// for(let audioUrl in priorityAudioLoader.files){
// 			// 	console.log(audioUrl)
// 			// 	priorityAudioLoader.files[audioUrl].load();
// 			// }

// 			// currentStory.loadScenesLib(data.scenes);//one or the other
			
// 			// currentStory.createScenesFrontEndHTMLs();
// 		}

// loadJSONTranscriptFile("text/transcript.json");		
// function loadJSONTranscriptFile(fileLoc_){
// 	fetch(absoluteLocation + fileLoc_)
// 		.then(function(resp){
// 			return resp.json();
// 		}).catch(function(resp){
// 			console.log("error while loading json ")
// 			console.log(resp)
// 		}).then(function(data){
// 			//console.log(data.scenes)
			
// 			//currentStroy.startingScene = data.startingScene;
// 			console.log(data)
// 			//window.onload.data=data;
// 			//dataLoaded=true;
			

// 			//console.log("loading scen data");

		
// 			// if(dataType_=="transcript"){
// 			// 	console.log(data);
// 			// }

// 		}).catch(function(resp){
// 			console.log("error while loading scene")
// 			console.log(resp)
// 		}).then(function(data){
			
// 			// console.log(currentStory)
// 			//currentStory.start();
// 			// reading.start();
// 		}).catch(function(resp){
// 			console.log("error while starting play")
// 			console.log(resp)
// 		})
// }		
		

		

// 	}).catch(function(resp){
// 		console.log("error while loading scene")
// 		console.log(resp)
// 	}).then(function(data){
		
// 		// console.log(currentStory)
// 		//currentStory.start();
// 		// reading.start();
// 	}).catch(function(resp){
// 		console.log("error while starting play")
// 		console.log(resp)
// 	})

var transcript;
loadJSONFile("text/transcript.json","transcript");	








// 

function loadJSONFile(fileLoc_, dataType_){
	fetch(absoluteLocation + fileLoc_)
		.then(function(resp){
			return resp.json();
		}).catch(function(resp){
			console.log("error while loading json ")
			console.log(resp)
		}).then(function(data){
			//console.log(data.scenes)
			
			//currentStroy.startingScene = data.startingScene;
			if(dataType_=="scenesFile"){
				window.onload.data=data;
				dataLoaded=true;
			


		
			if(pageLoaded){//if the page is already loaded otherwise do this on page load

					//console.log("pageLoaded loaded first then dataLoaded")
					currentStory.startingScene = data.startingScene;
					populateStory(data.scenes)

					currentStory.loadAudio();
					
				}
			}

			else if(dataType_=="transcript"){
				loadJSONFile("json/scenes.json","scenesFile");
				transcript = new Transcriptor(data);
			}

		}).catch(function(resp){
			console.log("error while loading scene")
			console.log(resp)
		}).then(function(data){
			
			// console.log(currentStory)
			//currentStory.start();
			// reading.start();
		}).catch(function(resp){
			console.log("error while starting play")
			console.log(resp)
		})
}




const drawLineSegment = (ctx, x, y, width, isEven) => {
  ctx.lineWidth = 1; // how thick the line is
  ctx.strokeStyle = "#fff"; // what color our line is
  ctx.beginPath();
  y = isEven ? y : -y;
  ctx.moveTo(x, 0);
  ctx.lineTo(x, y);
  ctx.arc(x + width / 2, y, width / 2, Math.PI, 0, isEven);
  ctx.lineTo(x + width, 0);
  ctx.stroke();
};

