

class MediaContent extends Content{
	constructor(contentJson_,parentScene_){ //,url_, content_, propertiesJSON_
		super(contentJson_,parentScene_)

		this.startTime=this.parentScene.getPlayedTime();
		this.endTime=undefined;

	}
	stop(){ //audio at end
		let remaining=0;
		if(this.html.fe.duration){
			remaining=(this.start + this.html.fe.duration) - this.html.fe.currentTime
			this.html.fe.currentTime=this.start + this.html.fe.duration;
		}else{
			console.log("durration is not defined")
			console.log(this.html)
		}
		
		this.pause()

		return remaining*1000+this.startTime;
	}
	mute(isMute_){
		this.html.fe.muted=isMute_;
	}
}


// currentStory.currentScene.contentsLib[901].html.fe.onmousemove=function(e){currentStory.currentScene.contentsLib[901].html.fe.currentTime=(e.screenX/window.innerWidth*20)}




