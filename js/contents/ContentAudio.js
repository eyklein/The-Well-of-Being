let priorityAudioLoader=new PriorityLoader();

class AudioContent extends MediaContent{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)
		this.isDonePlaying=false;
		this.duration=0;
		this.endTime=this.start+this.duration;

		this.name=this.content.value;
	
		this.loadAudio(absoluteLocation + this.content.value)

		this.loop=false
		this.type="audio";
		this.cNode=new ContentNode(this);

		this.backEndCreated=false;
	    this.audioLoaded=false;
	}

	reset(){
		this.stop();
		super.reset();
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

				
				this.html.fe.addEventListener("timeupdate", function(e) {

					if(this.html.fe.currentTime>(this.duration+this.start)){
						this.pause();
					}

					if(this.parentScene != currentStory.currentScene){
						this.pause();
					}

					// this.duration=this.html.fe.duration;
				}.bind(this));


				// this.html.fe.ontimeupdate = function(e) {
				// 	console.log("playing from : " + this.parentScene.id);		
				// 	if(this.html.fe != e.target){
				// 		console.log("DELETE!!!!!!!! audio no longer asoseated with object")
				// 	}	
				// 	if(this.parentScene != currentStory.currentScene){
				// 		this.pause()
				// 		console.log("Pause!!!!!!!! no longer in that scene")
				// 	}	
				// 	if(this.html.fe.currentTime>(this.start*1+this.duration*1)){
				// 		e.target.remove();
				// 	}
				// }.bind(this);
				
				this.html.fe.src=absoluteLocation + this.content.value + '#t=' + this.start + ',' + (this.start+this.duration);
				

				
				// this.html.fe.addEventListener('canplaythrough', function(){ // can only adjust the size after it is loaded and therefore knows the natural size
					
				// }.bind(this));



		
				this.activateOnEndEvents()


				this.html.fe.addEventListener('ended', function(e){
					this.endTime=this.parentScene.timePlayingScene;
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



	display(){


		


		

	}

	// playFirstTime(){
	// 	this.applyEntranceEffects();
		
	// 	this.play();

		
	// }
	unplay(){ //audio at start
		this.html.fe.currentTime=this.start;
		this.pause();

	}
	
	// stop(){ //audio at end

	// 	if(this.html.fe.duration){
	// 		this.html.fe.currentTime=this.start + this.html.fe.duration;
	// 	}else{
	// 		console.log("durration is not defined")
	// 		console.log(this.html)
	// 	}
		
	// 	this.pause()
	// }
	skip(skipTime_){
		if(skipTime_==null){
			this.html.fe.currentTime=this.html.fe.duration;
		}else{
			this.html.fe.currentTime += skipTime_;
		}

	}
	removeFromActiveAudio(){
		// console.log("REMOVE!!!!!!!")
		// delete currentStory.activeMainAudio[currentStory.currentScene.id+this.id];

		//scene
		this.parentScene.playingMediaObjects.splice(this.parentScene.playingMediaObjects.indexOf(this),1);

		currentStory.updatePlayPause()
	}

	addToActiveAudio(){
		// currentStory.activeMainAudio[currentStory.currentScene.id+this.id]=this;

		if(this.parentScene.playingMediaObjects.indexOf(this) == -1){
			this.parentScene.playingMediaObjects.push(this)
		}

		currentStory.updatePlayPause()
	}


	play(){
		this.isPlaying=true;

		if(this.startTime == undefined){
			this.startTime=this.parentScene.timePlayingScene;
		}
		
		var playPromise = this.html.fe.play();

	  	if (playPromise !== undefined) {
	    	playPromise.then(_ => {
		      	// Automatic playback started!
		      	// Show playing UI.
		      	this.addToActiveAudio();
		      	// console.log("Audio Playing!!!")
		    })
		    .catch(error => {
		      	// Auto-play was prevented
		     	// Show paused UI.
		     	console.log("Audio ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
		    });
		}




		
	}
	pause(){
		this.isPlaying=false;
		this.html.fe.pause();
	}

	changeDuration(time_){
		this.duration=time_;
		this.endTime=this.start+this.duration;

		this.setInitalTimeVars()
		this.cNode.update()
		// this.updateAudioDisplay()
	}

	


	




}



// currentStory.currentScene.contentsLib[901].html.fe.onmousemove=function(e){currentStory.currentScene.contentsLib[901].html.fe.currentTime=(e.screenX/window.innerWidth*20)}




