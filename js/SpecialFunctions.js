var selectedNodes=[];
var shiftPressed=false


window.addEventListener("keydown", function(e) {
    // space and arrow keys
    if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);


let insertFunction=function(){
  
}

document.onkeydown = function(e) {
    pseudoSwitch(e.keyCode);

    currentStory.currentScene.checkAlternateKeys(e.keyCode)
    console.log(e.keyCode)
    // switch (e.keyCode) {

    //     case 37:
    //     	 currentStory.restartScene();
    //         break;
    //     case 38:// up arrow 
    //         currentStory.togglePlayPauseRewind();
    //         break;
    //     case 39:
    //     	currentStory.skip();
    //         break;
    //     case 40:// down arrow 
    //         currentStory.togglePlayPauseRewind();
    //         break;
    //     case 83://'s'
    //         currentStory.skip();
    //         break;
    //     case 32://' ' - space bar
    //         currentStory.togglePlayPauseRewind();
    //         break;
    //     case 81:
    //     	currentStory.printActiveDelays();
    //     	break;
    //     case 66:
    //     	currentStory.backEnd.display();
    //     	break;
    //     case 16://shift
    //     	shiftPressed=true;
    //     	break;
    //     default:
    // 		console.log(e.keyCode)
    // }
};





var keyCallbacks = {};

function addKeyFunction(keyCode_, fn_) {
   keyCallbacks[keyCode_] = keyCallbacks[keyCode_] || [];
   keyCallbacks[keyCode_].push(fn_);
}
function removeKeyFunction(keyCode_, fn_) {
   if(keyCallbacks[keyCode_] != undefined){
      keyCallbacks[keyCode_].splice(keyCallbacks[keyCode_].indexOf(fn_),1);
   }
   
}

function pseudoSwitch(keyCode_) {
   if (keyCallbacks[keyCode_]) {
      keyCallbacks[keyCode_].forEach(function(fn) {
          fn();
      });
   }
}

function createKeyPresses(){
  addKeyFunction(37, function(){currentStory.backButton();});
  addKeyFunction(38, function(){currentStory.togglePlayPause(true);});
  addKeyFunction(39, function(){console.log("-39-"); currentStory.skip();});
  addKeyFunction(40, function(){currentStory.togglePlayPause(true);});
  addKeyFunction(83, function(){currentStory.skip();});
  addKeyFunction(32, function(){currentStory.togglePlayPause(true);});
  addKeyFunction(81, function(){currentStory.printActiveDelays();});
  addKeyFunction(66, function(){currentStory.backEnd.display();});
  addKeyFunction(16, function(){shiftPressed=true;});

  // addKeyFunction(80, function(){currentStory.currentScene.checkAlternateKeys()});
}
createKeyPresses();






document.onkeyup = function(e) {
	if(shiftPressed){
	    shiftPressed=false;
	}
}

// window.onscroll = function(e) {
// 	console.log(e)
// };




function clearSelectedNodes(){
	for(let i=selectedNodes.length-1;i>=0;i--){
		selectedNodes[i].deselect();
	}
}



function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
//document.
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function deleteCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}

//var scalableTextEffects=[];
//var globalWidthVareable;
function updateContentSize(){


	
	let contentDiv=document.getElementById("content");

	let width;
	let height;

	if(window.innerWidth/16<=window.innerHeight/9){//scale based on width

		 width=window.innerWidth;
		 height=(window.innerWidth*9/16)
	}else{//scale based on hieght
		 width=(window.innerHeight*16/9);
		 height=(window.innerHeight);
	}
	document.width=width;


	document.getElementById("content").style.width=width+'px';
	document.getElementById("content").style.height=height+'px';

	document.getElementById("content").style.top=(window.innerHeight-height)/2+'px';
	document.getElementById("content").style.left=0+'px';




  document.getElementById("top-bar").style.height=height*.05+'px';
  document.getElementById("top-bar").style.display='block';
  document.getElementById("top-bar").style.width=width+'px';

  document.getElementById("top-bar").style.top="-100px";

  // if(window.innerHeight-height>document.getElementById("top-bar").offsetHeight*2){
  //   document.getElementById("top-bar").style.top="-130px"; //bar extends up 300 for hover purposes
  //   // document.getElementById("top-bar").style["background-color"]="red";
  // }
  // else{
  //   document.getElementById("top-bar").style.top="-100px";
  //   // document.getElementById("top-bar").style["background-color"]="blue";
  // }





	document.getElementById("bottom-bar").style.height=height*.05+'px';
	document.getElementById("bottom-bar").style.display='block';
  document.getElementById("bottom-bar").style.width=width+'px';
  document.getElementById("bottom-bar").style.height=0+'px';
  document.getElementById("bottom-bar").style.bottom="0px";

  // if(window.innerHeight-height>document.getElementById("bottom-bar").offsetHeight*2){
  //   document.getElementById("bottom-bar").style.bottom="-30px";
  // }else{
  //   document.getElementById("bottom-bar").style.bottom="0px";
  // }

	//currentStory.windowManager.playPause.style['padding-top']=height*.01+'px';
	// currentStory.windowManager.playPause.style['position']='absolute';
	// currentStory.windowManager.playPause.style['left']=width*.5+'px';
	// currentStory.windowManager.playPause.style['padding']=height*.01+'px';

	currentStory.windowManager.playPause.style.height=height*.03+'px';
	currentStory.windowManager.playPause.style.width=height*.03+'px';



	// currentStory.windowManager.fullScreenButton.style['right']=width*.01+'px';
	// currentStory.windowManager.fullScreenButton.style['padding']=height*.01+'px';
	
	// currentStory.windowManager.fullScreenButton.style.bottom=-height*.20+'px';

 //  currentStory.windowManager.fullScreenButton.style.height=height*.06+'px';
 //  currentStory.windowManager.fullScreenButton.style.width=height*.06+'px';
  


	// document.getElementById("main_text").style['font-size']=width*.02+'px';

	// currentStory.windowManager.mainVolumeLable.style['font-size']=height*.02+"px";
	// // currentStory.windowManager.mainVolumeLable.style['color']="red";

	// currentStory.windowManager.backgroundVolumeLable.style['font-size']=height*.02+"px";
	// currentStory.windowManager.backgroundVolumeLable.style['width']=width*.2+"px";
	// currentStory.windowManager.backgroundVolumeLable.style['color']="blue";
	// currentStory.windowManager.backgroundVolumeLable.style['font-size']=height*.03+"px";
	//currentStory.windowManager.backgroundVolumeLable.style['font-size']=height*.4+"px";
	// currentStory.windowManager.volumes.style.width=width*.25+"px";

	//currentStory.windowManager.playPause.style.width=height*.03+'px';

	//update all text font size effects
	

 //  for(let effect in scalableTextEffects){
	// 	scalableTextEffects[effect].updateSize(width);
	// }
  for(let scene in currentStory.scenesLib){
    for(let effect in currentStory.scenesLib[scene].scalableTextEffects){
      currentStory.scenesLib[scene].scalableTextEffects[effect].updateSize(width);
    }
  }


	// for(let id in currentStory.scenesLib){
	// 	currentStory.scenesLib[id].updateContentSize();
	// }



	currentStory.currentScene.html.fe.container.scrollIntoView()

}

