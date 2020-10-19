class WindowManager{
	constructor(){
		// this.sceneModual={};
		// this.activeModual;


		this.html={};
		this.html.topBar=document.getElementById('top-bar');
		this.html.content=document.getElementById('content');
		this.html.bottomBar=document.getElementById("bottom-bar");

		this.html.scrollbarX=document.getElementById('scrollbarX');
		this.html.scrollbarThumbX=document.getElementById('scrollbarX-thumb');

		this.html.scrollbarThumbX.addEventListener("mousedown",function(){
			
		    $(this.html.scrollbarThumbX).data('pressed', true);
		}.bind(this));



		this.html.scrollbarThumbX.addEventListener("mouseup",function(){
			
		    $(this.html.scrollbarThumbX).data('pressed', false);
		}.bind(this));


		this.html.captionsSwitch = document.getElementById("captions-switch");
		this.captionsWasOn=this.html.captionsSwitch.checked; // where captions on before reading was turned off
		
		this.html.readingSwitch = document.getElementById("reading-switch");

		this.html.pageTurnSwitch = document.getElementById("pageTurn-switch");
		this.pageTurnWasOn=this.html.readingSwitch.checked; // where captions on before reading was turned off

		this.html.backgroundVolumeSwitch = document.getElementById("backgroundVolume-switch");
		

		//captions
		this.html.captionsSwitch.addEventListener("change",function(){
			if(this.html.readingSwitch.checked==true){
				this.captionsWasOn=this.html.captionsSwitch.checked
			}else{
				this.html.captionsSwitch.checked=false;
				shake(this.html.readingSwitch.parentElement.parentElement);
			}



			if(this.html.captionsSwitch.checked){
				currentStory.turnCaptionsOn(true);
			}else{
				currentStory.turnCaptionsOn(false);
			}
			
		}.bind(this));


		//pageTurn
		this.html.pageTurnSwitch.addEventListener("change",function(){
			if(this.html.readingSwitch.checked==true){
				this.pageTurnWasOn=this.html.pageTurnSwitch.checked
			}else{
				this.html.pageTurnSwitch.checked=false;
				shake(this.html.readingSwitch.parentElement.parentElement);
			}

			if(this.html.pageTurnSwitch.checked){
				currentStory.pageTurnOn(true);
			}else{
				currentStory.pageTurnOn(false);
			}
			
		}.bind(this));


		//reading
		this.html.readingSwitch.addEventListener("change",function(){
			
			if(this.html.readingSwitch.checked==false){
				this.turnReadingOff();
			}else{
				this.turnReadingOn();
			}

			

		}.bind(this));


		








		$(this.html.scrollbarThumbX).draggable({
		    axis: "x"
		});


		$(this.html.scrollbarThumbX).on('mousedown', function() {
			// $(this.html.scrollbarThumbX).data('pressed', true);

			$( this.html.scrollbarThumbX ).draggable({
			    stop: function (){
			    	$(this).data('pressed', false);
			    	
					var widthBar=parseFloat($(this).parent().css("width"));
					var widthThumb=parseFloat($(this).css("width"));
					var l = parseFloat($(this).css("left")) ;
					var r = parseFloat($(this).css("left"))+widthThumb;  //) / (parseFloat($(this).parent().css("width"))) ) 

					if(l<0){
						$(this).css("left" , "0px");
					}else if(r>widthBar){
						l=widthBar-widthThumb;
						l=l+'px'
						$(this).css("left" , l);
					}else{
						l=l+"px";
						$(this).css("left" , l);
					}
			    }
			});


		}.bind(this));

		$(this.html.scrollbarThumbX).on('drag', function(e) {
			let thumb = this.html.scrollbarThumbX;
			let lThumb = parseFloat($(thumb).css("left"));

			let wThumb = parseFloat($(thumb).css("width"));

			let wBar = parseFloat($(this.html.scrollbarX).css("width"));

			let percent=lThumb/(wBar-wThumb);

			scrollTo(percent*document.width*(currentStory.scrollOrderArray.length-1));

		}.bind(this));


		this.addFullScreen();
		this.addPlayPauseButton();
		this.addNextBackButtons();
		this.displayPauseButton();
		//this.displayPlayButton();
		// currentStory.updatePlayPause();
		this.addVolumeSliders();
		//this.createSceneModual();
		this.createTopButtons();

		this.createFlashButtons();





		this.leftPanel=document.getElementById("left-panel");
		this.leftPanel.addEventListener("mouseover",function(){
			let currentTextBox = currentStory.currentScene.contentsLib["003"];
			if(currentTextBox != undefined){
				currentTextBox.html.fe.classList.add("pullOut")
			}
		});
		this.leftPanel.addEventListener("click",function(){currentStory.backButton()});
		this.leftPanel.addEventListener("mouseout",function(){
			let currentTextBox = currentStory.currentScene.contentsLib["003"];
			if(currentTextBox != undefined){
				currentTextBox.html.fe.classList.remove("pullOut")
			}
		});



		this.rightPanel=document.getElementById("right-panel");

		this.rightPanel.addEventListener("click",function(){
			// currentStory.scenesLib[id].html.fe.container.classList.add("shift-left");
			currentStory.skip();

			// this.shiftScenesLeft(false);

			setTimeout(
				function(){
					if(currentStory.currentScene.finishedPlaying==true && currentStory.currentScene.next.auto==true){
						this.shiftScenesLeft(true);
					}
				}.bind(this),500);

		}.bind(this));
		this.rightPanel.addEventListener("mouseover",function(){

			if(currentStory.currentScene.finishedPlaying==true){
				this.shiftScenesLeft(true);
			}
		}.bind(this));

		// this.rightPanel.addEventListener("mousemove",function(){
		// 	for(let id in currentStory.scenesLib){
		// 		if(currentStory.currentScene.finishedPlaying==true){
		// 			currentStory.scenesLib[id].html.fe.container.classList.add("shift-left");
		// 		}
		// 	}
		// });
		this.rightPanel.addEventListener("mouseout",function(){
			this.shiftScenesLeft(false);
		}.bind(this));







	}


	turnReadingOn(){
		if(this.captionsWasOn){
			this.html.captionsSwitch.checked=true;
			currentStory.turnCaptionsOn(true);
		}
		if(this.pageTurnWasOn){
			this.html.pageTurnSwitch.checked=true;
			currentStory.pageTurnOn(true);
		}

		this.html.captionsSwitch.parentElement.parentElement.parentElement.classList.remove('disabled');
		this.html.pageTurnSwitch.parentElement.parentElement.parentElement.classList.remove('disabled');
		
		currentStory.pageTurnIsOn = this.html.readingSwitch.checked;
		currentStory.readingIsOn = this.html.readingSwitch.checked;

		if(this.html.readingSwitch.checked==false){
			this.html.readingSwitch.checked=true;
		}
		

		currentStory.turnReadingOn();
	}

	turnReadingOff(){
		//turn off captions (no captions if not reading)
		if(this.captionsWasOn){
			this.html.captionsSwitch.checked=false;
			currentStory.turnCaptionsOn(false);
		}

		if(this.pageTurnWasOn){
			this.html.pageTurnSwitch.checked=false;
			currentStory.pageTurnOn(false);
		}
		this.html.captionsSwitch.parentElement.parentElement.parentElement.classList.add('disabled');
		this.html.pageTurnSwitch.parentElement.parentElement.parentElement.classList.add('disabled');

		currentStory.pageTurnIsOn = false;
		currentStory.readingIsOn = false;
		if(this.html.readingSwitch.checked){
			this.html.readingSwitch.checked=false;
		}
		

	
		currentStory.turnReadingOff();

	}


	// captionsTurnoff(){

	// }
	// readingTurnon(){

	// }
	// autoTurnTurnOn(){
		
	// }

	// captionsTurnoff(){

	// }
	// readingTurnoff(){

	// }
	// autoTurnTurnOff(){

	// }


	shiftScenesLeft(on_){
		if(on_){
			for(let id in currentStory.scenesLib){
				currentStory.scenesLib[id].html.fe.container.classList.add("shift-left");
			}
		}else{
			for(let id in currentStory.scenesLib){
				currentStory.scenesLib[id].html.fe.container.classList.remove("shift-left");
			}
		}
	}
	updateScrollBar(){
		this.html.scrollbarThumbX.classList.add("scrolling");
		let percent = (100*document.getElementById("scenes").scrollLeft/(document.width*(currentStory.scrollOrderArray.length-1)));

		let thumbPercent = parseFloat($(this.html.scrollbarThumbX).css("width"))/parseFloat($(this.html.scrollbarX).css("width"))

		percent=percent*(1-thumbPercent);
		$(this.html.scrollbarThumbX).css("left", percent+"%")
	}
	
	createMainButtons(){
		this.createGoToBackEndButton();
		this.createBackToStoryButton();
	}
	createTopButtons(){
		//if scense modual
		// this.sceneModual.createTopButtons();
	}

	deactivatePlayPause(){
		// this.play.style.display="block";
		// this.pause.style.display="none";
		if(!this.playPause.classList.contains("deactivated")){
			this.playPause.classList.add("deactivated")
		}
	}
	activatePlayPause(){
		if(this.playPause.classList.contains("deactivated")){
			this.playPause.classList.remove("deactivated")
		}
	}

	displayPlayButton(){
		// this.explandPlayPause()
		this.forceBottomVisible();
		this.playPause.classList.add("play");
		this.playPause.classList.remove("pause");
		this.playPause.classList.remove("rewind");
		this.play.style.display="block";
		this.pause.style.display="none";
		this.rewind.style.display="none";
	}
	displayPauseButton(){
		// this.contractPlayPause();
		this.playPause.classList.add("pause");
		this.playPause.classList.remove("play");
		this.playPause.classList.remove("rewind");
		this.play.style.display="none";
		this.rewind.style.display="none";
		this.pause.style.display="block";
	}
	displayRewindButton(){
		this.playPause.classList.add("rewind");
		this.playPause.classList.remove("pause");
		this.playPause.classList.remove("play");
		this.play.style.display="none";
		this.pause.style.display="none";
		this.rewind.style.display="block";
	}

	forceBottomVisible(){
		if(!this.html.bottomBar.classList.contains("explaned")){
			this.html.bottomBar.classList.add("explaned");
		}
	}
	explandPlayPause(){
		if(!this.playPause.classList.contains("explaned")){
			this.playPause.classList.add("explaned");
		}
		if(!this.html.bottomBar.classList.contains("explaned")){
			this.html.bottomBar.classList.add("explaned");
		}
	}
	contractPlayPause(){
		
		this.playPause.classList.remove("explaned");
		this.html.bottomBar.classList.remove("explaned");
	
	}

	addPlayPauseButton(){

		this.playPause= document.createElement("div");
		this.playPause.id="play-pause";
		this.playPause.classList.add("deactivated");
		this.playPause.style.opacity=.8;
		

		this.play= document.createElement("img"); //this.play.src="img/special/play-w.png";
		this.play.src="img/special/play.png";
		this.play.id="play";
		this.play.classList.add("play-pause");
		this.playPause.appendChild(this.play);

		this.pause= document.createElement("img");//this.pause.src="img/special/pause-w.png";
		this.pause.src="img/special/pause.png";
		this.pause.id="pause";
		this.pause.classList.add("play-pause");
		this.playPause.appendChild(this.pause);
		this.pause.style.display="none";

		this.rewind= document.createElement("img");
		this.rewind.src="img/special/rewind.png";
		this.rewind.id="rewind";
		this.rewind.classList.add("play-pause");
		this.playPause.appendChild(this.rewind);

		document.getElementById("bottom-bar").appendChild(this.playPause);
		

		this.playPause.addEventListener('click',function(){
			this.executePlayPauseRewind();
		}.bind(this));


	}
	addNextBackButtons(){
		

		this.nextBackButtons= document.createElement("div");
		this.nextBackButtons.id="next-back";
		this.nextBackButtons.style.opacity=.8;
		

		this.back= document.createElement("img"); //this.play.src="img/special/play-w.png";
		this.back.src="img/special/back.png";
		this.back.id="back";
		this.back.classList.add("next-back");
		this.nextBackButtons.appendChild(this.back);

		this.next= document.createElement("img"); //this.play.src="img/special/play-w.png";
		this.next.src="img/special/next.png";
		this.next.id="next";
		this.next.classList.add("next-back");
		this.nextBackButtons.appendChild(this.next);


		document.getElementById("bottom-bar").appendChild(this.nextBackButtons);
		

		// this.playPause.addEventListener('click',function(){
		// 	this.executePlayPauseRewind();
		// }.bind(this))


	}

	createFlashButtons(){
		this.flashPlayButton=document.createElement("img")
		this.flashPlayButton.src = "img/special/play-b.png";
		this.flashPlayButton.id = "play-flash-button";
		// this.flashPlayButton.onmousedown = 'return false'
		// this.flashPlayButton.onselectstart = 'return false'

		this.flashPauseButton=document.createElement("img")
		this.flashPauseButton.src = "img/special/pause-b.png";
		this.flashPauseButton.id = "pause-flash-button";
		// this.flashPauseButton.onmousedown = 'return false'
		// this.flashPauseButton.onselectstart = 'return false'

		document.getElementById("content").append(this.flashPlayButton);
		document.getElementById("content").append(this.flashPauseButton);

	}

	flashPlay(){

		this.flashPlayButton.classList.add("flash")
		setTimeout(function(){this.flashPlayButton.classList.remove("flash")}.bind(this),1000);
	}
	flashPause(){
		this.flashPauseButton.classList.add("flash")
		setTimeout(function(){this.flashPauseButton.classList.remove("flash")}.bind(this),1000);
	}

	addVolumeSliders(){
		this.mainVolume = document.getElementById("main-volume");

		this.mainVolume.value=100;

		this.mainVolume.addEventListener('change',function(e){

			currentStory.setMainVolume(e.target.value/100)

		})



		this.backgroundVolume = document.getElementById("background-volume");

		this.backgroundVolume.value=20;

		this.backgroundVolume.addEventListener('change',function(e){

			currentStory.setBackgroundVolume(e.target.value/100)

		})
		// this.volumes= document.createElement("div");
		// this.volumes.style.position="absolute";
		// this.volumes.style.top="0px";
		// this.volumes.style.left="0px";
		// this.volumes.style.height="100%";
		// this.volumes.style.width="25%";
	

		// document.getElementById("bottom-bar").appendChild(this.volumes);




		// this.mainVolumeSlider= document.createElement("input");
		// this.mainVolumeSlider.id="main-volume"
		// this.mainVolumeSlider.type="range";
		// this.mainVolumeSlider.classList.add("slider");
		// // this.mainVolumeSlider.orient="vertical";
		// this.mainVolumeSlider.style.position="absolute";
		// this.mainVolumeSlider.style.top="0px";
		// this.mainVolumeSlider.style.left="0px";
		// this.mainVolumeSlider.min=0 
		// this.mainVolumeSlider.max=100
		// this.mainVolumeSlider.step=1
		// this.mainVolumeSlider.value=currentStory.volume['main']*100;

		// this.mainVolumeSlider.addEventListener("input", function(){
		// 	currentStory.setMainVolume(this.mainVolumeSlider.value/100);
		// }.bind(this));
		

		// this.volumes.appendChild(this.mainVolumeSlider);


		// this.mainVolumeLable= document.createElement("lable");
		// this.mainVolumeLable.innerHTML="Main Volume"
		// this.mainVolumeLable.classList.add("volume-lable");
		// this.volumes.appendChild(this.mainVolumeLable);




		// this.backgroundVolumeSlider= document.createElement("input");
		// this.backgroundVolumeSlider.id="background-volume"
		// this.backgroundVolumeSlider.type="range";
		// this.backgroundVolumeSlider.classList.add("slider");
		// this.backgroundVolumeSlider.style.position="absolute";
		// this.backgroundVolumeSlider.style.bottom="0px";
		// this.backgroundVolumeSlider.style.left="0px";
		// this.backgroundVolumeSlider.step=1
		// this.backgroundVolumeSlider.min=0 

		// this.backgroundVolumeSlider.max=100
		
		// this.backgroundVolumeSlider.value=currentStory.volume['background']*100;

		// this.backgroundVolumeSlider.addEventListener("input", function(){
		// 	currentStory.setBackgroundVolume(this.backgroundVolumeSlider.value/100);
		// }.bind(this));

		// // this.backgroundVolumeSlider.value=0.1;
		// // console.log(currentStory.volume['background'])
		



		// //this.mainVolumeSlider.
		// //this.mainVolumeSlider.value=75
		// this.backgroundVolumeSlider.step=1

		// this.volumes.appendChild(this.backgroundVolumeSlider);

		// this.backgroundVolumeLable= document.createElement("lable");
		// this.backgroundVolumeLable.innerHTML="Background Volume"
		// this.backgroundVolumeLable.classList.add("volume-lable");
		// this.backgroundVolumeLable.style.bottom="0px"
		// this.volumes.appendChild(this.backgroundVolumeLable);





		// this.mainVolumeSlider.addEventListener("change", function(){
		// 	console.log(this.value)
		   
		//     //counter = parseInt(this.value);
		// });
		// this.mainVolumeSlider.addEventListener("click", function(){
		// 	console.log(this.value)
		    
		//     //counter = parseInt(this.value);
		// });
	}
	executePlayPauseRewind(){
		currentStory.executePlayPauseRewind(false);
	}

	togglePlayPause(flash_){
		currentStory.togglePlayPause();
		ths.flashPlay();

		if(flash_){
			ths.flashPlay();
		}

		
	}


	playStory(){
		currentStory.play();
	}


	updatePlayPauseButton(){
		let status = currentStory.getStatus();
		if(status=="paused"){
			// this.playPause.src=this.playPause.srcPlay;
			this.displayPlayButton();

			//console.log(this.playPause.src)
		}else if(status=="playing"){
			//this.playPause.src=this.playPause.srcPause;
			this.displayPauseButton();
		}else if(status=="ended"){
			// this.togglePlayPauseRewind()
			// console.log("rewind!")
			this.displayRewindButton();
		}
	}


	addFullScreen(){
		this.fullScreenButton= document.createElement("img");

		this.fullScreenButton.id="fullScreenButton";
		this.fullScreenButton.src="img/special/fullScreen.png"

		//this.fullScreenButton.id="fullScreenButton";

		document.getElementById("bottom-bar").append(this.fullScreenButton);

		this.fullScreenButton.addEventListener('click',function(){
			toggleFullscreen();
		}.bind(this))
	}

	toggleStoryBackEndButtons(button_){
		if(button_=="backEnd"){
			this.showBackEndButton()
			this.showStoryButton(false)
		}else if(button_=="story"){
			this.showBackEndButton(false)
			this.showStoryButton()
		}
	}

	//this.activeModual
	
	

	

	clearContent(){
		this.html.content.innerHTML = "";
	}
	clearTopBar(){
		this.html.topBar.innerHTML="";
	}


	showBackEndButton(conditional_){
		this.showButton(this.html.goToBackEndButton,conditional_);
	}
	showStoryButton(conditional_){
		this.showButton(this.html.backToStoryButton,conditional_);
	}
	showButton(button_,conditional_){
		if(conditional_==false){
			button_.style.display="none";

		}else{
			button_.style.display='block';
			
		}
	}

	createGoToBackEndButton(){
		this.html.goToBackEndButton = document.createElement("BUTTON");
		
		
		this.html.goToBackEndButton.innerHTML = "BACK END >";


		this.html.goToBackEndButton.style.display="none";
		this.html.topBar.append(this.html.goToBackEndButton);

		this.html.goToBackEndButton.backEndObject=this;
		this.html.goToBackEndButton.addEventListener ("click", function(event_) {
			console.log(event_.target.backEndObject)

			event_.target.backEndObject.display();

		});
	}

	createBackToStoryButton(){
		this.html.backToStoryButton = document.createElement("BUTTON");
		
		
		this.html.backToStoryButton.innerHTML = "< BACK TO STORY";
		this.html.backToStoryButton.style.display="none";
		this.html.topBar.append(this.html.backToStoryButton);
		this.html.backToStoryButton.backEndObject=this;
		this.html.backToStoryButton.addEventListener ("click", function(event_) {
		   //remove back end display then
		   event.target.backEndObject.toggleStoryBackEndButtons("backEnd")
			//alert("go back to story");
		   	//might need to be revised if path is imprtant
		   
		   resetContentDiv();
		   currentStory.newScene('aa')
		   //displayScene(currentStory.scenes[id])
		});

	}


}

WindowManager.prototype.display=function(){
	this.html.topBar.append(this.sceneModual.getTopButtons())
	this.toggleStoryBackEndButtons("story")
}
function resetContentDiv(){
	document.getElementById('content').innerHTML = "<div id='background_img' style='position:absolute; z-index:-10;' alt='background image'></div>	  	<div id='main_text' style='position:absolute; z-index:0;' alt='text'> </div>";

}



function pauseEvent(e){
    if(e.stopPropagation) e.stopPropagation();
    if(e.preventDefault) e.preventDefault();
    e.cancelBubble=true;
    e.returnValue=false;
    return false;
}


var mouseIsPressed=false;
document.onmousedown=function(){
	mouseIsPressed=true;
}
document.onmouseup=function(){
	mouseIsPressed=false;
}


function isFullscreen(){ return 1 >= outerHeight - innerHeight };


function toggleFullscreen() {
  let elem = document.documentElement

  if (!document.fullscreenElement) {
    elem.requestFullscreen().catch(err => {
      alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
    });
  } else {
    document.exitFullscreen();
  }
}






