// Checks to see what numbers are present in the 3x3 box the cell is in
export const checkBox = (rowIndex, colIndex, availableNumbers, sudokuArray) => {
    // The two variables combined will always be at the top left quadrant of one of the 9 3x3 boxes
    let boxRowStart = rowIndex - (rowIndex % 3) // Will be 0, 3 or 6
    let boxColStart = colIndex - (colIndex % 3) // Will be 0, 3 or 6

    // Check all rows and columns of the box
    for(let r = boxRowStart; r < boxRowStart + 3; r++ ){
        if(availableNumbers.length == 1){
            break;
        }
        for(let c = boxColStart; c < boxColStart + 3; c++){
            if(availableNumbers.length == 1){
                break;
            }
            availableNumbers = availableNumbers.filter(n => n !== sudokuArray[r][c])
        }
    }
    return availableNumbers;
}

// Checks to see which numbers are present in the same row
export const checkRow = (availableNumbers, row) => availableNumbers.filter(number => row.every(col => col !== number))

// Checks to see which numbers are present in the same column
export const checkCol = (col, availableNumbers, sudokuArray) => availableNumbers.filter(number => sudokuArray.every(row => row[col] !== number))

// Used when there is more than 1 availableNumber left; randomly chooses a number
export const numRandomizer = (array) => array[Math.floor(Math.random()*array.length)];