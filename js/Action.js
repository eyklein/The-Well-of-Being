let timeScale = 10;
let clickScale = 50;
class Action{

	constructor(actionJSON_,scene_){
		

		this.random=Math.random();
		this.JSON=actionJSON_;
		this.id=actionJSON_.id;
		this.tempId=Math.round(Math.random(0, 1)*100);
		this.tail;//either the scene itself or content object
		this.head;//either content of a new scene
		this.tailElicitNode=null;//either the scene itself or content object
		this.headElicitNode;//either content of a new scene
		this.block;//this will turn off other actions deafalt is to just turn itself off 
		this.trigger=actionJSON_.trigger;//time/click/onEnd are the basic but could be any sensable action...
		this.elicit=actionJSON_.elicit;// display/clickable/...
		this.delay=actionJSON_.delay;//time/click are the basic but could be any sensable action...
		this.occurrence=actionJSON_.occurrence
		this.passOnInheritance=undefined;

		this.onEventBind = this.onEvent.bind(this)


		this.isActive=false;
		this.wasActivated=false;


		this.conditionals=[];

		if(actionJSON_.conditions != undefined){
			//this.conditionals=[] //all contitions are evaluated as AND conditions
			for(let condition of actionJSON_.conditions){
				this.conditionals.push(new Conditional(condition));
			}
		}


		//this.order=1;
		this.bePositionSet=false;

		this.scene=scene_;
		this.html={};
		//this.html.backEnd={}

		this.outIndex;
		this.inIndex;


		this.pos={};
		this.pos.set=false;


		this.indices=[]

		//this.pos.y




		this.height;

		this.activations=0;
		//this.setHeight()
		//this.width=200;
		// this.html.be.pos={};
		// this.html.be.pos.x={};
		// this.html.be.pos.y={};




		// console.log(actionJSON_.id)
		// console.log(actionJSON_.passOnInheritance)
		// if(actionJSON_.passOnInheritance != undefined){
		// 	this.passOnInheritance=[]
		// 	// console.log(this.id)
		// 	// console.log(actionJSON_.passOnInheritance)
		// 	for(let i in actionJSON_.passOnInheritance){
		// 		this.passOnInheritance[i]=this.scene.contentsLib[actionJSON_.passOnInheritance[i]];
		// 	}
		// 	// console.log(this.passOnInheritance)
		// }



		// this.link(actionJSON_);


		if(!isNaN(actionJSON_.tailID)){//(true is content) if target is numbers it is an event if it is letters it is a scene // returns true if it starts with numbers

			this.tail=this.scene.getContentByID(actionJSON_.tailID);
			//this.tail.actionsOut.push(this);
			this.tail.addActionOut(this)
		}else{//(tail is a scene)
			if(actionJSON_.tailID != this.scene.id){
				console.log(actionJSON_.tailID +  " != " + this.scene.id)
				console.log("Scene trigger and scene object do not match");
			}
			this.tail=this.scene;
			
			//this.tail.addActionOut(this) //need to add this function the scene object ???
			
			//this adds actions out to all contand AND SCENES
			this.tail.actionsOut.push(this)

			
			
		}


		if(!isNaN(actionJSON_.headID)){//ibid
			this.head=this.scene.getContentByID(actionJSON_.headID);
			//this.head.actionsIn.push(this);

			this.head.addActionIn(this)
		}else{
			this.head=this.scene.story.scenesLib[actionJSON_.headID];

			//this.head.addActionIn(this) //need to add this function the scene object ???
			this.head.actionsIn.push(this)
		}



		

	}

	rewind(){
		if(this.wasActivated){
			this.wasActivated=false;
			this.activations--;

			if(this.elicit=="display"){
				this.undisplayContent();
			}else if(this.elicit=="play"){
				this.unplayContent();
			}else if(this.elicit=="cue"){
				this.uncueContent()
			}else if(this.elicit=="hide"){
				this.unhideContent();
			}
			else if(this.elicit=="clickable"){
				this.unactivateContent()
			}else if(this.elicit=="unclickable"){
				this.undeactivateContent();
			}
		}
	}

	timerOutstanding(){
		return this.timer!=undefined;
	}

	skip(skipTime_){
		if(this.timer!=undefined){
			//console.log("skip: " + this.id + " : " + this.timer)
			return this.timer.skip(skipTime_); //returns the time in scene after skip
		}
		return 0;
	}

	reset(){
		this.bePositionSet=false;
		this.isActive=false;
		this.wasActivated=false;
	}

	onEvent(){
		
		this.activate(true);
	}
	onEventConditioanl(){
		// if(this.tail.)
		// this.activate();
	}

