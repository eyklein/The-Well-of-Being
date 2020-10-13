class AlternateKeyEffect extends ContentEffect{
	//this effect makes a ket an alrenate for a click of the active object
	//if should be placed in the clickable generic effects in the json

	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);

		this.type="alternateKey";


		this.clickEvent = document.createEvent('MouseEvents');
        this.clickEvent.initMouseEvent('click', true, true, window, 1, 12, 345, 7, 220, false, false, true, false, 0, null );

        this.boundClickFunction=this.clickFunction.bind(this)
       

	}

	apply(){

			document.addEventListener("keydown", this.boundClickFunction);
	}

	unapply(){

			document.removeEventListener("keydown", this.boundClickFunction);
	}

	createEditorHTML(){
		console.log("createEditorHTML");
	}

	clickFunction(e){
		if(this.vareables.keyCodes.indexOf(e.keyCode)!=-1){
			 this.parentContent.html.fe.dispatchEvent(this.clickEvent);
			 document.removeEventListener("keydown", this.boundClickFunction);
		}
	}


}