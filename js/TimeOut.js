//var _setTimeout = window.setTimeout;
//var timeouts = {};


class Timer{


    constructor(callback_, delay_, action_){
        // console.log(arguments)


        this.callback=callback_;
        this.delay=delay_;
        this.id;
        this.action=action_;//this is probobly not necisary

        this.start = Date.now();
        // this.startSceneTime = this.action.scene.getPlayedTime();
        this.remaining = this.delay;

        this.status="paused";
    }

    resume(){
        this.start = Date.now();
        this.startSceneTime = this.action.scene.getPlayedTime();

        if(this.id!=undefined){
            window.clearTimeout(this.id);
        }

        this.id=setTimeout(this.callback,this.remaining);
        // console.log("add " + this.id + "   "+ this.action.random)
        this.status="resumed";
    }

    pause(){
        window.clearTimeout(this.id);
        // console.log("pause " + this.id + "   "+ this.action.random)
        this.remaining -= Date.now() - this.start;
        this.status="paused";
    }

    skip(skipTime_){ //millis?
        console.log("skip timer for : " + this.action.id)
        if(skipTime_==null){
            window.clearTimeout(this.id);
            console.log(this.callback)
            this.callback();
            let skipped = (this.remaining - (Date.now() - this.start))
            return skipped + this.startSceneTime;//millis
        }else{
            
            if(this.status=="resumed"){
                this.pause();
                this.remaining -= skipTime_;
                this.resume();
            }else if(this.status=="paused"){
                this.remaining -= skipTime_;
            }
            return skipTime_ + this.startSceneTime;
        }
    }


    //var id = _setTimeout.apply(null, arguments);


    //remove from timeouts once executed
    // var id2=_setTimeout(function(id_){
    //  delete timeouts[id_];
    // },delay,id);
    //

    //fn.id=id;
    // timeouts[id] = callback;



 //    //console.log(id);
 //    if(premature){
 //     // console.log("ADDING  " + id);
 //     // console.log(fn);
        
    // }
    // return id;
    
};

// var Timer = function(callback, delay) {
//     var timerId, start, remaining = delay;

//     this.pause = function() {
//         window.clearTimeout(timerId);
//         remaining -= Date.now() - start;
//     };

//     this.resume = function() {
//         start = Date.now();
//         window.clearTimeout(timerId);
//         timerId = window.setTimeout(callback, remaining);
//     };

//     this.resume();
// };
// //var _setTimeout = window.setTimeout;
// //var timeouts = {};


// class Timer{


//     constructor(callback_, delay_,action_){
//         //callback is the function to call when timer is up

        
//         this.callback=callback_;
//         this.delay=delay_;
//         this.id;
//         this.action=action_;//this is probobly not necisary

//         this.start = Date.now();
//         this.remaining = this.delay;

//         this.status="paused";
//     }

//     resume(){
//         this.start = Date.now();
//         window.clearTimeout(this.id);
//         this.id=setTimeout(this.callback,this.remaining);
//         // window.clearTimeout(this.id);
//         this.status="resumed";
//     }

//     pause(){
//         console.log("PASUE@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
//         console.log(this.id)
        
//         window.clearTimeout(this.id);
//         this.remaining -= Date.now() - this.start;

//         console.log(this.remaining)
//         this.status="paused";
//     }

//     skip(skipTime_){
//         if(skipTime_==null){
//             window.clearTimeout(this.id);
//             this.callback();
//         }else{
            
//             if(this.status=="resumed"){
//                 this.pause();
//                 this.remaining -= skipTime_;
//                 this.resume();
//             }else if(this.status=="paused"){
//                 this.remaining -= skipTime_;
//             }
//         }
//     }


//     //var id = _setTimeout.apply(null, arguments);


//     //remove from timeouts once executed
//     // var id2=_setTimeout(function(id_){
//     // 	delete timeouts[id_];
//     // },delay,id);
//     //

//     //fn.id=id;
//     // timeouts[id] = callback;



//  //    //console.log(id);
//  //    if(premature){
//  //    	// console.log("ADDING  " + id);
//  //    	// console.log(fn);
	    
// 	// }
// 	// return id;
	
// };

// // var Timer = function(callback, delay) {
// //     var timerId, start, remaining = delay;

// //     this.pause = function() {
// //         window.clearTimeout(timerId);
// //         remaining -= Date.now() - start;
// //     };

// //     this.resume = function() {
// //         start = Date.now();
// //         window.clearTimeout(timerId);
// //         timerId = window.setTimeout(callback, remaining);
// //     };

// //     this.resume();
// // };