	addEventListener(){
		//console.log("adding EL to " + this.tail.id + " tigger " + this.head.id)
		
		//this.onEventBindConditional = this.onEventConditioanl.bind(this)
		
		if(this.trigger=="click"){

			this.tail.html.fe.addEventListener("click", this.onEventBind);
			// this.tail.parentScene.addActiveClickableContent(this.tail);
		}else if(this.trigger=="onEnd"){
			console.log("ON end")
			// this.tail.html.fe.addEventListener("ended", this.onEventBind);
			this.tail.html.fe.addEventListener("ended", function(){

				this.activate(true);
			}.bind(this));

			
		}
		
	}
	removeEventListener(){
		this.tail.html.fe.removeEventListener("click", this.onEventBind );
	}
	activate(autoPlay_){ //should is play automaticly or wait for a play 
		this.isActive=true;
		
		
		if(this.conditionals != undefined){
			for(let conditional of this.conditionals){
				if(eval(conditional.variableString) == false){
					return;
				}	
			}
			this.activateNow(autoPlay_);
		}else{

			this.activateNow(autoPlay_);
		}

	}

	selectIn(){
		this.html.svg.classList.add("selected-in")
	}
	deselectIn(){
		this.html.svg.classList.remove("selected-in")
	}

	selectOut(){
		this.html.svg.classList.add("selected-out")
	}
	deselectOut(){
		this.html.svg.classList.remove("selected-out")
	}


	resumeTimer(type_,delay_){
		// console.log("PLAYING ???  " + currentStory.playing)
		
		if(type_=="play" && currentStory.playing==false){

		}else{
			this.timer.resume();
		}
		
		
	}

	activateNow(autoPlay_){

		this.wasActivated=true;
		this.activations++;

		if(this.elicit=="display"){
			this.displayContent(this.delay,autoPlay_);
		}else if(this.elicit=="play"){
			this.playContent(this.delay,autoPlay_)
			// console.log(autoPlay_)
			// if(autoPlay_==false){
			// 	this.cueContent(this.delay)
			// }else{
			// 	this.playContent(this.delay)
			// }
		}else if(this.elicit=="cue"){
			this.cueContent(this.delay,autoPlay_)
		}else if(this.elicit=="hide"){
			this.hideContent(this.delay,autoPlay_);
		}
		else if(this.elicit=="clickable"){
			this.activateContent(this.delay,autoPlay_)
			
		}else if(this.elicit=="unclickable"){
			this.deactivateContent(this.delay,autoPlay_);
		}
	
	}

	displayContent(delay_, autoPlay_){
		
		if(delay_==null){
			delay_=0;
		}
		// if(this.head instanceof Scene){
		// 	console.log("Create timer for display ")
		// }
		
		
		//prevent loosing timers behind that are not assigned
		if(this.timer != undefined){
			this.removeTimer()
		}


		this.timer=new Timer(function(){
			if(this.head instanceof Content){
				console.log("display: " + this.head.id+ " ++++++++++++++++++++")
				this.head.display();
				
				
				//these should just be the actions out not the clickable **
				this.head.activateActionsOut();
			}else if(this.head instanceof Scene){
				// currentStory.clearActive();
				// currentStory.play();
				currentStory.newScene(this.head,true,"default");
			}
			this.removeTimer()

		}.bind(this), delay_*1000, this);
		

		if(autoPlay_){
			this.resumeTimer("display",delay_)
		}
		
	}

	undisplayContent(){
		if(this.timer != undefined){
			this.timer.pause();
			this.removeTimer()
		}

		if(this.head instanceof Content){

			this.head.undisplay();
		}
	}


	hideContent(delay_,autoPlay_){
		if(delay_==null){
			delay_=0;
		}

		this.timer=new Timer(function(){
			if(this.head instanceof Content){
				this.deactivateContent(0);//deactivate before hiding
				
				this.head.activateExitEffects();
			}else if(this.head instanceof Scene){
				this.head.hide();
			}

			this.removeTimer()

		}.bind(this), delay_*1000,this);

		if(autoPlay_){
			this.resumeTimer("hide",delay_)
		}
	}

	unhideContent(){
		if(this.timer != undefined){
			this.timer.pause();
			this.removeTimer()
		}

		if(this.head instanceof Content){
			this.head.unhide();
		}
	}



	cueContent(delay_,autoPlay_){
		if(delay_==null){
			delay_=0;
		}
		
		this.timer=new Timer(function(){
			if(this.head instanceof Content){
				
				
				this.head.addToActiveVideo();
				
			}
			
			this.removeTimer()

		}.bind(this), delay_*1000,this);
		
		if(autoPlay_){
			this.resumeTimer("cue",delay_);
		}
	}

	uncueContent(){
		if(this.timer != undefined){
			this.timer.pause();
			this.removeTimer()
		}

		if(this.head instanceof Content){
			this.head.removeFromActiveVideo();
		}
	}

