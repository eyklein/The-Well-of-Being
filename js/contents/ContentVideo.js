let priorityVideoLoader=new PriorityLoader();

class VideoContent extends MediaContent{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)
		this.isDonePlaying=false;
		this.isPlaying=false;
		this.start=0;
		this.duration=0;

		this.name=this.content.value;
	
		this.loadVideo(absoluteLocation + this.content.value)

		this.loop=false
		this.type="video";
		this.cNode=new ContentNode(this);

		this.backEndCreated=false;
	    this.videoLoaded=false

	    this.boundDonePlayingEvent=this.donePlayingEvent.bind(this)

	    this.stopPanBound=this.stopPan.bind(this)
	    this.startPanBound=this.startPan.bind(this)

	   	

	}

	reset(){
		this.unplay();
		this.createFrontEndHTML()
		// super.reset();
		this.isDonePlaying=false;
	}

	

	
	end(){
		// if(!this.html.fe.paused){
		// 	this.html.fe.pause();
		// }
		// console.log(this);
		// console.log(this.start)
		// console.log(this.duration)
		this.stop();

	}

	// setVolume(volume_){
	// 	this.html.fe.volume=volume_;
	// }



	getEffect(effectName_,effectJSON_){
		//console.log("getEffect ************")
		if(effectName_=="position"){
			return new PositionImageEffect(effectJSON_,this)
		}else if(effectName_=="glow"){
			return new GlowImageEffect(effectJSON_,this)
		}else if(effectName_=="replace"){
			return new ReplaceImageEffect(effectJSON_,this)
		}else if(effectName_=="opacity"){
			return new OpacityImageEffect(effectJSON_,this)
		}else if(effectName_=="hide"){
			return new HideImageEffect(effectJSON_,this)
		}else if(effectName_=="translate"){
			return new TranslateImageEffect(effectJSON_,this)
		}else if(effectName_=="link"){
			return new LinkImageEffect(effectJSON_,this)
		}else if(effectName_=="z-index"){
			return new ZIndexEffect(effectJSON_,this)
		}
		else{
			return new ImageEffect(effectJSON_,this)
		}
	}


	createEffects(){
		//console.log("createEffects **********!!!!!**")
		//console.log("createEffects image");
		for(let effect in this.JSONData.effects.general){
			this.effects.general[effect] = this.getEffect(effect,this.JSONData.effects.general[effect])
		}

		this.effects.clickable.generic={}
		for(let effect in this.JSONData.effects.clickable.generic){
			this.effects.clickable.generic[effect]=this.getEffect(effect, this.JSONData.effects.clickable.generic[effect]);
		}
		this.effects.clickable.hover={}
		for(let effect in this.JSONData.effects.clickable.hover){
			this.effects.clickable.hover[effect]=this.getEffect(effect, this.JSONData.effects.clickable.hover[effect]);
		}
		this.effects.clickable.pressed={}
		for(let effect in this.JSONData.effects.clickable.pressed){
			this.effects.clickable.pressed[effect]=this.getEffect(effect, this.JSONData.effects.clickable.pressed[effect]);
		}
		this.effects.hover={}
		for(let effect in this.JSONData.effects.hover){
			this.effects.hover[effect]=this.getEffect(effect, this.JSONData.effects.hover[effect]);
		}
		this.effects.pressed={}
		for(let effect in this.JSONData.effects.pressed){
			this.effects.pressed[effect]=this.getEffect(effect, this.JSONData.effects.pressed[effect]);
		}
		this.effects.entrance={}
		for(let effect in this.JSONData.effects.entrance){
			this.effects.entrance[effect]=this.getEffect(effect, this.JSONData.effects.entrance[effect]);
		}
		this.effects.exit={}
		for(let effect in this.JSONData.effects.exit){
			this.effects.exit[effect]=this.getEffect(effect, this.JSONData.effects.exit[effect]);
		}

		this.cNode.update();
	
	}

	loadVideo(url_){

		// console.log("LOAD VIDEO HERE!!!!!!!!!!!!!!!!!!!")
		// if(priorityVideoLoader.files[url_]==undefined){
		// 	priorityVideoLoader.files[url_]=new VideoLoader(url_,this);
		// }else{
		// 	priorityVideoLoader.files[url_].addContentVideo(this)
		// }
	}

	//this.frontEndLoaded=false;

	createFrontEndHTML(){
		super.createFrontEndHTML();
		if(!this.html.fe.created){
				this.html.fe.created=true;
				this.frontEndCreated=true;

				let fileType=this.content.value;
				fileType=fileType.split('.');
				fileType=fileType[fileType.length-1];
		
				// if(fileType=="mov" || fileType=="mp4"){
				// 	this.html.fe = document.createElement("video");
				// }else{
				// 	this.html.fe = document.createElement("img");
				// }
				this.html.container=document.createElement("div");
				this.html.fe = document.createElement("video");

				this.html.container.append(this.html.fe)
				
				this.html.fe.setAttribute('draggable', false);
				//console.log(this.id)
				this.html.fe.id=this.id;
				//this.html.fe.onmousedown = 'return false';
				this.addEffects();

				
				this.html.fe.ondurationchange = function(e) {
					// console.log("++++");
					this.duration=this.html.fe.duration;
				}.bind(this);
				

				this.html.fe.src=absoluteLocation + this.content.value;
				

				
				// this.html.fe.onload =function(){ // can only adjust the size after it is loaded and therefore knows the natural size
					
				// 	this.adjustSize();
				// 	console.log("VIDEO LOADED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
				// 	console.log(this.html.fe.duration);
				// 	this.duration=this.html.fe.duration;
				// 	this.html.fe.onload=null;
				// }.bind(this)


				this.html.fe.addEventListener('ended', this.boundDonePlayingEvent);

				this.html.fe.addEventListener('pause', function(e){
					if(this.html.fe.currentTime>=(this.start+this.duration)){
						//force ended event
						let event = new Event('ended');
						this.html.fe.dispatchEvent(event);
					}
				}.bind(this));





				this.html.progressContainer=document.createElement("div");
				this.html.progressContainer.classList.add("progressContainer");

				this.html.progressBar=document.createElement("div");
				this.html.progressBar.classList.add("progressBar");
				this.html.progressSpan=document.createElement("div");
				this.html.progressSpan.classList.add("progressSpan");

				this.html.progressContainer.append(this.html.progressBar)
				this.html.progressBar.append(this.html.progressSpan);

				this.html.container.append(this.html.progressContainer)

				// this.updateProgressBound=this.
				this.html.fe.addEventListener("timeupdate", this.updateProgress.bind(this), false);

				this.html.progressBar.addEventListener("mousedown", this.startPanBound.bind(this), false);




				this.html.progressContainer.addEventListener("mouseover", function(){
					console.log("mouse in")
					document.getElementById("bottom-bar").classList.add("visible");
				}, false);


				this.html.progressContainer.addEventListener("mouseout", function(){
					console.log("mouse out")
					document.getElementById("bottom-bar").classList.remove("visible");
				}, false);
				

				
		
		}
		

	}


	updateProgress() {
	   var video=this.html.fe;
	   var progress = this.html.progressSpan;
	   var value = 0;
	   if (video.currentTime > this.start) {
	      value = Math.floor((100 / this.duration) * video.currentTime);
	   }
	   progress.style.width = value + "%";
	}

	startPan(e){
		currentStory.pause();
		this.html.progressBar.addEventListener("mouseleave", this.stopPanBound, false);
		this.html.progressBar.addEventListener("mouseup", this.stopPanBound, false);
		
		if(this.parentScene.playingMediaObjects.indexOf(this)==-1){
			this.parentScene.playingMediaObjects.push(this)
		}

		var skipBack = (e.clientX/document.width)*this.duration+this.start - this.html.fe.currentTime;
		// console.log(skipBack);
		// this.parentScene.skipAmount(skipBack);
		this.html.fe.currentTime = (e.clientX/document.width)*this.duration+this.start;
	}

	stopPan(){
		this.html.progressBar.removeEventListener("mouseleave", this.stopPanBound, false);
		this.html.progressBar.removeEventListener("mouseup", this.stopPanBound, false);
		currentStory.play();
	}

	addEffects(){
		//console.log("this.createEffects();")
		this.createEffects();
		
		this.applyGeneralEffects();
	}


	donePlayingEvent(){
		this.endTime=this.parentScene.timePlayingScene;
		this.removeFromActiveVideo();
		this.isDonePlaying=true;
	}





	display(){
		super.display();
		this.htmlParent.append(this.html.container);
		this.applyEntranceEffects();
		//this.html.fe.style.display="block";
		// this.html.fe.style.preload="metadata";//show first frame

		
		this.html.fe.currentTime=.09;




		

		this.activateOnEndEvents()


	}

	undisplay(){
		super.display();
		// this.html.fe.remove()
		this.htmlParent.removeChild(this.html.fe);
		//this.unapplyEntranceEffects(); //???

	}
	
	skip(skipTime_){
		if(skipTime_==null){
			this.html.fe.currentTime=this.html.fe.duration;
		}else{
			this.html.fe.currentTime += skipTime_;
		}

	}
	pan(percent_){
		this.html.fe.currentTime=(percent_*parseFloat(this.html.fe.duration));
	}
	removeFromActiveVideo(){
		// console.log("REMOVE!!!!!!!")
		//story
		// delete currentStory.activeMainVideo[currentStory.currentScene.id+this.id];

		//scene
		this.parentScene.playingMediaObjects.splice(this.parentScene.playingMediaObjects.indexOf(this),1);

		//currentStory.updatePlayPause()
	}

	addToActiveVideo(){
		// currentStory.activeMainVideo[currentStory.currentScene.id+this.id]=this;


		if(this.parentScene.playingMediaObjects.indexOf(this) == -1){
			this.parentScene.playingMediaObjects.push(this)
		}
		
		currentStory.updatePlayPause()
	}

	removeFromActiveVideo(){
		// currentStory.activeMainVideo[currentStory.currentScene.id+this.id]=this;


		if(this.parentScene.playingMediaObjects.indexOf(this) != -1){
			this.parentScene.playingMediaObjects.splice(this.parentScene.playingMediaObjects.indexOf(this),1);
		}
		
		currentStory.updatePlayPause();
	}



	play(){
		if(this.parentScene.playingMediaObjects.indexOf(this)==-1){
			this.parentScene.playingMediaObjects.push(this)
		}
		this.isPlaying=true;
		if(this.startTime == undefined){
			this.startTime=this.parentScene.timePlayingScene;
		}
		// this.html.fe.play();

		this.playPromise = this.html.fe.play();

	  	if (this.playPromise !== undefined) {
	    	this.playPromise.then(_ => {
		      	// Automatic playback started!
		      	// Show playing UI.
		      	this.addToActiveVideo();
		      	// console.log("Video Playing!!!")
		    })
		    .catch(error => {
		      	// Auto-play was prevented
		     	// Show paused UI.
		     	console.log("Video ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		    });
		}

		
	}
	unplay(){ //movie at start
		this.html.fe.currentTime=this.start;
		this.pause();

	}
	
	// stop(){ //movie at end
	// 	if(this.html.fe.duration){
	// 		this.html.fe.currentTime=this.start + this.html.fe.duration;
	// 	}else{
	// 		console.log("durration is not defined")
	// 		console.log(this.html)
	// 	}
	// 	this.pause();
	// }

	pause(){
		this.isPlaying=false;
		this.html.fe.pause();


	}

	adjustSize(){ //????
		this.html.fe.style.width=(this.html.fe.naturalWidth / 1920)*100 + "%";
	}


	




}



// currentStory.currentScene.contentsLib[901].html.fe.onmousemove=function(e){currentStory.currentScene.contentsLib[901].html.fe.currentTime=(e.screenX/window.innerWidth*20)}




