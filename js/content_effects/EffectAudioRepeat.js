class RepeatAudioEffect extends AudioEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		
		super(JSON_,parentContent_,effectCatagory_);

		this.type="repeat";

	}

	apply(){
		if(this.vareables.isOn){
			console.log("LOOPING!!!!!!!!")
			this.parentContent.loop=true;
		}

	}
	unapply(){
		if(this.vareables.isOn){
			this.parentContent.loop=false;
		}
	}
}