	playContent(delay_,autoPlay_){
		if(delay_==null){
			delay_=0;
		}
		this.timer=new Timer(function(){
			if(this.head instanceof Content){
				console.log("play: " + this.head.id + " --------------------")
				this.head.play();
			}
			
			this.removeTimer()
		}.bind(this), delay_*1000,this);

		if(autoPlay_){
			this.resumeTimer("play",delay_)
		}
	}
	
	unplayContent(){
		if(this.timer != undefined){
			this.timer.pause();
			this.removeTimer()
		}

		if(this.head instanceof Content){
			console.log(this.head)

			this.head.unplay();
		}
	}

	activateContent(delay_,autoPlay_){
		// console.log(autoPlay_)

		if(delay_==null){
			delay_=0;
		}

		this.timer=new Timer(function(){
			this.head.activateClickable();
			this.removeTimer()
		}.bind(this), delay_*1000,this);

		if(autoPlay_){
			this.resumeTimer("activate",delay_)
		}
	}

	unactivateContent(){
		if(this.timer != undefined){
			this.timer.pause();
			this.removeTimer()
		}

		if(this.head instanceof Content){
			this.head.unactivateClickable();
		}
	}

	deactivateContent(delay_,autoPlay_){
		if(delay_==null){
			delay_=0; 
		}

		this.timer=new Timer(function(){
			this.head.deactivateClickable();
			this.removeTimer()
		}.bind(this), delay_*1000,this);

		if(autoPlay_){
			this.resumeTimer("deactivate",delay_)
		}
	}

	undeactivateContent(){
		if(this.timer != undefined){
			this.timer.pause();
			this.removeTimer()
		}

		if(this.head instanceof Content){
			this.head.undeactivateClickable();
		}
	}

	makeClickableContent(){


	}

	setYPosition(topPos_, setTime_){
		if(topPos_ == null){
			topPos_ = this.pos.y;
		}
		if(this.pos.set!=setTime_){//this.pos.setTime!=setTime_){
			this.pos.set=setTime_;//setTime_;
			this.pos.y = topPos_ //+ this.tail.actionsOut.indexOf(this)*4;
			//this.pos.x = leftPos_
			//this.pos.x = this.index * 100;
			// this.


			if(this.head instanceof Content){
				//console.log()
				this.head.cNode.setYPosition(topPos_+this.height, this);

			}else if(this.head instanceof Scene){
				this.scene.sudoContent.out[this.head.id].cNode.setYPosition(topPos_+this.height, this);
			}


			// else if(this.head instanceof Scene){
			// 	this.head.cNode.setYPosition(topPos_+this.height, this);
			// }


			// if(this.html.svg != undefined){
			// 	//console.log(this.pos.y + "px")
			// 	this.html.svg.style.top = this.pos.y + "px";
			// 	// this.html.svg.style.left = this.pos.x +"px";
			// }	
		}
	}

	updateYPosition(setTime_){
		if(this.pos.set!=setTime_){//this.pos.setTime!=setTime_){
			this.pos.set=setTime_;//setTime_;
			
			this.pos.y = this.tailElicitNode.posOut.y;


			if(this.head instanceof Content){
				this.head.cNode.updateYPosition(setTime_);

			}else if(this.head instanceof Scene){
				this.scene.sudoContent.out[this.head.id].cNode.updateYPosition(setTime_);
			}


			// else if(this.head instanceof Scene){
			// 	this.head.cNode.setYPosition(topPos_+this.height, this);
			// }


			if(this.html.svg != undefined){
				//console.log(this.pos.y + "px")
				this.html.svg.style.top = this.pos.y + "px";
				// this.html.svg.style.left = this.pos.x +"px";
			}	
		}
	}

	update(){

		this.updateHeight();
		this.updateWidth();

		//console.log(this.width)
		this.html.path=hArrowSVG(this.width, this.height, 2, this.elicit+"_arrow");
		this.html.svg.innerHTML = hArrowSVG(this.width, this.height, 2, this.elicit+"_arrow");
		

		if(this.tailElicitNode instanceof ElicitNode){
			//console.log(this.tailElicitNode.pos)
			this.html.svg.style.left=this.tailElicitNode.posOut.x + "px";
		}




	}

	// shiftPositionsCastcade(){

	// }

	getHeight(){
		if(this.trigger=="click"){
			return clickScale + timeScale*this.delay;
		}else if(this.trigger=="time"){
			return timeScale*this.delay;
		}

	}

	updateHeight(){
		this.height = this.getHeight();//this.headElicitNode.posIn.y - this.pos.y//this.tailElicitNode.posOut.y 
	}

