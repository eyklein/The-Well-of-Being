let priorityAudioLoader=new PriorityLoader();





class AudioContent extends Content{


	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_

		

		super(contentJson_,parentScene_)
		this.name=this.content.value;

		//console.log("new audioContent " + this.content.value)
		//this.name=this.content.value;

		this.loadAudio(absoluteLocation + this.content.value); //creates and loads the audioBuffer object

		this.loop=false;
		this.track="main";//default track

		this.gainNode = context.createGain();
		this.gainNode.gain.value=currentStory.volume[this.track]; //default


		
		//this.createNode();

		this.type="audio";
		//this._audioContext = audioContext;
	    //this._buffer = buffer; // AudioBuffer
	    //this._source; // AudioBufferSourceNode

	    this.cNode=new ContentNode(this);

	    this.backEndCreated=false;
	    this.audioLoaded=false

	    
	
	}

	displayFrontEndHTML(){
		//this.applyProperties();
		super.displayFrontEndHTML();
		this.play();

		this.activateOnEndEvents();
		//this.playing=false;
		
	}

	// setVolume(volume_){
	// 	//this.volume=volume_;
	// 	this.gainNode.gain.value=volume_;
	// }

	updateVolume(){

		this.gainNode.gain.value=currentStory.volume[this.track];
	}


	getCurrentPlayTime(){
		if(this.source == undefined){
			return 0;
		}

		let playTime=context.currentTime-this.source.startingContextTime + this.source.startingPosition; //also needs an offset
		if(playTime>this.duration+this.start){
			playTime=this.duration+this.start;
		}
		return playTime;
	}

	loadAudio(url_){


		if(priorityAudioLoader.files[url_]==undefined){
			priorityAudioLoader.files[url_]=new AudioLoader(url_,this);
		}else{
			priorityAudioLoader.files[url_].addContentAudio(this)
		}
	}

			





		// 	priorityAudioLoader.files[url_]['status'] = "preload";
		// 	priorityAudioLoader.files[url_]['contentObjects'] = [];
		// 	priorityAudioLoader.files[url_]['contentObjects'].push(this);
		// 	priorityAudioLoader.files[url_]['audioBuffer'] = null;


		// 	var request = new XMLHttpRequest();
		// 	request.open('GET', url_, true);
		// 	request.responseType = 'arraybuffer';

		// 	request.audioContent=this;

		// 	// Decode asynchronously

		// 	//console.log(loadScreen)
		// 	loadScreen.numAudioFiles++;
		// 	loadScreen.update();
		// 	request.onload = function() {
		// 		loadScreen.loadedAudioFiles++;
		// 		loadScreen.update();

		// 	   	context.decodeAudioData(request.response, function(buffer_) {
		// 	    	buffer_.url=url_;
		// 	    	// console.log(url_)
		// 	    	this.audioContent.audioBuffer=buffer_;

		// 	    	priorityAudioLoader.files[url_]['audioBuffer']=buffer_;

		// 	    	priorityAudioLoader.files[url_]['status'] = "loaded";
		// 	    	for(let i in priorityAudioLoader.files[url_]['contentObjects']){
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].audioBuffer=priorityAudioLoader.files[url_]['audioBuffer'];
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].createEffects();
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].applyGeneralEffects();
		// 	    	}

		// 	    }.bind(this), onLoadError);
		// 	}
		// 	request.send();

		// }
		// else if(priorityAudioLoader.files[url_]['status'] == "loading"){
		// 	priorityAudioLoader.files[url_]['contentObjects'].push(this);
		// }else if(priorityAudioLoader.files[url_]['status'] == "loaded"){

		// 	this.audioBuffer=priorityAudioLoader.files[url_]['audioBuffer'];
		// 	this.createEffects();
		// 	this.applyGeneralEffects();
		// }
			



		// if(priorityAudioLoader.files[url_]==undefined){
		// 	priorityAudioLoader.files[url_]={};
		// 	priorityAudioLoader.files[url_]['status'] = "preload";
		// 	priorityAudioLoader.files[url_]['contentObjects'] = [];
		// 	priorityAudioLoader.files[url_]['contentObjects'].push(this);
		// 	priorityAudioLoader.files[url_]['audioBuffer'] = null;


		// 	var request = new XMLHttpRequest();
		// 	request.open('GET', url_, true);
		// 	request.responseType = 'arraybuffer';

		// 	request.audioContent=this;

		// 	// Decode asynchronously

		// 	//console.log(loadScreen)
		// 	loadScreen.numAudioFiles++;
		// 	loadScreen.update();
		// 	request.onload = function() {
		// 		loadScreen.loadedAudioFiles++;
		// 		loadScreen.update();

		// 	   	context.decodeAudioData(request.response, function(buffer_) {
		// 	    	buffer_.url=url_;
		// 	    	// console.log(url_)
		// 	    	this.audioContent.audioBuffer=buffer_;

		// 	    	priorityAudioLoader.files[url_]['audioBuffer']=buffer_;

		// 	    	priorityAudioLoader.files[url_]['status'] = "loaded";
		// 	    	for(let i in priorityAudioLoader.files[url_]['contentObjects']){
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].audioBuffer=priorityAudioLoader.files[url_]['audioBuffer'];
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].createEffects();
		// 	    		priorityAudioLoader.files[url_]['contentObjects'][i].applyGeneralEffects();
		// 	    	}

		// 	    }.bind(this), onLoadError);
		// 	}
		// 	request.send();

		// }
		// else if(priorityAudioLoader.files[url_]['status'] == "loading"){
		// 	priorityAudioLoader.files[url_]['contentObjects'].push(this);
		// }else if(priorityAudioLoader.files[url_]['status'] == "loaded"){

		// 	this.audioBuffer=priorityAudioLoader.files[url_]['audioBuffer'];
		// 	this.createEffects();
		// 	this.applyGeneralEffects();
		// }
			

		

	



	createBackEndHTML(){//this creates the divs 
		super.createBackEndHTML();
	}

	addBackEndEditors(){ //this fills them out and creates the editors

		if(!this.backEndCreated){
			this.backEndCreated=true;
			this.addEffectEditors();

			if(this.audioLoaded){
				this.updateAudioDisplay();
			}
		}

		
	}


	getAmplitudes(samples_){ //,startPosition_,duration_) {
		const rawData = this.audioBuffer.getChannelData(0); // We only need to work with one channel of data
		const samples = samples_; // Number of samples we want to have in our final data set
		const blockSize = Math.floor(rawData.length / samples); // the number of samples in each subdivision
		const filteredData = [];
		for (let i = 0; i < samples; i++) {
			let blockStart = blockSize * i; // the location of the first sample in the block
			let sum = 0;
			for (let j = 0; j < blockSize; j++) {
			  sum = sum + Math.abs(rawData[blockStart + j]) // find the sum of all the samples in the block
			}
			filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
		}
		return filteredData;
	}

	updateIcon(){
	
		this.html.be.divIcon.innerHTML=this.content.value;
		this.html.be.divIcon.style.height=this.duration * 100 + "px";
		
		this.html.be.divIcon.style.width=30 + "px";

		this.updateAudioDisplay();

		this.html.be.divIcon.appendChild(this.audioDisplay.getCanvaseWrap());
					
		
	}


	// playSound(){
	// 	if (context.state === 'suspended') {
	//         context.resume();
	//     }
	//     this.play(this.start,this.duration)			
	// }

	changeStart(time_){
		this.start=time_;
		this.setInitalTimeVars()
		this.updateAudioDisplay()

	}
	changeDuration(time_){
		this.duration=time_;
		this.setInitalTimeVars()
		this.cNode.update()
		this.updateAudioDisplay()
	}


	setInitalTimeVars(){
		this.currentPlayTime = this.start; // time of the audio playback, seconds
	    this.startTimestamp = this.start; // timestamp of last playback start, milliseconds
	    this.durationLeft=this.duration;
	    this.isPlaying = false;
	    this.isActive = false;//false when audio is done
	    
	    //this.bufferDuration = 0; // seconds
	}
	skip(skipTime_){//seconds
		if(skipTime_==null){
			this.source.stop(); // should tringer onened event
		}else{
			this.pause()
			console.log(this.currentPlayTime);
			this.currentPlayTime += skipTime_;
			this.durationLeft -= skipTime_;
			console.log(this.currentPlayTime);
			this.play();
		}
	}

	pause(){//this pauses just this audio clip
		if(this.isPlaying){
			//console.log("pause")
			//currentStory.audioCount--;
			this.isPlaying=false;


			this.source.stop();
			//console.log(this.currentPlayTime)
			let timeElapsed=context.currentTime-this.startTimestamp
			this.currentPlayTime = this.currentPlayTime + timeElapsed;
			this.durationLeft=this.durationLeft-timeElapsed;
			//this._playbackTime = pause ? (Date.now() - this._startTimestamp)/1000 + this._playbackTime : 0;
			//console.log(this.currentPlayTime)
		}else{
			console.log("already paused");
		}
	}

	play() { //startPosition_,duration_
		//currentStory.playing=true;

		this.updateVolume();

		currentStory.windowManager.displayPauseButton();

		//console.log("PLAY " + this.id + "   - " + this.track)



		if(this.track=="main"){
			currentStory.activeMainAudio[currentStory.currentScene.id+this.id]=this;
			// currentStory.activeMainAudio[this.parentScene.id+this.id]=this;

		}else if(this.track=="background"){
			currentStory.activeBackgroundAudio[currentStory.currentScene.id+this.id]=this;
			// currentStory.activeBackgroundAudio[this.parentScene.id+this.id]=this;
		}
		
		
		//currentStory.enablePlayPause();

		currentStory.audioCount++;
		console.log(1)
		currentStory.updatePlayPause();
		if (context.state === 'suspended') {
		    context.resume();
		}


		
		if(this.isPlaying){
			console.log("already playing")
		}else{

			this.source = context.createBufferSource(); // creates a sound source
			//console.log(this.source)

			this.source.loop=this.loop;

			this.source.buffer = this.audioBuffer;                    // tell the source which sound to play
			// this.analizer=context.createAnalyser()
			//this.source.buffer = this.audioBuffer;                    // tell the source which sound to play
			this.source.startingContextTime=context.currentTime;//add a startig time for time keeping
			this.startTimestamp=context.currentTime;//dont need both this and above ???

			this.source.startingPosition=this.currentPlayTime;//add a startig time for time keeping


		 
		 	this.isPlaying=true;
		 	this.isActive=true;



		 	this.source.playbackRate.value = 1;

		 	


			this.source.connect(this.gainNode)

			//if(this.track=="main"){

			//}

			this.gainNode.connect(context.destination);       // connect the source to the context's destination (the speakers)

			// var loopingEnabled = AudioBufferSourceNode.loop;
			// AudioBufferSourceNode.loop = false;

		 	//console.log(this.currentPlayTime)
		 	this.source.start(0,this.currentPlayTime,this.durationLeft);  
		 	//this.source.start(context.currentTime,this.currentPlayTime,this.durationLeft);                            // play the source now
		                                           // note: on older systems, may have to use deprecated noteOn(time);


		    this.source.onended=function(event_){
		    	console.log(2)
		    	currentStory.audioCount--;
		    	currentStory.updatePlayPause();
		    	this.endOfPlayback();
		 		// this.isPlaying=false;
			}.bind(this);
		}
		console.log(3)
		currentStory.updatePlayPause();
	}

	// createSource(){
		
	// }

	// connectBuffer(){
		
	// }

	createFrontEndHTML(){
		super.createFrontEndHTML();
	}

	endOfPlayback(){
		if(this.isPlaying){ //if isPlaying is true then its not just paused
			delete currentStory.activeMainAudio[currentStory.currentScene.id+this.id];

			currentStory.updatePlayPause()//if nothing is playing it will be blocked

			// if(Object.keys(currentStory.activeMainAudio).length == 0){
			// 	currentStory.disablePlayPause();
			// }

			this.isActive=false;
			this.isPlaying=false;


			//reset to begining
			this.durationLeft=this.duration;
			this.currentPlayTime=this.start;
		}else{
			//this.isActive=false;
		}
		

		//this.isPlaying=false;

		//reset to beginging
		// this.currentPlayTime = this.start;
		// this.durationLeft=this.duration;		
	}

	updateAudioDisplay(){ 
		if(this.audioDisplay==undefined){
			this.addAudioDisplay();
		}

		this.audioDisplay.draw(this.start,this.duration)
		this.cNode.html.info.append(this.audioDisplay.getCanvaseWrap())
	}

	addAudioDisplay(){ 
		this.audioDisplay=new AudioDisplay(this);
	}

	applyGeneralEffects(){
		for(let effect in this.effects.general){
			// console.log(this)
			this.effects.general[effect].apply();
		}

		// this.updateAudioDisplay();
		// this.addEffectEditors();

		
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


};



