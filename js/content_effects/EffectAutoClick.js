class AutoClickEffect extends ContentEffect{
	//this effect makes a ket an alrenate for a click of the active object
	//if should be placed in the clickable generic effects in the json

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

		this.type="autoClick";



		this.clickEvent = document.createEvent('MouseEvents');
        this.clickEvent.initMouseEvent('click', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null );

        this.mouseClicked=false;

        this.boundManualPageTurn= this.manualPageTurn.bind(this)

        this.html=document.createElement("div");
        this.html.classList.add("next-timer")
        
        this.html.style.width="15vw";
        



       

	}

	apply(){
		console.log(this.vareables.conditional);
		console.log(eval(this.vareables.conditional));

		if(eval(this.vareables.conditional)){
			this.parentContent.html.fe.append(this.html)
			// this.html.style.display="block";
			this.drawTimeLeft = setInterval(this.draw.bind(this),15)
			this.startTime=Date.now();

			this.timeOut = setTimeout(function(){
	        	if(this.mouseClicked == false && currentStory.currentScene == this.parentContent.parentScene){
	        		clearInterval(this.drawTimeLeft)

	        		this.parentContent.html.fe.dispatchEvent(this.clickEvent);
	        	}
	        }.bind(this),this.vareables.time*1000);


	        document.addEventListener("click", this.boundManualPageTurn);
	    }

	}

	unapply(){
		if(eval(this.vareables.conditional)){
			this.parentContent.html.fe.remove(this.html);

			clearTimeout(this.timeOut)
	        document.removeEventListener("click", this.boundManualPageTurn);
	    }

	}

	draw(){
		let percentLeft = 1-(Date.now()-this.startTime)/(this.vareables.time*1000);
		// console.log(percentLeft)
		this.html.style.width=percentLeft*15+"vw";

	}

	createEditorHTML(){
		
	}

	manualPageTurn(){
		console.log("Switch to manuel ")
		this.html.style.display="none";
		this.mouseClicked=true;
		clearInterval(this.drawTimeLeft)
		window.clearTimeout(this.timeOut)
		document.removeEventListener("click", this.boundManualPageTurn);

	}

	


}