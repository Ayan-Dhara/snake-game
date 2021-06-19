let ground = document.querySelector(".playground .ground")
let allCells = []
let snakeSpeed = 0.3;
let snakeLength = 1;

for(let i = 0; i < 20; i++) {
    allCells[i] = []
    for (let j = 0; j < 20; j++) {
        let cell = document.createElement("div")
        allCells[i].push(cell)
        cell.className = "cell"
        ground.append(cell)
    }
}

const setFood = () => {
    let i = Math.floor(Math.random() * allCells.length);
    let j = Math.floor(Math.random() * allCells[i].length);
    if(allCells[i][j].classList.contains("tail"))
        setFood()
    else if(allCells[i][j].classList.contains("snake"))
        setFood()
    else
        allCells[i][j].classList.add("food");
}

let currentDirection = [0, 0]
let currentPosition = [0, 0]
let lastMove = [0, 0]
let currentLayout = 0
let intervalId = 0

const gameOver = () => {
    clearInterval(intervalId)
    alert("Game Over. Your Score is " + snakeLength)
}

const atSnakeAte = () => {
    console.log("Snake ate")
    snakeLength++;
    setFood();
}

const moveSnake = () => {
    if(currentDirection[0] === 0 && currentDirection[1] === 0)
        return;
    else
        console.log("moving")

    document.body.style.setProperty("--snake-length", snakeLength + "")
    document.body.style.setProperty("--snake-speed", snakeSpeed + "s")


    if(allCells[currentPosition[0]][currentPosition[1]].classList.contains("snake")){
        let i = currentPosition[0];
        let j = currentPosition[1];
        allCells[i][j].classList.remove("snake")
        setTimeout(() => {
            allCells[i][j].classList.remove("tail")
            allCells[i][j].classList.remove("horizontal")
            allCells[i][j].classList.remove("vertical")
        }, (snakeLength-1) * snakeSpeed * 1000)
        allCells[i][j].classList.add("tail")
        allCells[i][j].classList.add(currentLayout?"vertical":"horizontal")
    }

    currentPosition = currentPosition.map((p, i) => {
        return p + currentDirection[1-i]
    })

    // if(currentPosition[0] < 0 || currentPosition[0] > allCells.length-1
    //     || currentPosition[1] < 0 || currentPosition[1] > allCells.length-1){
    //     gameOver()
    //     // clearInterval(intervalId)
    //     return
    // }

    if(currentPosition[0] < 0)
        currentPosition[0] = allCells.length - 1
    if(currentPosition[0] > allCells.length-1)
        currentPosition[0] = 0
    if(currentPosition[1] < 0)
        currentPosition[1] = allCells.length-1
    if(currentPosition[1] > allCells.length-1)
        currentPosition[1] = 0


    if(allCells[currentPosition[0]][currentPosition[1]]?.classList?.contains("tail")){
        gameOver()
        return
    }

    if(allCells[currentPosition[0]][currentPosition[1]].classList.contains("food")){
        allCells[currentPosition[0]][currentPosition[1]].classList.remove("food")
        atSnakeAte()
    }
    allCells[currentPosition[0]][currentPosition[1]].classList.add("snake")
}

allCells[0][0].classList.add("snake")
intervalId = setInterval(moveSnake, snakeSpeed * 1000)

const keyEventMap = {
    ArrowUp: () => {
        currentDirection = [0, -1]
        currentLayout = 1
    },
    ArrowDown: () => {
        currentDirection = [0, 1]
        currentLayout = 1
    },
    ArrowRight: () => {
        currentDirection = [1, 0]
        currentLayout = 0
    },
    ArrowLeft: () => {
        currentDirection = [-1, 0]
        currentLayout = 0
    }
}

document.body.addEventListener("keydown", (event) => {
    if(keyEventMap.hasOwnProperty(event.key))
        keyEventMap[event.key]()
})

setFood()
