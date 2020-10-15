class TranscriptBoxContent extends Content{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)
		
		this.htmlParent={};

		this.name="textbox";
		this.source=eval(this.content.source);
		this.alignMediaSrc=this.content.alignWith
		this.alignMedia=[];

		this.offsetTimes=this.content.offsets;




		//this.createNode();
		this.type="textBox";
		this.cNode=new ContentNode(this);
	}


	

	resetText(){

		if(this.offsetTimes.start){
			var t1=this.alignMedia[0].start + this.offsetTimes.start;
		}else{
			var t1=this.alignMedia[0].start;
		}

		if(this.offsetTimes.end){
			var t2=this.alignMedia[0].start + this.alignMedia[0].duration + this.offsetTimes.end;
		}else{
			var t2=this.alignMedia[0].start + this.alignMedia[0].duration;
		}


		this.html.fe.style.display="block";
		this.hidenLines=[];
		this.currentLine;
		this.displayedLines=[];
		this.addAvalibleTranscriptLine(t1, t2);
		
	}

	end(){
		this.html.fe.style.display="none";
	}

	displayNone(){
		this.html.fe.style.display="none";
	}
	displayBlock(){
		this.html.fe.style.display="block";
	}

	createFrontEndHTML(){
		super.createFrontEndHTML();

		for(let id in this.parentScene.contentsLib){
			if(this.parentScene.contentsLib[id].content.value==this.alignMediaSrc){
				this.alignMedia.push(this.parentScene.contentsLib[id]);
			}
		}
		

		




		this.html.fe = document.createElement("div");
		this.html.fe.classList.add("transcript-box")

		

		
		this.createEffects();

		this.applyEffects();

		for(let i in this.alignMedia){
			// this.alignMedia[i].addEventListener("")

			this.alignMedia[i].html.fe.addEventListener('timeupdate', function(){
				//console.log(this.alignMedia[i].html.fe.currentTime);

				this.displayTranscript(this.alignMedia[i].html.fe.currentTime + this.offsetTimes.all);
			}.bind(this,i));		
		}




		this.resetText()

		



		
	}

	addAvalibleTranscriptLine(t1_, t2_){
		//console.log(t1_ + " **************" + t2_)
		let transcriptLinesStartIndex = transcript.getLineIndexAtOrAfter(t1_);
		let transcriptLinesEndIndex = transcript.getLineIndexAtOrAfter(t2_)-1;
	
		for(let i = transcriptLinesStartIndex; i<=transcriptLinesEndIndex; i++){
			this.hidenLines.push(transcript.lines[i]);
		}
	}


	displayTranscript(time_){

		this.replaceNewLine(time_)


		if(this.currentLine){
			this.shiftReadingStatus(time_);
		}
		

	}
	replaceNewLine(time_){
		for(let i=0;i<this.hidenLines.length;i++){
			// console.log(this.lines[i])
			if(this.hidenLines[i].inRange(time_) == 0){
				//add to already played
				if(this.currentLine){
					this.displayedLines.push(this.currentLine)
				}

				this.currentLine=this.hidenLines[i];
				this.html.fe.innerHTML=""
				// this.html.unread.innerHTML="";
				// this.html.reading.innerHTML=""
				// this.html.read.innerHTML=""

				//this.html.fe.innerHTML="";
				//this.html.fe.append(this.hidenLines[i].html);
				//this.displayedLines[i] = this.hidenLines[i]

				//why does this may css aminations smoother?
				this.hidenLines.splice(i, 1);
				i--;

				// console.log(this.html.unread)
				
				this.html.fe.append(this.currentLine.html);
				// for(let word of this.currentLine.words){
				// 	this.html.unread.append(word.html);
				// }
				return true;
			}
		}
	}

	shiftReadingStatus(time_){
		for(let word of this.currentLine.words){
			if(word.read==false){
				if(word.inRange(time_)==1){
					// this.html.read.append(word.html)
					// word.html.classList.remove("reading");
					word.html.classList.add("read");
				}else if(word.inRange(time_)==0){
					// this.html.reading.append(word.html)
					word.html.classList.add("reading");
				}
			}
		}
	}




	createEffects(){
		
		for(let effect in this.JSONData.effects.general){
			if(effect=="fill"){
				this.effects.general[effect]=new FillTextEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="background-fill"){
				this.effects.general[effect]=new BackgroundFillEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="stroke"){
				this.effects.general[effect]=new StrokeTextEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="position"){
				this.effects.general[effect]=new PositionTextEffect(this.JSONData.effects.general[effect],this)
			}
			else if(effect=="dimensions"){
				this.effects.general[effect]=new DimensionsTextEffect(this.JSONData.effects.general[effect],this)
			}
			else if(effect=="size"){
				
				this.effects.general[effect]=new SizeTextEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="text-align"){
				this.effects.general[effect] = new AlignTextEffect(this.JSONData.effects.general[effect],this)
			}
			else if(effect=="z-index"){
				this.effects.general[effect] = new ZIndexEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="font"){
				this.effects.general[effect] = new FontTextEffect(this.JSONData.effects.general[effect],this)
			}else if(effect=="link"){
				this.effects.general[effect] = new LinkTextEffect(this.JSONData.effects.general[effect],this)
			}
			else{
				this.effects.general[effect]=new ContentEffect(this.JSONData.effects.general[effect],this)
			}
		}
		for(let effect in this.JSONData.effects.entrance){
			this.effects.entrance[effect]=new ContentEffect(this.JSONData.effects.entrance[effect],this)
		}
		for(let effect in this.JSONData.effects.exit){
			if(effect=="hide"){
				this.effects.exit[effect]=new HideTextEffect(this.JSONData.effects.exit[effect],this)
			}else{
				this.effects.exit[effect]=new ContentEffect(this.JSONData.effects.exit[effect],this)
			}
			
		}

		//console.log(this.id + "  " + this.JSONData.effects.clickable)

		//genneral effects
		this.effects.clickable.generic={}
		for(let effect in this.JSONData.effects.clickable.generic){

			if(effect=="glow"){
				this.effects.clickable.generic[effect]=new GlowTextEffect(this.JSONData.effects.clickable.generic[effect],this)
			}else{
				this.effects.clickable.generic[effect]=new ContentEffect(this.JSONData.effects.clickable.generic[effect],this)
			}


		}
		this.effects.clickable.hover={}
		for(let effect in this.JSONData.effects.clickable.hover){

			if(effect=="glow"){
				this.effects.clickable.hover[effect]=new GlowTextEffect(this.JSONData.effects.clickable.hover[effect],this)
			}else{
				this.effects.clickable.hover[effect]=new ContentEffect(this.JSONData.effects.clickable.hover[effect],this)
			}
		}
		this.effects.clickable.pressed={}
		for(let effect in this.JSONData.effects.clickable.hover){

			if(effect=="glow"){
				this.effects.clickable.pressed[effect]=new GlowTextEffect(this.JSONData.effects.clickable.pressed[effect],this)
			}else{
				this.effects.clickable.pressed[effect]=new ContentEffect(this.JSONData.effects.clickable.pressed[effect],this)
			}
		}

		this.cNode.update();
	
	}


	applyEffects(){
		
		for(let effect in this.effects.general){
			this.effects.general[effect].apply();
		}
	}
	
	

	display(){

		super.display();
		
		this.htmlParent.append(this.html.fe);

		// this.html.fe.style.display="block";
		
	}

}