function onLoadError(error_){
	console.log("error loading audio " + error_)
}	




class AudioDisplay{
	constructor(audioContent_){
	this.lineWidth=3;
		//AudioObjectHandler.prototype.audioDisplay=function(startPosition_,duration_) {
	this.audioContent=audioContent_;
	this.scale=timeScale;		// pixels/second
	//this.currentPlayTime=30;
	this.duration=this.audioContent.audioBuffer.duration; //this durration is the complet durration of the audio not the playtime
	this.numSamples=this.duration*this.scale/this.lineWidth;
	this.amplitudes=this.audioContent.getAmplitudes(this.numSamples);
	
	this.html={};

	this.html.canvasWrap = document.createElement("div");
	this.html.canvasWrap.classList.add("canvas-wrap")
	this.html.canvas = document.createElement("CANVAS");

	const dpr = window.devicePixelRatio || 1;
	//const padding = 20;
	this.html.canvas.width = 90;
	this.html.canvas.height = this.duration * this.scale;
	this.html.canvas.style.position="absolute";
	this.html.canvas.style.top="0px";

	this.html.ctx = this.html.canvas.getContext("2d");
	//this.html.ctx.scale(dpr, dpr);

	this.html.ctx.lineWidth = this.lineWidth; // how thick the line is
	


	this.html.playBar=document.createElement("div");
	this.html.playBar.style.height="1px";
	this.html.playBar.style.width="100px";
	this.html.playBar.style['background-color']="green";
	this.html.playBar.style.position = 'absolute';
	this.html.playBar.style.left="0px";
	this.html.playBar.style.top="0px";

	this.html.canvasWrap.appendChild(this.html.canvas);

	this.html.canvasWrap.appendChild(this.html.playBar);
	}
	



					
	getCanvaseWrap(){
		return this.html.canvasWrap;

	}
	continuousUpdatePlayBar(){


		//console.log(this)
		this.updatePlayPosition();

		//document.getElementById(chr).scrollIntoView(true);
		//console.log(this.audioContent)
		if(this.audioContent.isPlaying){
			setTimeout(this.continuousUpdatePlayBar.bind(this), 6);
		}
		
	}

