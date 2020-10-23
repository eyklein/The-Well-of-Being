var pageLoaded=false;

var mouseDown = false;

var mouseDownTime;

var preScrollWasPlaying=false;

var autoScrolling=false;

//var backEnd;




var loadScreen


window.addEventListener("mousedown", function(e){
	// console.log("down")
	// console.log(e)
	mouseDownTime=e.timeStamp;
});

window.onload=function(){
	// currentStory.windowManager.addFullScreen();
	// currentStory.windowManager.addPlayPauseButton();
	//updateContentSize()


	currentStory = new Story();//start reading from first scene


		
	currentStory.windowManager=new WindowManager();
	pageLoaded=true;

	// console.log("audio loaded")
	// console.log(priorityAudioLoader.files)

	// console.log(priorityAudioLoader.files['audio/Background Noise.mp3']);
	// //LOAD AUDIO
	// for(let audioUrl in priorityAudioLoader.files){
	// 	console.log(audioUrl)
	// 	priorityAudioLoader.files[audioUrl].load();
	// }
	//priorityAudioLoader.files




	if(dataLoaded){//if the data is already loaded

		//console.log("dataLoaded first then pageLoaded")
		currentStory.startingScene = window.onload.data.startingScene;
		
		populateStory(window.onload.data.scenes)


		currentStory.loadAudio();
		
		// for(let audioUrl in priorityAudioLoader.files){
		// 	console.log(audioUrl)
		// 	priorityAudioLoader.files[audioUrl].load();
		// }
		
	}




	// $('#scenes').bind('scroll mousedown wheel DOMMouseScroll mousewheel keyup', function(evt) {
 //  	// detect only user initiated, not by an .animate though
 //  	console.log(evt.type)
	// //     if (evt.type === 'DOMMouseScroll' || evt.type === 'keyup' || evt.type === 'mousewheel') {
	// //     	console.log("A")
	// //     // up
	// //     if (evt.originalEvent.detail < 0 || (evt.originalEvent.wheelDelta && evt.originalEvent.wheelDelta > 0)) { 
	// //     	console.log("B")
	// //     // down.
	// //     } else if (evt.originalEvent.detail > 0 || (evt.originalEvent.wheelDelta && evt.originalEvent.wheelDelta < 0)) { 
	// //     	console.log("C")
	// //   }
	// // }
	// }); 
	// $("#scenes").mCustomScrollbar({
	// 				scrollButtons:{
	// 					enable:true
	// 				},
	// 				callbacks:{
	// 					onScrollStart:function(){ console.log("onScrollStart") },
	// 					onScroll:function(){ console.log($(this).data("mCS").trigger)},
	// 					onTotalScroll:function(){ console.log("onTotalScroll") },
	// 					onTotalScrollOffset:60,
	// 					onTotalScrollBack:function(){ console.log("onTotalScrollBack") },
	// 					onTotalScrollBackOffset:50,
	// 					whileScrolling:function(){console.log("whileScrolling")},
	// 					alwaysTriggerOffsets:false
	// 				}
	// 			});
				
				

	// document.getElementById("scenes").addEventListener("wheel",function(e){
	//   //console.log(e.target.scrollLeft)
	//   console.log("scrolling dom")
	//    	console.log(e)
	// })


	// $('#scenes').scroll($.debounce( 250, true, function(e){
	//     console.log("start scolling")

	// }));
	$('#scenes').scroll($.debounce( 250, function(e){
	    // $('#scrollMsg').html('DONE!');
	    // console.log("DONE Scroll!!!!!!!!!!");
	    // if($(currentStory.windowManager.html.scrollbarThumbX).data('pressed') == false){//not scrolling with bar

	    	easeToSceneFrame();
	    	currentStory.windowManager.html.scrollbarThumbX.classList.remove("scrolling");
	    // }
	    
	    // console.log("DONE!!")
	    // console.log(e)
	}));

	window.addEventListener("wheel", function(e){
		
		if(Math.abs(e.deltaY)>=Math.abs(e.deltaX)){
			if(e.deltaY!=0){
				scrollBy(e.deltaY*2)
			}
						
		}else{
			if(e.deltaX!=0){
				scrollBy(e.deltaX*2)
			}
		}
		
	})

	
	
	// document.getElementById("scenes").addEventListener('scroll', function(e) {
	// 	// autoScrolling=true;
	//     clearTimeout(scrollTimeout);
	//     scrollTimeout = setTimeout(function() {
	//     	// document.getElementById("scenes").classList.add("mandatory-scroll-snapping");
	//     	// autoScrolling=false
	//         // console.log('Scroll endedx');
	//         // easeToSceneFrame();
	//         // scrollTimeout=undefined;
	//     }, 100);
	// });


	// document.getElementById("scenes").addEventListener('scroll', function(e) {
	//   // console.log("HI")
	//   scenesLastScrollPosition = e.target.scrollLeft;
	//   // console.log(scenesLastScrollPosition)
	//   console.log(scenesTicking);
	//   if (!scenesTicking) {
	//     window.requestAnimationFrame(function() {
	//       scrollScenes(scenesLastScrollPosition);
	//       scenesTicking = false;
	//     });

	//     scenesTicking = true;
	//   }else{
	//   	console.log("?????????????????????")
	//   }
	// });

};

