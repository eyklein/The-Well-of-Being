class TrackAudioEffect extends AudioEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		
		super(JSON_,parentContent_,effectCatagory_);
		this.type="track";
	}

	apply(){
		this.parentContent.track=this.vareables.value;

		this.parentContent.updateVolume()
	}

	unapply(){
		this.parentContent.track="";
		this.parentContent.updateVolume()
	}
}