	draw(start_,duration_){
		let indent=20;

		this.html.ctx.clearRect(0, 0, this.html.canvas.width, this.html.canvas.height);

		this.html.canvas.style.position="absolute";
		this.html.canvas.style.top=this.audioContent.start*this.scale*-1 + "px";
		this.html.canvas.style.left=indent*-1 + "px";
		
		

		// //axis line
		// this.html.ctx.strokeStyle = "#999";// what color our line is	
		// this.html.ctx.beginPath();
		// this.html.ctx.moveTo(indent, 0);
		// this.html.ctx.lineTo(indent, this.html.canvas.height);
		// this.html.ctx.stroke();								


		this.html.ctx.font = "20px century_gothicregular";
		this.html.ctx.textAlign = "end";
		this.html.ctx.textBaseline = "middle";
		this.html.ctx.fillStyle = "#333";// what color our line is	



		
		for(let i=0;i<this.amplitudes.length;i++){
			
			
			//if((i*this.lineWidth/this.scale) < start_ || (i*this.lineWidth/this.scale)>(start_+duration_)){
			if((i*this.lineWidth/this.scale) < start_ || (i*this.lineWidth/this.scale)>(start_+duration_)){
				this.html.ctx.strokeStyle = "rgba(0,0,255,.08)";// what color our line is	
			}else{
				this.html.ctx.strokeStyle = "#000000";// what color our line is	
			}																			
			//https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
			this.html.ctx.beginPath();
			this.html.ctx.moveTo(indent, i*this.lineWidth);
			this.html.ctx.lineTo(indent + this.amplitudes[i]*200, i*this.lineWidth);
			this.html.ctx.stroke();
		}

		// this.html.ctx.beginPath();
		// this.html.ctx.moveTo(0, 2578);
		// this.html.ctx.lineTo(600, 2578);
		// this.html.ctx.stroke();



		this.html.ctx.font = "10px century_gothicregular";
		this.html.ctx.textAlign = "start";
		this.html.ctx.textBaseline = "middle";
		this.html.ctx.fillStyle = "#777";// what color our line is	
		//axis numbers
		for(let i=100/this.lineWidth ; i*this.lineWidth/this.scale<this.amplitudes.length ; i+=100/this.lineWidth){
			this.html.ctx.fillText(Math.round(i*this.lineWidth/this.scale) + " -", 3, i*this.lineWidth); //indent, i); 
		}
	}
	updatePlayPosition(){
		//console.log(this.audio)
		//console.log(mouseDown)
		let scrollToEasing
		if(mouseDown==false){
			this.html.playBar.style.top=this.audioContent.getCurrentPlayTime()*100 + "px";

			//this.html.playBar.scrollIntoView(false);
			//console.log(this.audioContent.content.contentEditorModual.html.viewport.style)


			//this.audioContent.content.contentEditorModual.html.viewport.scrollTo(0,this.html.playBar.offsetTop - 50)
			//console.log(this.audioContent.content.contentEditorModual.html.viewport.scrollTop)
			let easing=.1;

			//console.log(this)

			scrollToEasing = this.audioContent.contentEditorModual.html.viewport.scrollTop + ((this.html.playBar.offsetTop-400) - this.audioContent.contentEditorModual.html.viewport.scrollTop)*easing;
			//let scrollToEasing = this.audioContent.content.contentEditorModual.html.viewport.scrollTop + ((this.html.playBar.offsetTop - 400) - this.audioObjectHandler.content.contentEditorModual.html.viewport.scrollTop)*easing;
			
			//console.log(scrollToEasing)
		}

		this.audioContent.contentEditorModual.html.viewport.scrollTo(0, scrollToEasing);


	}

}








































