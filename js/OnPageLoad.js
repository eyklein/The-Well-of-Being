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
	//     // $('#scrollMsg').html('SCROLLING!');
	//     preScrollWasPlaying=currentStory.playing;
	//     if(preScrollWasPlaying){
	//     	// currentStory.pause();
	//     }
	//     // currentStory.pause();
	//     // console.log("start scrolling debounce")
	//     // console.log(e)

	// }));
	// $('#scenes').scroll($.debounce( 250, function(e){
	//     // $('#scrollMsg').html('DONE!');
	//     if(preScrollWasPlaying){
	//     	// currentStory.play();
	//     }
	//     // console.log("DONE!!")
	//     // console.log(e)
	// }));

	
	
	document.getElementById("scenes").addEventListener('scroll', function(e) {
		// autoScrolling=true;
	    clearTimeout(scrollTimeout);
	    scrollTimeout = setTimeout(function() {
	    	autoScrolling=false
	        console.log('Scroll ended');
	        scrollTimeout=undefined;
	    }, 100);
	});


	document.getElementById("scenes").addEventListener('scroll', function(e) {
	  // console.log("HI")
	  scenesLastScrollPosition = e.target.scrollLeft;
	  // console.log(scenesLastScrollPosition)

	  if (!scenesTicking) {
	    window.requestAnimationFrame(function() {
	      scrollScenes(scenesLastScrollPosition);
	      scenesTicking = false;
	    });

	    scenesTicking = true;
	  }else{
	  	console.log("?????????????????????")
	  }
	});

};
var scrollTimeout;
var scenesLastScrollPosition=0;
let scenesTicking = false; 
function scrollScenes(scrollPos_) {
	// console.log(currentStory.scrollOrderArray.length);
	// let widthSection = document.getElementById("scrolling-window").querySelectorAll(".scroll-section")[0].offsetWidth
	//console.log()

	// console.log($(selector))
	// console.log($(selector).data)
	// console.log($(selector).data.mCS)
	// console.log($(selector).data("mCS").trigger)

	// console.log(scrollPos_)

	
	let wasPlaying = currentStory.playing;


  	if(scrollTimeout==undefined || !autoScrolling){

  		

	  	let scrollingSceneValue=Math.round(scrollPos_/document.width*10)/10;

	  	console.log(scrollingSceneValue);

	  	let tenthsRemander = Math.round(scrollingSceneValue*10%10)
	  	if(tenthsRemander <= 1 || tenthsRemander > 9){
	  		if(currentStory.currentScene != currentStory.scrollOrderArray[Math.round(scrollPos_/document.width)]){
	  			// console.log("Pausing " + currentStory.currentScene.id)
	  			currentStory.currentScene.pause();

	  			currentStory.currentScene = currentStory.scrollOrderArray[Math.round(scrollPos_/document.width)];

	  			
	  			if(currentStory.currentScene.started == false){
	  				currentStory.currentScene.start();
	  			}

	  			if(wasPlaying){
	  				currentStory.currentScene.play();
	  			}
	  			

	  			currentStory.windowManager.updatePlayPauseButton()
	  			// currentStory.newScene(currentStory.scrollOrderArray[Math.round(scrollPos_/document.width)]);
	  			// console.log(currentStory.scrollOrderArray[Math.round(scrollPos_/document.width)].id)
	  		}
	  		
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




function handler(e){
	    //e.stopPropagation();
	   e.preventDefault();
	}

window.addEventListener('resize', updateContentSize);






