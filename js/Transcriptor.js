
class Transcriptor{
	constructor(data_){
		// console.log(data_.results)
		// console.log(data_.results.items)
		this.words=[];
		// this.wordsTB=[]
		for(let dataElement of data_.results.items){
			if(dataElement.type == "pronunciation"){
				this.words.push(new WordElement(dataElement))

			}else if(dataElement.type == "punctuation"){

				this.words[this.words.length-1].addPunctuation(dataElement.alternatives[0].content);
			}
		}


		for(let word of this.words){
			word.createHTML();
		}


		this.lines=[];

		this.lines.push(new LineElement())

		for(let word of this.words){
			if(this.lines[this.lines.length-1].addWord(word)){
				this.lines.push(new LineElement())
			}
		}

		for(let line of this.lines){
			line.createHTML()
		}
		




	}

	getWordAt(time_){
		for(let word of this.words){
			if(word.inRange(time_)==0){
				return word
			}
		}
		return null;
	}

	getWordIndexAtOrAfter(time_){
		for(let i in this.words){
			let inRange = this.words[i].inRange(time_)
			console.log(inRange);
			if(inRange==0){
				return i
			}else if(inRange==-1){
				return i;
			}
		}
		return null;
	}
	getLineIndexAtOrAfter(time_){
		for(let i in this.lines){
			let inRange = this.lines[i].inRange(time_)
			if(inRange==0){
				return i
			}else if(inRange==-1){
				return i;
			}
		}
		return null;
	}
}

class TranscribedElement{
	constructor(elementData_){
		

	}
}
class WordElement extends TranscribedElement{
	constructor(wordData_){
		super()
		this.start=parseFloat(wordData_["start_time"]);
		this.end=parseFloat(wordData_["end_time"]);
		this.word=wordData_.alternatives[0].content
		this.punctuation=[];
		this.lineEnd=false;
		this.read=false;
	}
	inRange(time_){
		if(time_<this.start){
			return -1;
		}else if(time_>this.end){
			return 1;
		}else{
			return 0;
		}
	}
	addPunctuation(punctuation_){
		this.punctuation.push(punctuation_);
	}

	hightlight(){
		this.html.style["-webkit-text-stroke"]= ".3vw";
	}
	unhightlight(){
		this.html.style["-webkit-text-stroke"]= "0px";

	}
	createHTML(){
		this.html=document.createElement("span");
		this.html.classList.add("word");

		this.html.innerHTML=this.word;

		for(let i in this.punctuation){
			this.html.innerHTML += this.punctuation[i]

			if(this.punctuation[i]=="<br>"){

				this.lineEnd=true;
			}
		}
		this.html.innerHTML += " "


		this.htmlTB=document.createElement("span");
		this.htmlTB.classList.add("word");

		this.htmlTB.innerHTML=this.word;

		for(let i in this.punctuation){
			this.htmlTB.innerHTML += this.punctuation[i]

			// if(this.punctuation[i]=="<br>"){

			// 	this.lineEnd=true;
			// }
		}
		this.htmlTB.innerHTML += " "
		


		// if(this.pupunctuation){
		// 	this.html.innerHTML=this.word+this.pupunctuation + " " ;
		// }else{
		// 	this.html.innerHTML=this.word + " " ;
		// }

		
	}
}

class LineElement{
	constructor(){
		this.words=[];
		this.words2=[]

	}

	inRange(time_){
		if(time_<this.start){
			return -1;
		}else if(time_>this.end){
			return 1;
		}else{
			return 0;
		}
	}

	addWord(wordElement_){
		if(this.words.length==0){
			this.start=wordElement_.start;

		}

		this.words.push(wordElement_);
		
		if(wordElement_.lineEnd){
			this.end=wordElement_.end;
			return true;
		}
		return false;
	}

	createHTML(){
		this.html=document.createElement("span");

		

		for(let i in this.words){
			this.html.append(this.words[i].html);

			
		}

		this.htmlTB=document.createElement("span");

		

		for(let i in this.words){
			this.htmlTB.append(this.words[i].htmlTB);

			
		}


		
	}
}







// class PuncuationElement extends TranscribedElement{
// 	constructor(punctuationData_){
// 		super()
// 		this.value=punctuationData_.alternatives[0]
// 	}
// }


