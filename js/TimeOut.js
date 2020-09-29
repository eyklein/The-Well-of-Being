//var _setTimeout = window.setTimeout;
//var timeouts = {};


class Timer{


    constructor(callback_, delay_,action_){
        // console.log(arguments)

        // if(delay_>0){
        //     console.log(this)
        // }
        this.callback=callback_;
        this.delay=delay_;
        this.id;
        this.action=action_;//this is probobly not necisary

        this.start = this.delay;
        this.remaining = this.delay;

        this.status="paused";
    }

    resume(){
        this.start = Date.now();
        window.clearTimeout(this.id);
        this.id=setTimeout(this.callback,this.remaining);
        this.status="resumed";
    }

    pause(){
        window.clearTimeout(this.id);
        this.remaining -= Date.now() - this.start;
        this.status="paused";
    }

    skip(skipTime_){
        if(skipTime_==null){
            window.clearTimeout(this.id);
            this.callback();
        }else{
            
            if(this.status=="resumed"){
                this.pause();
                this.remaining -= skipTime_;
                this.resume();
            }else if(this.status=="paused"){
                this.remaining -= skipTime_;
            }
        }
    }


    //var id = _setTimeout.apply(null, arguments);


    //remove from timeouts once executed
    // var id2=_setTimeout(function(id_){
    // 	delete timeouts[id_];
    // },delay,id);
    //

    //fn.id=id;
    // timeouts[id] = callback;



 //    //console.log(id);
 //    if(premature){
 //    	// console.log("ADDING  " + id);
 //    	// console.log(fn);
	    
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