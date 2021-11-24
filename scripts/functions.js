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