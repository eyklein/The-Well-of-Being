
class Node{ //not to be confused with nodejs
	constructor(scene_){

		//this.enclosingStructure;//this is the story or scene depending on what this node if for
		this.isBase=false;
		this.parents=[];
		this.parentsInfo={};
		this.primaryParent;


		this.children=[];
		this.childrenInfo={};

		this.widthFull=0;//if every child has its own spot
		this.widthCombined=0;//if only one child has its own spot

		this.posIndex={};
		this.posIndex.x=0;
		this.posIndex.y=0;
		this.posIndex.xRelative=0;//relative to siblings 

		this.pos={};

		this.height=30;
		this.width=90;
		
		

		
	}

	createHTML(){
		this.html={};

		this.html.container=document.createElement("div");

		this.html.node=document.createElement("div");
		
		this.html.node.style['color']="white";
		this.html.node.style['font-size']="10px";
		this.html.node.style.width=this.width+"px";
		this.html.node.style.height=this.height+"px";
		this.html.node.style.position="absolute";
		this.html.node.style.opacity=.8;

		this.html.container.appendChild(this.html.node);


	}

	// setParents(){
	// 	this.parentNodes=[];
	// 	for(let scene in this.scene.prevScenes){ //first one will be the main parent the rest will be clones
	// 		this.parentNodes.push(this.scene.prevScenes[scene].scene.be.node)
	// 	}
	// }
	// setChildren(){
	// 	this.childrenNodes=[];
	// 	for(let scene in this.scene.nextScenes){
	// 		this.childrenNodes.push(this.scene.nextScenes[scene].scene.be.node)
	// 	}
	// }

	setPrevSiblings(){
		this.prevSiblingNodes=this.getPrevSiblings();
	}

	getPrevSiblings(){

		if(this.parentNodes.length>0){
			// console.log(this.parentNodes[0].scene)
			let myPositionInFam = this.parentNodes[0].childrenNodes.indexOf(this)


			return this.parentNodes[0].childrenNodes.slice(0,myPositionInFam);

		}else{
			return [];
		}
		 
	}

	setRelativePosition(){ //position relative to siblings
		
		if(!this.isBase){
			console.log(this)
			for(let i in this.primaryParent.children){
				if(this.primaryParent.children[i]==this){
					//console.log(this.posIndex)
					break;
				}else{
					if(this.primaryParent.children[i].index==this.index){//make sure the index of added children is this index (they are at the same level)
						this.posIndex.xRelative+=this.primaryParent.children[i].widthFull;
					}
					
				}
			}
		}else if(this.isBase){// for the base nodes without a parent        this.scene.play.baseSceneNodes.indexOf(this) != -1){

			for(let i in this.enclosingStructure.baseSceneNodes){
				if(this.scene.play.baseSceneNodes[i]==this){
					break;
				}else{
					this.posIndex.xRelative+=this.enclosingStructure.baseSceneNodes[i].widthFull;
				}
			}
			
		}

		
	}


	setPositionIndex(){ //must set relative position first also must call top down from partent to child
		this.posIndex.y = this.index;

		//let shift=0;

		//console.log("set pos parent = " +this.primaryParent);
		if(this.primaryParent != undefined && this.primaryParent != null){
			this.posIndex.x = this.primaryParent.posIndex.x +this.posIndex.xRelative
		}else{
			//console.log(this);
			this.posIndex.x = this.posIndex.xRelative
		}

		for(let i in this.children){//top down
			if(this.children[i].primaryParent==this){
				this.children[i].setPositionIndex()
			}
		}


	}
	setPosition(){ //must set relative position first also must call top down from partent to child
		this.pos.y = this.posIndex.y*60;
		this.pos.x = this.posIndex.x*100;

		this.html.node.style.top=this.pos.y+"px";
		this.html.node.style.left=this.pos.x+"px";


		




		//let shift=0;

		//console.log("set pos parent = " +this.primaryParent);
		
		for(let i in this.children){//top down
			if(this.children[i].primaryParent==this){
				this.children[i].setPosition()
			}
		}


	}
	//actionArrowSVG(deltaX_,deltaY_,strokeThickness_,type_){
	createPathsArrows(){
		for(let i=0;i<this.parents.length;i++){
			
			this.createPathArrow(this.parents[i])
		}
		
	}
	createPathArrow(patent_){
		if(patent_ instanceof SceneNode){
			let deltaX=this.pos.x - patent_.pos.x;
			let deltaY;
			if(this.pos.y >= patent_.pos.y){
				deltaY=this.pos.y - patent_.pos.y-this.height;
			}else{
				deltaY=this.pos.y - patent_.pos.y - this.height;
			}


			this.html.svgPathsArrows.push(document.createElementNS("http://www.w3.org/2000/svg", "svg"));
			
			this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].classList.add("connector-line")
			//??????????
			
			this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].classList.add("click")
			// if(this.primaryParent){
			// 	this.html.svgPathArrow.classList.add("self-driven")
			// }