// let priorityAudioLoader=new PriorityLoader();

// class AudioContent extends MediaContent{
// 	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
// 		super(contentJson_,parentScene_)
// 		this.isDonePlaying=false;
// 		this.duration=0;
// 		this.endTime=this.start+this.duration;

// 		this.name=this.content.value;
	
// 		this.loadAudio(absoluteLocation + this.content.value)

// 		this.loop=false
// 		this.type="audio";
// 		this.cNode=new ContentNode(this);

// 		this.backEndCreated=false;
// 	    this.audioLoaded=false;
// 	}

// 	reset(){
// 		this.stop();
// 		super.reset();
// 		this.isDonePlaying=false;
// 	}

// 	end(){
// 		// if(!this.html.fe.paused){
// 		// 	this.html.fe.pause();
// 		// }
// 		// console.log(this);
// 		// console.log(this.start)
// 		// console.log(this.duration)
// 		this.stop();

// 	}

// 	// setVolume(volume_){
// 	// 	this.html.fe.volume=volume_;
// 	// }

	


// 	createEffects(){
// 		// console.log(this.JSONData)
// 		// console.log("**********************************************************************")
// 		// console.log(this.JSONData)

// 		for(let effect in this.JSONData.effects.general){
// 			// console.log(effect)
// 			if(effect=="clipping"){
// 				this.effects.general[effect]=new ClippingAudioEffect(this.JSONData.effects.general[effect],this)
// 			}else if(effect=="repeat"){
// 				this.effects.general[effect]=new RepeatAudioEffect(this.JSONData.effects.general[effect],this)
// 			}else if(effect=="track"){
// 				this.effects.general[effect]=new TrackAudioEffect(this.JSONData.effects.general[effect],this)
// 			}else{
// 				this.effects.general[effect]=new ContentEffect(this.JSONData.effects.general[effect],this)
// 			}
// 		}

