import { checkBox, checkRow, getColValues, checkCol } from "./functions.js";

let defaultRow = [0,0,0,0,0,0,0,0,0];

let sudokuArray = [];
for(let i=0; i<9; i++){
	sudokuArray.push([...defaultRow]);
}

// DISCOVERED ISSUE:
// Looks like checkColumn is not always returning a number that is correct (ex: returning a 7 even though a 7 appeared before in the column)
// Same for checkRow
// checkBox appears to be working properly


// Sudoku Generator
const generateRandomSudoku = () => {
    sudokuArray.forEach((row, index) => {
        for(let col = 0; col < 9; col++){
            // Start off with array of available numbers
            let availableNumbers = [1,2,3,4,5,6,7,8,9];
            let rowIndex = index    // Current Row Index
            let colIndex = col;    // Current Column Index
            
            // ================ ROW ================ 
            // Check what is allowable in the row
            availableNumbers = checkRow(availableNumbers, row);

            if(availableNumbers.length == 1){
                // break out and assign the number
                sudokuArray[rowIndex][colIndex] = availableNumbers[0];
            continue
            }
            
            // ================  COLUMN ================ 
            // Check what is allowable in the column
            availableNumbers = checkCol (availableNumbers, getColValues(sudokuArray, colIndex))
            
            if(availableNumbers.length == 1){
                // break out and assign the number
                sudokuArray[rowIndex][colIndex] = availableNumbers[0];
            continue
            }

            // ================  SECTION (BOX) ================ 
            // Check what is allowable in the section
            availableNumbers = checkBox(rowIndex, colIndex, availableNumbers, sudokuArray)

             // See if one number remains
             if(availableNumbers.length == 1){
                // break out and assign the number
                sudokuArray[rowIndex][colIndex] = availableNumbers[0];
                continue
            }
            
            // ================ FINAL ================ 
            // With the remaining possible numbers to use, randomly select one and insert it
            const randomlyGeneratedNumber = availableNumbers[Math.floor(Math.random()*availableNumbers.length)];
            console.log("Randomly generated number: ", randomlyGeneratedNumber)
            sudokuArray[rowIndex][colIndex] = randomlyGeneratedNumber;
        }
    })
}
generateRandomSudoku()

const displaySudoku = (finalArray) => {
    finalArray.forEach(row => {
        for(let i=0; i<9; i++){
            let currentRow = document.getElementById(`Row${i+1}`)
            let newColumn = document.createElement("div");
            let colValue = document.createTextNode(`${row[i]}`)
            
            newColumn.appendChild(colValue);
            newColumn.classList.add("sudokuColumn")
            currentRow.appendChild(newColumn);
        }
    })
}

displaySudoku(sudokuArray);