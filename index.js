// tick tact toe
// game bord block id
//	[0][1][2]
//	[3][4][5]
//	[6][7][8]

let player1 = 'x'
let player2 = 'o'
let gameRunning = true
let currentPlayer = player1
let defaultBlockBgColor = 'white'
let defaultBlockTextColor = 'black'
let winBlockBgColor = 'lightgrey'
let winBlockTextColor = 'green'
let winFields
let gameBoard = ['','','','','','','','','']
let winningCombinationsId = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
let gameBoardsBlocks = document.querySelectorAll('.block')
let resetBtn = document.querySelector('#reset')
let playerTurnText = document.querySelector('#playerTurn span')
let messageText = document.querySelector('.mesage')

let reset = ()=>{
	for (var i = 0; i < gameBoard.length; i++) {
		gameBoard[i] = ''
		gameBoardsBlocks[i].innerText = ''
		gameRunning = true
	}
	currentPlayer = player1
	gameBoardsBlocks[winFields[0]].style.backgroundColor = defaultBlockBgColor
	gameBoardsBlocks[winFields[1]].style.backgroundColor = defaultBlockBgColor
	gameBoardsBlocks[winFields[2]].style.backgroundColor = defaultBlockBgColor
	gameBoardsBlocks[winFields[0]].style.color = defaultBlockTextColor
	gameBoardsBlocks[winFields[1]].style.color = defaultBlockTextColor
	gameBoardsBlocks[winFields[2]].style.color = defaultBlockTextColor
}

let drawBoard = (block,i)=>{
	block.innerText = currentPlayer
	gameBoard[i] = currentPlayer
}

let changePlayer = (p)=>{
	if(p == player1){
		currentPlayer = player2
	} 
	if(p == player2){
		currentPlayer = player1
	}
}
let updatePlayerTurText = (p,c)=>{
	p.innerText = c
}

let checkField = (id)=>{
	if(gameBoard[id] == ''){
		return true
	}else{
		return false
	}
}

let checkEmptyFields = ()=>{
	if(gameBoard[0] != '' && gameBoard[1] != '' && gameBoard[3] != '' && gameBoard[4] != '' && gameBoard[5] != '' && gameBoard[6] != '' && gameBoard[7] != '' && gameBoard[8] != ''){
		messageText.innerHTML = 'Draw'
	}
}

let checkWinningCombinations = ()=>{
	winningCombinationsId.forEach(item =>{
		if(gameBoard[item[0]] == 'x' && gameBoard[item[1]] == 'x' && gameBoard[item[2]] == 'x'){
			winFields = item
			gameRunning = false
		}
		if(gameBoard[item[0]] == 'o' && gameBoard[item[1]] == 'o' && gameBoard[item[2]] == 'o'){
			winFields = item
			gameRunning = false
		}
	})
}

let winnerMsg = (p)=>{
	messageText.innerHTML = `winner is <span>${p}</span>`
}

let wingGameBoardStyle = ()=>{
	gameBoardsBlocks[winFields[0]].style.backgroundColor = winBlockBgColor
	gameBoardsBlocks[winFields[1]].style.backgroundColor = winBlockBgColor
	gameBoardsBlocks[winFields[2]].style.backgroundColor = winBlockBgColor
	gameBoardsBlocks[winFields[0]].style.color = winBlockTextColor
	gameBoardsBlocks[winFields[1]].style.color = winBlockTextColor
	gameBoardsBlocks[winFields[2]].style.color = winBlockTextColor
}

gameBoardsBlocks.forEach(block =>{
	block.addEventListener('click',()=>{
		if(gameRunning){
			// parseInt(block.id.slice(-1)-1
			let id = block.id.slice(-1)-1
			if(checkField(id)){
				drawBoard(block,id)
				checkWinningCombinations()
				if(gameRunning){
					checkEmptyFields()
					changePlayer(currentPlayer)
					updatePlayerTurText(playerTurnText,currentPlayer)
				}
			}
		}
		if(!gameRunning){
			winnerMsg(currentPlayer)
			wingGameBoardStyle()
		}
	})
})
resetBtn.addEventListener('click',()=>{
	reset()
	updatePlayerTurText(playerTurnText,currentPlayer)
})
