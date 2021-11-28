export const getColValues = (sudokuArray, colIndex) => sudokuArray.map(row => row[colIndex])

// Checks available numbers against all values in the current row
export const checkRow = (availableNumbers, row) => {
    // Create an array containing current values in the row & remove duplicates (0 in particular)
    const rowValues = [...new Set(row)]
    console.log("checking row:")
    console.log("available numbers: ", availableNumbers)
    console.log("rowValues ", rowValues)
    console.log("after row check: ", availableNumbers.filter(number => rowValues.every(value => value !== number)))
    console.log("-------------")

    return availableNumbers.filter(number => rowValues.every(value => value !== number))
}

// Checks all available numbers against all values in the current column
export const checkCol = (availableNumbers, columns) => {
    const colValues = [...new Set(columns)]

    console.log("checking column:")
    console.log("available numbers: ", availableNumbers)
    console.log("colValues ", colValues)
    console.log("after col check: ", availableNumbers.filter(number => colValues.every(value => value !== number)))
    console.log("====================")

    return availableNumbers.filter(number => colValues.every(value => value !== number))
}

// Checks to see what numbers are present in the 3x3 box the cell is in
export const checkBox = (rowIndex, colIndex, availableNumbers, sudokuArray) => {
    console.log(`Checking box for (${rowIndex},${colIndex})`)
    console.log("available numbers: ", availableNumbers)
    // Grid Visualization (x,y)
    /*
        [0,0] [0,0] [0,0] | [3,0] [3,0] [3,0] | [6,0] [6,0] [6,0]
        [0,0] [0,0] [0,0] | [3,0] [3,0] [3,0] | [6,0] [6,0] [6,0]
        [0,0] [0,0] [0,0] | [3,0] [3,0] [3,0] | [6,0] [6,0] [6,0]
        ------------------|-------------------|------------------
        [0,3] [0,3] [0,3] | [3,3] [3,3] [3,3] | [6,3] [6,3] [6,3]
        [0,3] [0,3] [0,3] | [3,3] [3,3] [3,3] | [6,3] [6,3] [6,3]
        [0,3] [0,3] [0,3] | [3,3] [3,3] [3,3] | [6,3] [6,3] [6,3]
        ------------------|-------------------|------------------
        [0,6] [0,6] [0,6] | [3,6] [3,6] [3,6] | [6,6] [6,6] [6,6]
        [0,6] [0,6] [0,6] | [3,6] [3,6] [3,6] | [6,6] [6,6] [6,6]
        [0,6] [0,6] [0,6] | [3,6] [3,6] [3,6] | [6,6] [6,6] [6,6]
    */
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
    console.log("after box check: ", availableNumbers)
    console.log("====================")
    return availableNumbers;
}