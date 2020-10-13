class SudoContent extends Content{
	constructor(null_,parentScene_, inOut_, xPos_){ //,url_, content_, propertiesJSON_


		let contentJson_ = {
          "id": "disablePlay"+parentScene_.id,
          "content": {
            "type": "disablePlay",
            "disabled": "false"
          },
          "effects": {
            "general": {},
            "entrance": {},
            "exit": {},
            "clickable": {
              "generic": {},
              "hover": {},
              "pressed": {}
            }
          }
        }
		super(contentJson_,parentScene_)
		this.inOut=inOut_;
		this.type="disablePlay";
		this.htmlParent={};

		this.name=disablePlay;

		
		this.cNode=new ContentNode(this);
		this.cNode.xPos = xPos_;
		//this.createNode();
	}

	createFrontEndHTML(){
		
	}


	createEffects(){

		this.cNode.update();
		
	
	}


	applyEffects(){
		
	}
	
	

	display(){
		
	
		
	}

}