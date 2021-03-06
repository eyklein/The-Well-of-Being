let priorityAudioLoader=new PriorityLoader();

class AudioContent extends Content{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)
		this.isDonePlaying=false;
		this.duration=0;

		this.name=this.content.value;
	
		this.loadAudio(absoluteLocation + this.content.value)

		this.loop=false
		this.type="audio";
		this.cNode=new ContentNode(this);

		this.backEndCreated=false;
	    this.audioLoaded=false

	   	

	}

	


	createEffects(){
		// console.log(this.JSONData)
		// console.log("**********************************************************************")
		// console.log(this.JSONData)

		for(let effect in this.JSONData.effects.general){
			// console.log(effect)
			if(effect=="clipping"){
				this.effects.general[effect]=new ClippingAudioEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="repeat"){
				this.effects.general[effect]=new RepeatAudioEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="track"){
				this.effects.general[effect]=new TrackAudioEffect(this.JSONData.effects.general[effect],this)
			}else{
				this.effects.general[effect]=new ContentEffect(this.JSONData.effects.general[effect],this)
			}
		}

		this.cNode.update();
		
		// super.addEffectEditors();
	
		
	}


	setInitalTimeVars(){
		//this.html.fe.currentTime = this.start; // time of the audio playback, seconds


		// this.html.fe.addEventListener("ontimeupdate",function(){

		// });
	    // this.startTimestamp = this.start; // timestamp of last playback start, milliseconds
	    // this.durationLeft=this.duration;
	    this.isPlaying = false;
	    this.isActive = false;


	  
	   //start and stop time set in src in htmlLoadFrontEnd
	    // this.html.fe.src = this.html.fe.src + '#t=' + this.start + ',' + (this.start+this.duration);
	    
	}

	updateVolume(){

		this.html.fe.volume==currentStory.volume[this.track];
	}

	loadAudio(url_){

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

				this.html.fe = document.createElement("audio");
				
				// this.html.fe.setAttribute('draggable', false);
				//console.log(this.id)
				this.html.fe.id=this.id;
				//this.html.fe.onmousedown = 'return false';
				this.addEffects();

				
				this.html.fe.ondurationchange = function(e) {
					// console.log("++++");
					// this.duration=this.html.fe.duration;
				}.bind(this);
				
				this.html.fe.src=absoluteLocation + this.content.value + '#t=' + this.start + ',' + (this.start+this.duration);
				

				
				// this.html.fe.addEventListener('canplaythrough', function(){ // can only adjust the size after it is loaded and therefore knows the natural size
					
				// }.bind(this));



		
				this.activateOnEndEvents()
		
				

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

		// console.log("Display Audio")
		// super.displayFrontEndHTML();
		// this.htmlParent.append(this.html.fe);
		this.applyEntranceEffects();
		// this.html.fe.style.display="block";
		// this.html.fe.style.preload="metadata";//show first frame

		// this.play();

		this.play();



		// this.html.fe.currentTime=.09;

		this.html.fe.addEventListener('ended', function(e){
			this.removeFromActiveAudio();
			this.isDonePlaying=true;
		
		}.bind(this));


		this.html.fe.addEventListener('pause', function(e){
			if(this.html.fe.currentTime>=(this.start+this.duration)){
				//force ended event
				let event = new Event('ended');
				this.html.fe.dispatchEvent(event);
			}
		}.bind(this));


		

		

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
	removeFromActiveAudio(){
		// console.log("REMOVE!!!!!!!")
		delete currentStory.activeMainAudio[currentStory.currentScene.id+this.id];

		currentStory.updatePlayPause()
	}

	addToActiveAudio(){
		currentStory.activeMainAudio[currentStory.currentScene.id+this.id]=this;

		currentStory.updatePlayPause()
	}

	play(){
		this.isPlaying=true;
		
		this.html.fe.play();

		this.addToActiveAudio();
	}
	pause(){
		this.isPlaying=false;
		this.html.fe.pause();
	}

	changeDuration(time_){
		this.duration=time_;
		this.setInitalTimeVars()
		this.cNode.update()
		// this.updateAudioDisplay()
	}

	


	




}



// currentStory.currentScene.contentsLib[901].html.fe.onmousemove=function(e){currentStory.currentScene.contentsLib[901].html.fe.currentTime=(e.screenX/window.innerWidth*20)}




