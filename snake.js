function init()
{
	canvas=document.getElementById('mycanvas');
	W=H=canvas.width=canvas.height=800;
	pen=canvas.getContext('2d');
	cs=66;
	game_over=false;
	score=5;


	//Create an Image Object for food
	food_img = new Image();
	food_img.src ="Assets/apple.jpg";

	trophy = new Image();
	trophy.src ="Assets/trophy.jpg";


	food=getRandomFood();

	snake={
		init_lens:5,
		color:"blue",
		cells:[],
		direction:"right",

		createsnake:function()
		{
			for(var i=this.init_lens;i>0;i--)
			{
				this.cells.push({x:i,y:0});
			}
		},
		drawsnake:function()
		{
			for(var i=0;i<this.cells.length;i++)
			{
				pen.fillStyle = this.color;					//to change the default color (i.e. black )of the snake
				pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);

	
				//x*cs,y*cs= done to have distance of cs pixels btw two boxes; cs-2=done to have proper spacing btw two boxes
			}
		},
		updatesnake:function(){
			//console.log("updating snake according to the direction property")
			//check if the snake has eaten the foof ,increase the length of the snake 
			//and generate new food object
			var headX=this.cells[0].x;
			var headY=this.cells[0].y;
			if(headX==food.x && headY==food.y){
				console.log("Food Eaten");
				food=getRandomFood();
				score++;	

			}
			else
			{
				this.cells.pop();
			}
			
			
			var nextX,nextY;

			if(this.direction=="right"){
				nextX=headX+1;
				nextY=headY;
			}

			else if(this.direction=="left"){
				nextX=headX-1;
				nextY=headY;
			}

			else if(this.direction=="down"){
				nextX=headX;
				nextY=headY+1;
			}
			else{
				nextX=headX;
				nextY=headY-1;
			}

			
			this.cells.unshift({x:nextX,y:nextY});

			//write a logic the preventd snake from getting out
			var last_x=Math.round(W/cs);
			var last_y=Math.round(H/cs);
			if(this.cells[0].y<0||this.cells[0].x<0||this.cells[0].x>last_x||this.cells[0].y>last_y){

				game_over=true;
			}

		}
	};

	snake.createsnake();
	//Add a event listner on tht document object
	function keyPressed(e){
		//Conditional statements
		if(e.key=="ArrowRight"){
			snake.direction="right";
		}
		else if(e.key=="ArrowLeft"){
			snake.direction="left";
		}
		else if(e.key=="ArrowDown"){
			snake.direction="down";
		}
		else{
			snake.direction="up";
		}
		console.log(snake.direction);
	}


	document.addEventListener('keydown',keyPressed);
}

function draw(){
	//console.log("In Draw");


	//erase the old frame
	pen.clearRect(0,0,W,H);
	snake.drawsnake();

	pen.fillStyle=food.color;
	pen.drawImage(food_img,food.x*cs,food.y*cs,cs,cs);

	pen.drawImage(trophy,18,20,cs,cs);
	pen.fillStyle="blue";
	pen.font ="20px Roboto"
	pen.fillText(score,50,50);

}


function update(){
	//console.log("In update");
	snake.updatesnake();

}
function getRandomFood(){

	var foodX=Math.round(Math.random()*(W-cs)/cs);
	var foodY=Math.round(Math.random()*(H-cs)/cs);

	var food={
		x:foodX,
		y:foodY,
		color:"red",
	}
	return food
}



function gameloop(){
	if(game_over==true){
		clearInterval(f);
		alert("Game over");
		return;

	}
	draw();
	update();          //both will make snake visible on the screen
}

init();
var f=setInterval(gameloop,100);