// 		this.cNode.update();
		
// 		// super.addEffectEditors();
	
		
// 	}


// 	setInitalTimeVars(){
// 		//this.html.fe.currentTime = this.start; // time of the audio playback, seconds


// 		// this.html.fe.addEventListener("ontimeupdate",function(){

// 		// });
// 	    // this.startTimestamp = this.start; // timestamp of last playback start, milliseconds
// 	    // this.durationLeft=this.duration;
// 	    this.isPlaying = false;
// 	    this.isActive = false;


	  
// 	   //start and stop time set in src in htmlLoadFrontEnd
// 	    // this.html.fe.src = this.html.fe.src + '#t=' + this.start + ',' + (this.start+this.duration);
	    
// 	}

// 	updateVolume(){

// 		this.html.fe.volume==currentStory.volume[this.track];
// 	}

// 	loadAudio(url_){

// 		// console.log("LOAD VIDEO HERE!!!!!!!!!!!!!!!!!!!")
// 		// if(priorityVideoLoader.files[url_]==undefined){
// 		// 	priorityVideoLoader.files[url_]=new VideoLoader(url_,this);
// 		// }else{
// 		// 	priorityVideoLoader.files[url_].addContentVideo(this)
// 		// }
// 	}

// 	//this.frontEndLoaded=false;

