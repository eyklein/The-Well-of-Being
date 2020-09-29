let priorityVideoLoader=new PriorityLoader();

class VideoContent extends Content{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)
		this.isDonePlaying=false;
		this.duration=0;

		this.name=this.content.value;
	
		this.loadVideo(absoluteLocation + this.content.value)

		this.loop=false
		this.type="video";
		this.cNode=new ContentNode(this);

		this.backEndCreated=false;
	    this.videoLoaded=false

	   	

	}

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

				this.html.fe = document.createElement("video");
				
				this.html.fe.setAttribute('draggable', false);
				//console.log(this.id)
				this.html.fe.id=this.id;
				//this.html.fe.onmousedown = 'return false';
				this.addEffects();

				
				this.html.fe.ondurationchange = function(e) {
					console.log("++++");
					this.duration=this.html.fe.duration;
				}.bind(this);
				

				this.html.fe.src=absoluteLocation + this.content.value;
				

				
				this.html.fe.onload =function(){ // can only adjust the size after it is loaded and therefore knows the natural size
					
					this.adjustSize();
					console.log("VIDEO LOADED!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
					console.log(this.html.fe.duration);
					this.duration=this.html.fe.duration;
					this.html.fe.onload=null;
				}.bind(this)



		
		
				

				// super.addEffectEditors();
				
				//this.html.fe.classList.add('icon-img')
		
				// this.createEffects();
				// this.applyGeneralEffects();
		
		
		}
		

	}
	addEffects(){
		//console.log("this.createEffects();")
		this.createEffects();
		
		this.applyGeneralEffects();
	}



	displayFrontEndHTML(){

		
		//document.getElementById("background_img").append(this.html.fe);

		console.log("Display Video")
		super.displayFrontEndHTML();
		this.htmlParent.append(this.html.fe);
		this.applyEntranceEffects();
		this.html.fe.style.display="block";
		this.html.fe.style.preload="metadata";//show first frame

		// this.play();



		this.html.fe.currentTime=.09;

		this.html.fe.addEventListener('ended', function(e){
			this.removeFromActiveVideo();
			this.isDonePlaying=true;
		}.bind(this));

		this.activateOnEndEvents()

		// this.html.fe.play();

	}
	stop(){
		this.html.fe.currentTime=this.html.fe.duration;
	}
	skip(skipTime_){
		if(skipTime_==null){
			this.html.fe.currentTime=this.html.fe.duration;
		}else{
			this.html.fe.currentTime += skipTime_;
		}

	}
	pan(percent_){
		// console.log((percent_))
		// console.log((percent_*this.html.fe.duration))
		this.html.fe.currentTime=(percent_*parseFloat(this.html.fe.duration));
	}
	removeFromActiveVideo(){
		// console.log("REMOVE!!!!!!!")
		delete currentStory.activeMainVideo[currentStory.currentScene.id+this.id];

		currentStory.updatePlayPause()
	}

	addToActiveVideo(){
		currentStory.activeMainVideo[currentStory.currentScene.id+this.id]=this;

		currentStory.updatePlayPause()
	}

	play(){
		this.isPlaying=true;
		
		this.html.fe.play();

		this.addToActiveVideo();
	}
	pause(){
		this.isPlaying=false;
		this.html.fe.pause();
	}

	adjustSize(){ //????
		this.html.fe.style.width=(this.html.fe.naturalWidth / 1920)*100 + "%";
	}


	




}



// currentStory.currentScene.contentsLib[901].html.fe.onmousemove=function(e){currentStory.currentScene.contentsLib[901].html.fe.currentTime=(e.screenX/window.innerWidth*20)}




