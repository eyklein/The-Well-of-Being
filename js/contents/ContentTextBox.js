class TextBoxContent extends Content{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)
		
		this.htmlParent={};

		this.name="textbox";
		this.source=eval(this.content.source);
		this.rangeType=this.content.rangeType
		//"range":"audio/full_reading_v200.mp3"
		this.rangeInfo=this.content.rangeInfo;

		if(this.rangeInfo.duration){
			this.rangeInfo.end=this.rangeInfo.start + this.rangeInfo.duration;
		}

		//this.createNode();
		this.type="textBox";
		this.cNode=new ContentNode(this);

		this.open=false;
	}

	toggle(){
		if(this.open){
			this.open=false;
			this.html.fe.classList.remove("open");
			this.html.closingOpeningTabArrow.classList.remove("open");
			this.html.fe.classList.add("closed");
			this.html.closingOpeningTabArrow.classList.add("closed");
		}else{
			this.open=true;
			this.html.fe.classList.remove("closed");
			this.html.closingOpeningTabArrow.classList.remove("closed");
			this.html.fe.classList.add("open");
			this.html.closingOpeningTabArrow.classList.add("open");
		}
	}

	createFrontEndHTML(){
		super.createFrontEndHTML();
		this.textLines=[]

		if(this.rangeType=="times"){
			// console.log(this.rangeInfo)
			
			this.addAvalibleTranscriptLine(this.rangeInfo.start, this.rangeInfo.end);
		}


		this.html={};
		this.html.fe = document.createElement("div");
		this.html.fe.classList.add("text-box")
		this.html.fe.classList.add("closed");

		this.html.closingOpeningTab=document.createElement("div");
		this.html.closingOpeningTab.classList.add("tab");
		this.html.fe.append(this.html.closingOpeningTab);

		this.html.closingOpeningTabArrow=document.createElement("div");
		this.html.closingOpeningTabArrow.classList.add("tab-arrow");
		this.html.closingOpeningTabArrow.classList.add("closed");
		this.html.closingOpeningTab.append(this.html.closingOpeningTabArrow);
		this.html.closingOpeningTabArrow.innerHTML=">"


		this.html.closingOpeningTab.addEventListener("click",function(){
			this.toggle();

		}.bind(this))




		this.html.fe.style.padding="1vw"

		this.createEffects();

		this.applyEffects();


		
		





		
		
	}

	addAvalibleTranscriptLine(t1_, t2_){
		//console.log(t1_ + " **************" + t2_)
		let transcriptLinesStartIndex = transcript.getLineIndexAtOrAfter(t1_);
		let transcriptLinesEndIndex = transcript.getLineIndexAtOrAfter(t2_)-1;
		console.log("End index  :  " + transcriptLinesEndIndex)
		for(let i = transcriptLinesStartIndex; i<=transcriptLinesEndIndex; i++){
			this.textLines.push(transcript.lines[i]);
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
	
	

	displayFrontEndHTML(){



		super.displayFrontEndHTML();

		for(let line of this.textLines){
			
			this.html.fe.append(line.html)
		}
		
		this.htmlParent.append(this.html.fe);

		this.html.fe.style.display="block";
		
	}

}