// function allowDrop(ev) {
// 		console.log("allow drop")
// 		ev.preventDefault();
//  }

//  function dragStart(ev) {
//  	console.log(ev)
//  	console.log(ev.target)
//  	// ev.preventDefault();

//  	ev.target.style.left=ev.mouseX+"px"
    

//     ev.dataTransfer.setData("Text", ev.target.id);

//     ev.dataTransfer.setDragImage(document.createElement("div"), 0, 0);
//  }



//   function dragging(ev) {
//   	ev.preventDefault()
//  	console.log("dragging")
//  }


//  function drop(ev) {
//  	console.log(" drop!!!!")
//      ev.preventDefault();
//      var data = ev.dataTransfer.getData("Text");
//      var element = document.getElementById(data);

//      var style = window.getComputedStyle(element);
//      var top = parseInt(style.top.replace("px"));
//      var left = parseInt(style.left.replace("px"));

//      top += ev.offsetY;
//      left += ev.offsetX;

//      element.style.top = top + "px";
//      //No X-axis movement...
//      //element.style.left = left + "px";
//  }

class PanBarContent extends Content{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)
		
		this.htmlParent={};

		this.name="panbar";
		
		this.targetID=this.content.target;
		
		this.type="panBox";
		this.cNode=new ContentNode(this);
	}

	createFrontEndHTML(){
		super.createFrontEndHTML();
		this.target=this.parentScene.contentsLib[this.targetID]



		this.html.fe = document.createElement("div");
		this.html.fe.style.width="10px"
		this.html.fe.style.height="100%"

		this.html.bar=document.createElement("div");
		this.html.bar.style.height="100%";
		this.html.bar.style.width="100%";
		this.html.bar.style["background-color"]="#999";
		this.html.fe.append(this.html.bar);

		this.html.round=document.createElement("div");
		this.html.round.innerHTML="< >";
		this.html.round.style.height="3vw";
		this.html.round.style.width="4vw";
		this.html.round.style.transform="translate(-1.5vw,-1.5vw)";

		this.html.round.style.position="absolute";
		this.html.round.style.top="50%";
		this.html.round.style["background-color"]="#999";
		this.html.round.classList.add("circle");
		this.html.fe.append(this.html.round);




		this.html.fe.classList.add("draggable")

		// this.html.fe.draggable=true;

		// // this.parentScene.html.fe.container.addEventListener("ondrop",drop) ;
		// // this.parentScene.html.fe.container.addEventListener("ondragover",allowDrop);
		// this.html.fe.addEventListener('dragstart', dragStart);
		// this.html.fe.addEventListener('drag', dragging);


		// this.html.fe.addEventListener("drag", function(e){
		// 	console.log(e)
		// })


		$(this.html.fe).draggable({
		    axis: "x"
		});


		$(this.html.fe).on('mousedown', function() {
				var x1 =  -5;//$(this.html.fe).position().left;
				var x2 = $(window).width()-5//$(this.html.fe).position().left;
				//var x2 = x1;

				var y1 = $(this.html.fe).position().top;
				var y2 = y1; //($(window).height() + $(this.html.fe).position().top);
				$(this.html.fe).draggable('option', 'containment', [x1, y1, x2, y2]);
			}.bind(this));


		

		$(this.html.fe).on('drag', function(e) {
			// console.log(1)
			// (e.target.offsetLeft+5) /window.innerWidth;
			// console.log((e.target.offsetLeft+5) /window.innerWidth)

			this.target.pan((e.target.offsetLeft+5) /window.innerWidth);

		}.bind(this));


		
		
		
		this.createEffects();

		this.applyEffects();



		
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
			// else if(effect=="dimensions"){
			// 	this.effects.general[effect]=new DimensionsTextEffect(this.JSONData.effects.general[effect],this)
			// }
			else if(effect=="font"){
				this.effects.general[effect] = new FontTextEffect(this.JSONData.effects.general[effect],this)
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

		console.log("PAN BAR FRON END")
		console.log(this.htmlParent)
		console.log(this.html.fe)
		
		this.htmlParent.append(this.html.fe);

		this.html.fe.style.display="block";
		
	}

}