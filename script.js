
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgConatiner= document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count=0; // to track draw



const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame= () => {
  turnO = true;
  count=0;
  enableBoxes();
  msgConatiner.classList.add("hide");
}

// handle click on boxes 
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if(turnO){
      box.innerText = "O";
      box.style.color= "blue";
      turnO=false;
    } else{
      box.innerText="X";
      box.style.color= "red";
      turnO=true;
    }

    box.disabled=true;
    count++;

    let isWinner= checkWinner();

    if(count == 9 && !isWinner){
      gameDraw();
    }
  });
});


//Handle game draw

const gameDraw = () =>{
  msg.innerText=`Game was a a Draw.`;
  msgConatiner.classList.remove("hide");
  disableBoxes();
}

const disableBoxes= ()=>{
  for (let box of boxes) {
     box.disabled=true;
  }
};


const enableBoxes= ()=>{
  for (let box of boxes) {
     box.disabled=false;
     box.innerText="";
     box.style.color="";  // Reset text color
  }
};


const showWinner= (winner) => {
  msg.innerText=`Congratulations, Winner is ${winner}`;
  msgConatiner.classList.remove("hide");
  disableBoxes();
}

//Check for a winner

const checkWinner = () =>{
  for(let pattern of winPatterns){
    // console.log(pattern[0],pattern[1],pattern[2]);
    // console.log(
    //   boxes[pattern[0]].innerText,
    //   boxes[pattern[1]].innerText,
    //   boxes[pattern[2]].innerText);

      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;

      if(pos1Val != "" && pos2Val!="" && pos3Val!=""){
        if(pos1Val===pos2Val && pos2Val===pos3Val){
          //console.log("Winner",pos1Val);
          showWinner(pos1Val);
          return true;
        }
      }
  }
}


newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);


