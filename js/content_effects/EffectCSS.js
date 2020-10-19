class CSSEffect {//extends ContentEffect

	constructor(JSON_,parentContent_,effectCatagory_){
		this.parentContent=parentContent_;
		this.effectCatagory=effectCatagory_;
		this.html={};
		this.html.be={}
		this.effects=[]
		this.lastEffects=[]
		
		

		this.type="css";
		for(let i in JSON_){
			this.push(JSON_[i]);
		}

		

	}
	push(JSON_){
		let lastIndex = this.effects.length;
		this.effects[lastIndex]={};
		// console.log(JSON_.value)
		this.effects[lastIndex][JSON_.style] = JSON_.value
		// for(let vareable in JSON_){
			
		// 	// this.effects[lastIndex][vareable.style]=JSON_[vareable.value];		
		// }
	}

	apply(){
		for(let i in this.effects){
			for(let effectName in this.effects[i]){
				this.lastEffects[i]={}
				this.lastEffects[i][effectName] = this.parentContent.html.fe.style[effectName];
				this.parentContent.html.fe.style[effectName]=this.effects[i][effectName];	
			}
		}
	}

	remove(){
		for(let i in this.lastEffects){
			for(let effectName in this.lastEffects[i]){
				this.parentContent.html.fe.style[effectName]=this.lastEffects[i][effectName];	
			}
		}
	}

	createEditorHTML(){
  		this.setHTMLEditorForm("text-fill");

		this.editor.html.effectTitle = this.getHTMLTitle("Fill Effect")
		this.editor.html.form.append(this.editor.html.effectTitle);

		let fill = this.getHTMLInput("Fill", this.vareables.color)
		this.editor.html.fillLabel = fill[0]
		this.editor.html.fillInput= fill[1]
		this.editor.html.form.append(this.editor.html.fillLabel);
		this.editor.html.form.append(this.editor.html.fillInput);


		this.editor.html.fillInput.style["background-color"]=this.editor.html.fillInput.value;

		this.editor.html.fillInput.addEventListener("input", function(){
			this.editor.html.fillInput.style["background-color"]=this.editor.html.fillInput.value;
			
			if(lightOrDark(this.editor.html.fillInput.value)=="dark"){
				this.editor.html.fillInput.style.color = "#fff"
			}else if(lightOrDark(this.editor.html.fillInput.value)=="light"){
				this.editor.html.fillInput.style["color"] = "#000"
			}

		}.bind(this))
		

		this.editor.html.form.append(document.createElement("br"))

		
	}
}