var scrollTraget=0;
function scrollBy(deltaX_, smooth_){
	if(smooth_){
		document.getElementById("scenes").scrollBy({"left":deltaX_,"top":0, behavior: 'smooth'});
	}else{
		document.getElementById("scenes").scrollBy({"left":deltaX_,"top":0});
	}
	currentStory.windowManager.updateScrollBar();
}
function scrollTo(targetX_){
	document.getElementById("scenes").scrollTo({"left":targetX_,"top":0});
}



var scrollTimeout;
var scenesLastScrollPosition=0;
let scenesTicking = false; 
function startScrolledToScene(scrollPos_) {

	let wasPlaying = currentStory.playing;
	  	let scrollingSceneValue=Math.round(scrollPos_/document.width*10)/10;

	  	console.log(scrollingSceneValue);

	  	let tenthsRemander = Math.round(scrollingSceneValue*10%10)
	  	if(tenthsRemander <= 1 || tenthsRemander > 9){
	  		if(currentStory.currentScene != currentStory.scrollOrderArray[Math.round(scrollPos_/document.width)]){
	  			// console.log("Pausing " + currentStory.currentScene.id)
	  			currentStory.currentScene.pause();
	  			// this.html.scrollbarThumbX

	  			currentStory.resumeScene(currentStory.scrollOrderArray[Math.round(scrollPos_/document.width)], wasPlaying);
	  			
	  		}
	  		
	  	}
  
  	
}












var testArrowContainer, testArrow;

var backEnd;

function populateStory(sceneData_){

	currentStory.loadScenesLib(sceneData_);//one or the other
		
	currentStory.createScenesFrontEndHTMLs();

	currentStory.createScenesContentEffectEditors();


	currentStory.backEnd = new BackEnd(currentStory);




}

function easeToSceneFrame(pos_){
	if(pos_==undefined){
		pos_=document.getElementById("scenes").scrollLeft;
	}
	let decScenePos = pos_/document.width;// 120/50=2.4 			80/50=1.6         
	let rounded= Math.round(decScenePos);// 2							2
	let shiftPercent = rounded - decScenePos ; 	// -0.4				`	0.4`

	if(Math.abs(shiftPercent)>.05 ){

		// console.log((shiftPercent*document.width)*.01)
		scrollBy((shiftPercent*document.width)*.1);	//-0.4*50 = -20			0.4*50=20 yes
		setTimeout(easeToSceneFrame,10);
	}else{
		// console.log("go")
		toSceneFrame();
	}

}

function toSceneFrame(pos_){
	if(pos_==undefined){
		pos_=document.getElementById("scenes").scrollLeft;
	}
	let decScenePos = pos_/document.width;// 120/50=2.4 			80/50=1.6         
	let rounded= Math.round(decScenePos);// 2							2
	let shiftPercent = rounded - decScenePos ; 	// -0.4				`	0.4`


	scrollBy(shiftPercent*document.width)	//-0.4*50 = -20			0.4*50=20 yes

	startScrolledToScene(pos_);

}




function handler(e){
	    //e.stopPropagation();
	   e.preventDefault();
	}

window.addEventListener('resize', updateContentSize);