			if(deltaY>0){
				// this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.height=deltaY+"px";
				// this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.width=Math.abs(deltaX)+200+"px";

				this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].innerHTML=actionArrowSVG(deltaX, deltaY, 3, "dashed")
				//console.log(this.html.svgPathArrow)
				this.html.container.appendChild(this.html.svgPathsArrows[this.html.svgPathsArrows.length-1]);
				
				this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.position="absolute"

				if(deltaX>=-20){
					this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.left=patent_.pos.x 
				}else{
					this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.left=patent_.pos.x + deltaX
				}
				this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.top=patent_.pos.y+this.height;
			}else{//arrow gos up
				// this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.height=deltaY+ 10 +"px";//+10 because it needs room for the arrow on top
				// this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.width=Math.abs(deltaX)+20+"px"; //+20 because it moves left first then up 

				this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].innerHTML=actionArrowSVG(deltaX, deltaY, 3, "dashed")
				//console.log(this.html.svgPathArrow)
				this.html.container.appendChild(this.html.svgPathsArrows[this.html.svgPathsArrows.length-1]);
				
				this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.position="absolute"

				
				this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.left=this.pos.x -10
				
				this.html.svgPathsArrows[this.html.svgPathsArrows.length-1].style.top=this.pos.y;



				
			}
			

			// if(deltaX>20){
			// 	console.log(this.html.svgPathArrow)
			// }

			
		}

		
	}

	assignDescendentsIndexes(index_,primaryParent_){



		if(this.index == undefined){ //if not already asigned an index
			this.index=index_;
			this.primaryParent=primaryParent_;

			let rootEnd=true;
			for(let i in this.children){

				if(this.children[i].index==undefined){
					// console.log(this)
					// console.log(this.children[i])
					this.children[i].assignDescendentsIndexes(index_+1,this)
					rootEnd=false;
				}else{
					if(this.children[i].index>=this.index){
						rootEnd=false;
					}
				}
			}

			if(rootEnd){ //this.children.length=0 ||   if any of the children have a hight index
				this.isRootEnd=true;
				this.enclosingStructure.rootEndNodes.push(this);

				console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
			}else{
				this.isRootEnd=false;
			}
		}
	}

	// assignDescendentsIndexes(index_,primaryParent_){


	// 	if(this.index == undefined){ //if not already asigned an index
	// 		this.index=index_;
	// 		this.primaryParent=primaryParent_;

	// 		let rootEnd=true;
	// 		for(let i in this.children){

	// 			if(this.children[i].index==undefined){
	// 				this.children[i].assignDescendentsIndexes(index_+1,this)
	// 				rootEnd=false;
	// 			}else{
	// 				if(this.children[i].index>=this.index){
	// 					rootEnd=false;
	// 				}
	// 			}
	// 		}

	// 		if(rootEnd){ //this.children.length=0 ||   if any of the children have a hight index
	// 			this.isRootEnd=true;
	// 			this.scene.play.rootEndSceneNodes.push(this);
	// 		}else{
	// 			this.isRootEnd=false;
	// 		}
	// 	}
	// }
	// setWidthIndexBottomUp(){
		

	// }
	// setPositionIndexTopDown(){
	// 	for(let node of this.childrenNodes){
	// 		node.setPositionIndexTopDown()
	// 	}
	// 	this.posIndex.x=this.prevSiblingNodes
	// 	this.posIndex.x=this.parentNodes[0].posIndex.x+this.prevSiblingNodes.length;
	// 	for(let node of this.childrenNodes){
	// 		node.setPositionIndexDown();
	// 	}
	// }

	// addWidthParents(){
	// 	for(let parentScene for this.parents){
	// 		parentScene.width++;
	// 	}
	// }

	setFullWidthCascadeUp(widthChild_){
		this.widthFull +=widthChild_
		for(let i in this.parents){
			if(this.parents[i].index<this.index){
				this.parents[i].setFullWidthCascadeUp(1);//add 1 to all the parents
			}
		}
	}

	// setCombinedWidthCascadeUp(widthChild_){
	// 	this.widthCombined +=widthChild_
	// 	for(let i in this.parents){
	// 		if(i==0){
	// 			this.parents[i].setFullWidthCascadeUp(this.widthFull)
	// 		}
	// 	}
	// }

	
	// setParent(){
	// 	if(this.scene.prevScenesArray.length>0){
	// 		this.parentNode=this.scene.prevScenesArray[0].be.node;
	// 		//this.scene.prevScenesArray[0].be.node.children.push()
	// 	}else{
	// 		this.parentNode=null;//add to some master node
	// 	}

	// }
	
	

	// setPosition(){
	// 	this.position.y=this.scene.index;
	// 	let xpos=0;
	// 	for(let i in this.prevSiblingNodes){
	// 		//console.log(this.prevSiblingNodes[i])
	// 		xpos += this.prevSiblingNodes[i].be.spacing.unitWidths;
	// 	}

	// 	this.position.x=xpos;

	// }



}