// 	createFrontEndHTML(){
// 		super.createFrontEndHTML();
// 		if(!this.html.fe.created){
// 				this.html.fe.created=true;
// 				this.frontEndCreated=true;

// 				let fileType=this.content.value;
// 				fileType=fileType.split('.');
// 				fileType=fileType[fileType.length-1];
		
// 				// if(fileType=="mov" || fileType=="mp4"){
// 				// 	this.html.fe = document.createElement("video");
// 				// }else{
// 				// 	this.html.fe = document.createElement("img");
// 				// }

// 				this.html.fe = document.createElement("audio");
				
// 				// this.html.fe.setAttribute('draggable', false);
// 				//console.log(this.id)
// 				this.html.fe.id=this.id;
// 				//this.html.fe.onmousedown = 'return false';
// 				this.addEffects();

				
// 				this.html.fe.addEventListener("timeupdate", function(e) {

// 					if(this.html.fe.currentTime>(this.duration+this.start)){
// 						this.pause();
// 					}

// 					if(this.parentScene != currentStory.currentScene && this.parentScene.id != "background"){
// 						this.pause();
// 					}

// 					// this.duration=this.html.fe.duration;
// 				}.bind(this));


// 				// this.html.fe.ontimeupdate = function(e) {
// 				// 	console.log("playing from : " + this.parentScene.id);		
// 				// 	if(this.html.fe != e.target){
// 				// 		console.log("DELETE!!!!!!!! audio no longer asoseated with object")
// 				// 	}	
// 				// 	if(this.parentScene != currentStory.currentScene){
// 				// 		this.pause()
// 				// 		console.log("Pause!!!!!!!! no longer in that scene")
// 				// 	}	
// 				// 	if(this.html.fe.currentTime>(this.start*1+this.duration*1)){
// 				// 		e.target.remove();
// 				// 	}
// 				// }.bind(this);
				
// 				this.html.fe.src=absoluteLocation + this.content.value + '#t=' + this.start + ',' + (this.start+this.duration);
				

				
// 				// this.html.fe.addEventListener('canplaythrough', function(){ // can only adjust the size after it is loaded and therefore knows the natural size
					
