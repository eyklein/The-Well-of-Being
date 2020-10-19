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
		this.id=setInterval(this.frame.bind(this), this.interval); //5=this.interval
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