Math.sumArray=function(array_){
	let sum = array_.reduce(function(a, b){
        return a + b;
    }, 0);
    return sum;
}

function size(obj_){
	return Object.keys(obj_).length;
}





//box-shadow: rgb(0, 0, 255) 0px 0px 10px;



function dragElement(elmnt) {
	elmnt.onmousedown = dragMouseDown;

	function dragMouseDown(e) {
		e = e || window.event;
		e.preventDefault();
		// get the mouse cursor position at startup:
		//pos3 = e.clientX;
		lastX = e.clientX;
		// pos4 = e.clientY;
		document.onmouseup = closeDragElement;
		// call a function whenever the cursor moves:
		document.onmousemove = elementDrag;
	}

	function elementDrag(e) {
		e = e || window.event;
		e.preventDefault();
		// calculate the new cursor position:
		


		deltaX = e.clientX - lastX;
		// pos2 = pos4 - e.clientY;
		lastX = e.clientX;
		// pos4 = e.clientY;
		// set the element's new position:
		//elmnt.style.top = (elmnt.offsetTop - pos2) + "px";

		for(let i in selectedNodes){
			selectedNodes[i].shiftX(deltaX);
			
		}

		//elmnt.style.left = (elmnt.offsetLeft + deltaX) + "px";
	}

	function closeDragElement() {
		/* stop moving when mouse button is released:*/
		document.onmouseup = null;
		document.onmousemove = null;
	}
}



function lightOrDark(color) {

    // Variables for red, green, blue values
    var r, g, b, hsp;
    
    // Check the format of the color, HEX or RGB?
    if (color.match(/^rgb/)) {

        // If RGB --> store the red, green, blue values in separate variables
        color = color.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        
        r = color[1];
        g = color[2];
        b = color[3];
    } 
    else {
        
        // If hex --> Convert it to RGB: http://gist.github.com/983661
        color = +("0x" + color.slice(1).replace( 
        color.length < 5 && /./g, '$&$&'));

        r = color >> 16;
        g = color >> 8 & 255;
        b = color & 255;
    }
    
    // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
    hsp = Math.sqrt(
    0.299 * (r * r) +
    0.587 * (g * g) +
    0.114 * (b * b)
    );

    // Using the HSP value, determine whether the color is light or dark
    if (hsp>127.5) {

        return 'light';
    } 
    else {

        return 'dark';
    }
}

function download(filename, text) {
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}

function isTouchDevice() {
  return !!('ontouchstart' in window);
}

function shake(div_){
  console.log(div_)
  var times = 4;
  var duration = 100;
  for (var i = 0; i < times; i++){

      $(div_).animate({
          left: (i % 2 === 0 ? "-" : "+") + "=5"
      }, duration);
    }



    // $(div_).animate({
    //     'margin-left': '-=5px',
    //     'margin-right': '+=5px'
    // }, 200, function() {
    //     $('#div').animate({
    //         'margin-left': '+=5px',
    //         'margin-right': '-=5px'
    //     }, 200, function() {
    //         //and so on...
    //     });
    // });
}


function flipPage(deg_,increment_,delay_){
 
    currentStory.currentScene.html.fe.container.style['transform'] = "rotateY("+ (-deg_) +"deg)";
    if(increment_>0 && deg_< 90){
      setTimeout(function(){flipPage(deg_+increment_,increment_,delay_);},delay_)
    }
}


// Fix up prefixing
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var context = new AudioContext();










