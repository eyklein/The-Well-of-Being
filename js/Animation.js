class Animation{
	constructor(JSON_, content_){
		this.content=content_;
		this.interval=5;
		this.duration=JSON_.interval;
		this.style=JSON_.style;
		this.startValue=JSON_.startValue;
		this.endValue=JSON_.endValue;
		this.minValue=Math.min(this.endValue, this.startValue);
		this.maxValue=Math.max(this.endValue, this.startValue);
		this.unit=JSON_.unit;
		this.currentValue=this.startValue;
		this.increment = (this.endValue-this.startValue) / (duration/this.interval)
	}

	start(){
		this.id=setInterval(frame, this.interval); //5=this.interval
	}


	frame() {
		
		if (this.isEnded()) {
			clearInterval(this.id);
		} else {
			this.draw()
		}
	}
	draw(){
		
		this.currentValue+=this.increment;
		this.content.html.fe.style = this.currentValue + this.unit;

	}

	isEnded(){
		return this.inRange(this.currentValue, this.minValue, this.maxValue, this.endValue);
	}

	inRange(val_,min_,max_,target_) {
	  if (val_ > max_ || val_<min || val_==target_){
	    return true;
	  } 
	  else{
	    return false;
	  }
	}
}



// this.animations = []
		// this.animations.push(setInterval(frame, 5));


	// 	animateFrames() {
	// 	for(let i in this.animations){

	// 		if (/* test for finished */) {
	// 			clearInterval(this.animations[i]);
	// 		} else {
	// 		/* code to change the element style */ 
	// 		}
	// 	}
		
		
	// }