class ImageContent extends Content{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)

		this.name=this.content.value;
		//this.createNode();

		this.type="img";
		this.cNode=new ContentNode(this);

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
		}else if(effectName_=="translate-static"){
			return new TranslateStaticImageEffect(effectJSON_,this)
		}else if(effectName_=="link"){
			return new LinkImageEffect(effectJSON_,this)
		}else if(effectName_=="z-index"){
			return new ZIndexEffect(effectJSON_,this)
		}else if(effectName_=="size"){
			return new SizeImageEffect(effectJSON_,this)
		}
		else{
			return new ImageEffect(effectJSON_,this)
		}
	}

	// reset(){
	// 	// if(!this.html.fe.paused){
	// 	// 	this.html.fe.pause();
	// 	// }
	// 	// this.html.fe.currentTime=this.start+.1;
	// 	this.delete();
	// 	this.createFrontEndHTML()
	// 	addEffects();
	// }
	// delete(){
	// 	this.html.fe.remove()
	// }


	createEffects(){
		
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

	//this.frontEndLoaded=false;

	createFrontEndHTML(){
		super.createFrontEndHTML();
		if(!this.html.fe.created){
				this.html.fe.created=true;
				this.frontEndCreated=true;

				let fileType=this.content.value;
				fileType=fileType.split('.');
				fileType=fileType[fileType.length-1];
		
				if(fileType=="mov" || fileType=="mp4"){
					this.html.fe = document.createElement("video");
				}else{
					this.html.fe = document.createElement("img");
				}
				
				this.html.fe.setAttribute('draggable', false);
				//console.log(this.id)
				this.html.fe.id=this.id;
				//this.html.fe.onmousedown = 'return false';
				this.addEffects();
				
				this.html.fe.onload =function(){ // can only adjust the size after it is loaded and therefore knows the natural size
					
					this.adjustSize();
					this.html.fe.onload=null;
				}.bind(this)
		
		
				this.html.fe.src=absoluteLocation + this.content.value;

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

		
		//document.getElementById("background_img").append(this.html.fe);


		super.display();
		this.htmlParent.append(this.html.fe);
		this.applyEntranceEffects();
		this.html.fe.style.display="block";
	}

	adjustSize(){
		for(let i in this.effects.general){
			if(this.effects.general[i] instanceof SizeImageEffect){
				if(this.effects.general[i].vareables.type=="scalable"){
					this.html.fe.style.width=(this.html.fe.naturalWidth / 1920)*100*this.effects.general[i].vareables.value + "%";
					return;
				}
			}
		}
		
		this.html.fe.style.width=(this.html.fe.naturalWidth / 1920)*100 + "%";
	}


	




}