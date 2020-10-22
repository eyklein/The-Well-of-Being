class AnimationEffect {//extends ContentEffect

	constructor(JSON_,parentContent_,effectCatagory_){
		this.parentContent=parentContent_;
		this.effectCatagory=effectCatagory_;
		this.html={};
		this.html.be={}
		

		this.type="animation";
		
		// this.content=content_;
		this.interval=5;
		this.duration=JSON_.duration * 1000;
		this.style=JSON_.style;
		this.startValue=JSON_.startValue;
		this.endValue=JSON_.endValue;
		this.minValue=Math.min(this.endValue, this.startValue);
		this.maxValue=Math.max(this.endValue, this.startValue);
		this.unit=JSON_.unit;
		this.currentValue=this.startValue;
		this.increment = (this.endValue-this.startValue) / (this.duration/this.interval)

		this.status="none";

		

	}

	apply(){
		this.start();
	}

	remove(){
		
	}

	start(){
		if(this.id!=undefined){
			clearInterval(this.id)
		}
		this.currentValue=this.startValue;
		this.play();//this.id=setInterval(this.frame.bind(this), this.interval); //5=this.interval
	}
	play(autoRestart_){
		if(this.status == "none" || (this.status == "ended" && autoRestart_)){
			this.status="playing";
			this.start()
		}else if(this.status != "ended"){
			this.id=setInterval(this.frame.bind(this), this.interval); //5=this.interval
		}

		

		
	}
	pause(){
		this.status="paused";
		if(this.id!=undefined){
			clearInterval(this.id)
		}
		
	}

	frame() {

		if (this.isEnded()) {
			clearInterval(this.id);
			this.status="ended";
		} else {
			this.draw()
		}
	}

	draw(){
		this.currentValue+=this.increment;
		if(this.unit == "scale"){
			this.parentContent.html.fe.style[this.style] = "scale(" + this.currentValue + ")";
		}else{
			
			this.parentContent.html.fe.style[this.style] = this.currentValue + this.unit;
		}
		

	}

	isEnded(){
		return this.inRange(this.currentValue, this.minValue, this.maxValue, this.endValue);
	}

	inRange(val_,min_,max_,target_) {
	  if (val_ > max_ || val_<min_ || val_==target_){
	    return true;
	  } 
	  else{
	    return false;
	  }
	}

	



	createEditorHTML(){
  		

		
	}
}