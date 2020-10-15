class SizeImageEffect extends ImageEffect{
	constructor(JSON_,parentContent_,effectCatagory_){
		super(JSON_,parentContent_,effectCatagory_);
		//console.log("create PositionImageEffect")
		this.type="size";
	}
	apply(){

		
		for(let vareable in this.vareables){
			console.log(vareable + " :  " + this.parentContent.html.fe.style[vareable])
			this.parentContent.html.fe.style[vareable] = this.vareables[vareable];
			console.log(vareable + " :  " + this.parentContent.html.fe.style[vareable])
		}
		

		// SizeImageEffect
	}
	unapply(){
		
	}

	createEditorHTML(){
		this.editor={}
		this.editor.html = {}
		this.editor.html.form = document.createElement("form");
		this.editor.html.form.classList.add("effect-editor-form");
		this.editor.html.form.classList.add("position-glow");

		this.editor.html.effectTitle = document.createElement("div");
		this.editor.html.effectTitle.innerHTML="Position Effect"
		this.editor.html.effectTitle.classList.add("effect-title")
		this.editor.html.form.append(this.editor.html.effectTitle);


		//"type": "absolute",
		//"top": "20%",
		//"left": "79.5%"
		this.editor.html.inputs = {};
		this.editor.html.inputs.type ={} //absolute


		this.editor.html.inputs.type.label = document.createElement("label");
		this.editor.html.inputs.type.label.classList.add("effect-vareable")
		this.editor.html.inputs.type.label.innerHTML="Type"
		this.editor.html.form.append(this.editor.html.inputs.type.label);

		this.editor.html.inputs.type.select =document.createElement("select");
		this.editor.html.form.append(this.editor.html.inputs.type.select);
		this.editor.html.form.append(document.createElement("br"));
		this.editor.html.inputs.type.select.classList.add("effect-dropdown")

		let options = [];


		options[0] =document.createElement("option");
		options[0].text = "none";
		options[1] =document.createElement("option");
		options[1].text = "absolute";
		options[2] =document.createElement("option");
		options[2].text = "fixed";
		options[3] =document.createElement("option");
		options[3].text = "relative";
		options[4] =document.createElement("option");
		options[4].text = "static";
		options[5] =document.createElement("option");
		options[5].text = "sticky";

		for(let i in options){

			this.editor.html.inputs.type.select.add(options[i])
			if(this.vareables.type == options[i].text){
				
				this.editor.html.inputs.type.select.selectedIndex=i;
			}
		}


		this.editor.html.inputs.xPos={};
		this.editor.html.inputs.xPos.label = document.createElement("label");
		this.editor.html.inputs.xPos.label.classList.add("effect-vareable")
		this.editor.html.inputs.xPos.label.innerHTML="Left Pos"
		this.editor.html.form.append(this.editor.html.inputs.xPos.label);
		this.editor.html.inputs.xPos.input =document.createElement("input");
		this.editor.html.form.append(this.editor.html.inputs.xPos.input);
		this.editor.html.inputs.xPos.input.classList.add("effect-input")
		this.editor.html.inputs.xPos.input.value=this.vareables.left;

		this.editor.html.form.append(document.createElement("br"));

		this.editor.html.inputs.yPos={};
		this.editor.html.inputs.yPos.label = document.createElement("label");
		this.editor.html.inputs.yPos.label.classList.add("effect-vareable")
		this.editor.html.inputs.yPos.label.innerHTML="Top Pos"
		this.editor.html.form.append(this.editor.html.inputs.yPos.label);
		this.editor.html.inputs.yPos.input =document.createElement("input");
		this.editor.html.form.append(this.editor.html.inputs.yPos.input);
		this.editor.html.inputs.yPos.input.classList.add("effect-input")
		this.editor.html.inputs.yPos.input.value=this.vareables.top;



	}
}