// 				// }.bind(this));



		
// 				this.activateOnEndEvents()


// 				this.html.fe.addEventListener('ended', function(e){
// 					this.endTime=this.parentScene.timePlayingScene;
// 					this.removeFromActiveAudio();
// 					this.isDonePlaying=true;
				
// 				}.bind(this));


// 				this.html.fe.addEventListener('pause', function(e){
// 					if(this.html.fe.currentTime>=(this.start+this.duration)){
// 						//force ended event
// 						let event = new Event('ended');
// 						this.html.fe.dispatchEvent(event);
// 					}
// 				}.bind(this));
		
				

// 				// super.addEffectEditors();
				
// 				//this.html.fe.classList.add('icon-img')
		
// 				// this.createEffects();
// 				// this.applyGeneralEffects();
		
		
// 		}
		

// 	}
// 	addEffects(){
// 		//console.log("this.createEffects();")
// 		this.createEffects();
		
// 		this.applyGeneralEffects();
// 	}



// 	display(){


		


		

// 	}

// 	// playFirstTime(){
// 	// 	this.applyEntranceEffects();
		
// 	// 	this.play();

		
// 	// }
// 	unplay(){ //audio at start
// 		this.html.fe.currentTime=this.start;
// 		this.pause();

// 	}
	
// 	// stop(){ //audio at end

// 	// 	if(this.html.fe.duration){
// 	// 		this.html.fe.currentTime=this.start + this.html.fe.duration;
// 	// 	}else{
// 	// 		console.log("durration is not defined")
// 	// 		console.log(this.html)
// 	// 	}
		
// 	// 	this.pause()
// 	// }
// 	skip(skipTime_){
// 		if(skipTime_==null){
// 			this.html.fe.currentTime=this.html.fe.duration;
// 		}else{
// 			this.html.fe.currentTime += skipTime_;
// 		}

// 	}
// 	removeFromActiveAudio(){
// 		// console.log("REMOVE!!!!!!!")
// 		// delete currentStory.activeMainAudio[currentStory.currentScene.id+this.id];

// 		//scene
// 		this.parentScene.playingMediaObjects.splice(this.parentScene.playingMediaObjects.indexOf(this),1);

// 		currentStory.updatePlayPause()
// 	}

// 	addToActiveAudio(){
// 		// currentStory.activeMainAudio[currentStory.currentScene.id+this.id]=this;

// 		if(this.parentScene.playingMediaObjects.indexOf(this) == -1){
// 			this.parentScene.playingMediaObjects.push(this)
// 		}

// 		currentStory.updatePlayPause()
// 	}


// 	play(){
// 		this.isPlaying=true;

// 		if(this.parentScene.id=="background"){
// 			this.html.fe.loop=true;
// 		}

// 		if(this.startTime == undefined){
// 			this.startTime=this.parentScene.timePlayingScene;
// 		}
		
// 		var playPromise = this.html.fe.play();

// 	  	if (playPromise !== undefined) {
// 	    	playPromise.then(_ => {
// 		      	// Automatic playback started!
// 		      	// Show playing UI.
// 		      	this.addToActiveAudio();
// 		      	// console.log("Audio Playing!!!")
// 		    })
// 		    .catch(error => {
// 		      	// Auto-play was prevented
// 		     	// Show paused UI.
// 		     	console.log("Audio ERROR!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
// 		    });
// 		}




		
// 	}

// 	pause(){
// 		this.isPlaying=false;
// 		this.html.fe.pause();
// 	}

// 	changeDuration(time_){
// 		this.duration=time_;
// 		this.endTime=this.start+this.duration;

// 		this.setInitalTimeVars()
// 		this.cNode.update()
// 		// this.updateAudioDisplay()
// 	}

	


	




// }



// // currentStory.currentScene.contentsLib[901].html.fe.onmousemove=function(e){currentStory.currentScene.contentsLib[901].html.fe.currentTime=(e.screenX/window.innerWidth*20)}





















