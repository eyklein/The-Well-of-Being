class PriorityLoader{
	constructor(){
		this.indexHistogram=[]
		this.maxIndex=0; //INDEX OR RANK IS THE LEVEL THE OF THE SCENE
		this.files={}

		this.threshhold=4; //threshhold for when to start story and continue loading in the background

		this.currentLoadbucket=0


	}

	rankPriority(){//based on index of scene

		for(let audioUrl in this.files){
			
			this.files[audioUrl].rankPriority();
		}
		
	}
	populateHistogram(){
		let numberOfBuckets=0;
		for(let bucket=0; bucket<=this.maxIndex;bucket++){
			this.indexHistogram[bucket]=[]
			numberOfBuckets++;
			for(let url in this.files){
				if(this.files[url].rank == bucket){
					this.indexHistogram[bucket].push(this.files[url]);
				}
			}

			if(bucket<=this.threshhold){
				for(let audioLoaderIndex in this.indexHistogram[bucket]){
					this.indexHistogram[bucket][audioLoaderIndex].isPreloaded=true;

					loadScreen.preloadFiles[this.indexHistogram[bucket][audioLoaderIndex].url]=this.indexHistogram[bucket][audioLoaderIndex];
					
				}
			}
		}
		this.threshhold=Math.min(numberOfBuckets,this.threshhold);
	}

	loadBucket(bucketIndex_){
		// if(bucketIndex_>=this.threshhold && currentStory.currentScene== null){

		// 	currentStory.displayAll();

		// 	currentStory.start();
		// }


		
		//console.log("LOADING BUCKET :   - " + bucketIndex_)
		this.currentLoadbucket=bucketIndex_;

		if(this.indexHistogram.length>bucketIndex_){
			let bucket = this.indexHistogram[bucketIndex_]

			if(bucket.length>0){
				for(let i=0;i<bucket.length;i++){
					bucket[i].load();//each audio loader
				}
			}else{
				this.loadBucket(bucketIndex_+1);
			}
		}else{
			//this will fire after it has loaded the preload files
		}
	}

	loadNextBucket(){
		this.loadBucket(this.currentLoadbucket+1);
	}

	// for(let audioUrl in priorityAudioLoader.files){
		// 	console.log(audioUrl)
		// 	priorityAudioLoader.files[audioUrl].load();
		// }
}