	updateWidth(){
		if(this.tailElicitNode instanceof ElicitNode){
			this.width = this.headElicitNode.posIn.x - this.tailElicitNode.posOut.x;
		}else if(this.headElicitNode!=undefined){//??????????????????????????? remove this condition !!!!!!!! onEnd create the problem because the was no elicit node there
			console.log(this)
			console.log(this.headElicitNode)
			console.log(this.head)
			console.log(this.head.cNode)
			console.log(this.head.cNode)
			this.width = this.headElicitNode.posIn.x - 0;//this.tailElicitNode.posOut.x
		}
		
	}



	getHeadPosition(){
		//let minHeight=undefined;
		let headPos={};
		headPos.y = 0;
		headPos.x=this.pos.x+this.width;
		if(this.pos.set){
			headPos.y = this.pos.y+this.height;
		}
		
		return headPos;
		
	}

	setSize(){
		// console.log("SET SIZE!!!!!!!!!!")
		this.setInitalHeight();
		// console.log("Height :   " + this.height)
		this.setInitalWidth();
	}

	setInitalHeight(){
		if(this.trigger == "time" || this.trigger == "onEnd"){
			// console.log("this.delay :   " + this.delay)
			// console.log(this)
			this.height=this.delay*timeScale;
		}else if(this.trigger == "click"){
			// console.log("clickScale:   " + clickScale)
			if(this.delay != undefined){
				this.height = clickScale + this.delay*timeScale; 
			}else{
				this.height = clickScale;
			}
			
		}
	}
	setInitalWidth(){
		// if(this.head instanceof Scene){
		// 	if(this.tail instanceof Scene){
		// 		this.width=(0)
		// 	}else{
				
		// 		this.width=(0 - this.tail.cNode.index)*100
		// 	}
		// }
		// else if(this.tail instanceof Scene){
		// 	this.width=(this.head.cNode.index - 0)*100
		// }else{
		// 	this.width=(this.head.cNode.index - this.tail.cNode.index) 
		// }
		this.width=0;//this.head.cNode - this.tail.cNode
	}
	// addIndex(index_){
	// 	// if(this.indices==undefined){
	// 	// 	this.indices=[]
	// 	// }
	// 	if(this.indices.indexOf(index_) == -1){
	// 		this.indices.push(index_);
	// 		if(this.head instanceof Content){
	// 			this.head.node.addIndex(index_+1);
	// 		}
	// 	}
		
	// }

	// setIndex(index_){
	// 	// if(this.indices==undefined){
	// 	// 	this.indices=[]
	// 	// }

		
	// 	if(this.index == undefined){
	// 		this.index = index_;
	// 		if(this.head instanceof Content){
	// 			this.head.cNode.setIndex(index_+1);
	// 		}

	// 	}

		
	// }

	createBackEndHTML(){
		//actionArrowSVG
		

		this.html.container = document.createElement("div");

		this.html.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		this.html.svg.classList.add("connector-line")
		this.html.svg.classList.add("click")

		// console.log("setWidth of arrow  " + this.width+ "   ,    " + this.height)
		//this.html.svg.innerHTML = hArrowSVG(this.width, this.height, 2, "dashed");
		
		this.html.svg.innerHTML = hArrowSVG(this.width, this.height, 2, this.elicit+"_arrow");
		//console.log(this.html.svg)
		this.html.container.append(this.html.svg);

		// console.log(log)
		

		this.html.svg.style.top = this.pos.y + "px"
		this.html.svg.style.left = (this.pos.x) +"px"
		//console.log(this.pos.x +"px")
		//this.html.container.style.top=this.pos.y;
	}


	removeTimer(){
		// console.log(this)
		if(this.timer!=undefined){
			this.timer.pause();
		}
		
		this.timer=undefined;
	}


};

Action.prototype.updateOutInIndexes=function(){

	this.outIndex=this.tail.actionsOut.indexOf(this);
	this.inIndex=this.head.actionsIn.indexOf(this);

}
Action.prototype.getJSON=function(){
// "id":"500",
// "tailID":"aa",
// "headID":"001",
// "block":[],
// "type":"time",
// "delay":0
	let jsonAction={}

	jsonAction.id=this.id
	jsonAction.tailID=this.tail.id;//either the scene itself or content object
	jsonAction.headID = this.head.id;//either content of a new scene
	jsonAction.block=this.block;//this will turn off other actions deafalt is to just turn itself off 
	jsonAction.trigger = this.trigger;//time/click are the basic but could be any sensable action...
	jsonAction.elicit = this.elicit;
	jsonAction.delay = this.delay;//time/click are the basic but could be any sensable action...
	
	jsonAction.conditions=[]
	for(let i in this.conditionals){
		console.log(i)
		console.log(this.conditionals[i]["variableString"])

		jsonAction.conditions.push(this.conditionals[i]["variableString"]);
	}
	
	//console.log(this.conditionals)
	return jsonAction;

}


