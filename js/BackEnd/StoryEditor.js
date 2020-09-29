class StoryEditor{
	constructor(story_,backEnd_){
		this.backEnd=backEnd_;
		this.story=story_;
		this.parent=null;

		this.html=document.createElement("div");
		this.html.id="story-editor"
		this.html.style.position='absolute';
		this.html.style.top='0px';
		this.html.style.left='0px';

		this.addSceneDivs()



		this.sceneEditors = {};
		for(let scene in this.story.scenesLib){
			this.sceneEditors[scene] = new SceneEditor(this.story.scenesLib[scene], this, this.backEnd)
		}
	}

	addSceneDivs(){
		for(let scene in this.story.scenesLib){
			//document.getElementById("")
			// console.log(this.story.scenesLib[scene])
			// console.log(this.story.scenesLib[scene].node.html)
			this.html.appendChild(this.story.scenesLib[scene].node.html.container)
			//this.backEnd.editorWindow.html.appendChild(this.story.scenesLib[scene].be.html)
		}
	}

	hide(){
		this.backEnd.mainEditorWindow.html.innerHTML="";
	}

	display(){
		//console.log("display story")
		// for(let scene in this.story.scenesLib){
		// 	this.story.scenesLib[scene].positionBE();
		// }

		this.backEnd.mainEditorWindow.html.appendChild(this.html)
		//this.backEnd.editorWindow.html.appendChild(this.html)
	}
}